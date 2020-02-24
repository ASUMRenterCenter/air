import React, { Component } from "react";
import { Jumbotron } from 'react-bootstrap'
import '../CSS/ComponentStyle.css'
import PrintButton from './PrintButton'
import Pdf from "react-to-pdf";
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form";
//import SavePageButton from './SavePageButton'

const ref = React.createRef();

//https://www.npmjs.com/package/react-to-pdf
//Visit above link for info on pdf save funciton

export default class AgencyInfo extends Component { //FIXME should be agency creation
	constructor(props) {
		super(props);
		this.state = {
      organization: [],
      organizationName: "",
      organizationDescription: "",
      organizationEmail: "",
      organizationURL: "",

      org_update: false,
      notListed: "NOT LISTED",

      phoneRecords: [],
      phoneNumbers: [],
      phoneDescriptions: [],

      serviceRecords: [],
      serviceNames: [],
      serviceDescriptions: [],
      serviceTaxonomies: [], //WHILE NOT DECLARED AS 2D, THIS ARRAY IS 2D BELOW
      serviceAltNames: [],
      serviceLocations: [],
      serviceURLs: [],
      serviceEmails: [],

      taxonomyRecords: [[], []],

      contactNames: [],
      contactTitles: [],
      contactDepartments: [],
      contactEmails: [],
      contactServices: [],
      contactServiceNames: [],
      contactPhones: [],
      contactPhoneNumbers: [],
      contactRecords: [],

      addresses: [],
      addressCities: [],
      addressRegions: [],
      addressStates: [],
      addressZipCodes: [],
      addressCountries: [],
      addressTypes: [],
      addressRecords: [],

      locationNames: [],
      locationAltNames: [],
      locationDescriptions: [],
      locationTransportation: [],
      locationLatitude: [],
      locationLongitude: [],
      locationServices: [],
      locationServiceNames: [],
      locationAddresses: [],
      locationRecords: [],
      locationServiceRecords: [],
      locationAddressRecords: [],
		}

	}


  componentDidMount() {
    //RETRIEVING ORGANIZATION RECORD
    this.props.database('organizations').find('recgRmL5hpzXrhUHI', (err, record) => {
        if (err) { console.error(err); return; }
        //console.log('Retrieved', record.id);
        this.setState({
          organization: record,
          serviceTaxonomies: [[record, record], [record, record]] //TAXONOMY PLACEHOLDER TO AVOID GLITCHES
        })
    });

    var taxonomyArray = [];
    this.props.database('taxonomy').select({
        filterByFormula: '{parent_id} = ""',
        view: 'Grid view',
    }).firstPage((err, records) => {
        if (err) { console.error(err); return; }
        records.forEach((record) => {
            //console.log('Retrieved', record.get('name'));
            taxonomyArray.push(record);
        });
    });
    var recordHolder = [[]];
    recordHolder[0] = taxonomyArray;
    //recordHolder[1] = taxonomyArray;

    setTimeout(() => {

      this.setState({
        taxonomyRecords: recordHolder,
      })
    }, 1000);
    setTimeout(() => {
      //console.log(this.state.taxonomyRecords);
    }, 1500);


    //RETRIEVING THE PHONE RECORD(S)
    setTimeout(() => {
    //console.log("ID GOING IN IS: " + this.state.organization.fields.name);
      var phonesArray = [];
      this.props.database('phones').select({
          filterByFormula: '{organizations} = "' + this.state.organization.fields.name +'"',
          view: 'Grid view',
      }).firstPage((err, records) => {
          if (err) { console.error(err); return; }
          records.forEach((record) => {
              //console.log('Retrieved Phone: ', record.get('number'));
              phonesArray.push(record);
          });
      });

      setTimeout(() => {
        //console.log("Phones array" + phonesArray);
        this.setState({
          phoneRecords: phonesArray,
        })
      }, 2000);
    }, 1000);
    //END OF GETTING PHONE RECORDS ////////////////////////////////////////////


    //RETRIEVE SERVICE RECORDS: //////////////////////////////////////////////
    setTimeout(() => {
      //console.log("ID GOING IN IS: " + this.state.organization.fields.name);
      var servicesArray = [];
      this.props.database('services').select({
          filterByFormula: '{organization} = "' + this.state.organization.fields.name +'"',
          view: 'Grid view',
      }).firstPage((err, records) => {
          if (err) { console.error(err); return; }
          records.forEach((record) => {
          //		console.log('Retrieved service', record.get('Name'));
              servicesArray.push(record);
          });
      });

      setTimeout(() => {
        //console.log(servicesArray);
        this.setState({
          serviceRecords: servicesArray, ///FIXME: ARE WE KEEPING RECORDS OR ID NUMBERS??????
        })
      }, 2000);
    }, 2000);
    //END OF GETTING SERVICE RECORDS


    //RETRIEVE CONTACT RECORDS: //////////////////////////////////////////////
    setTimeout(() => {
      //console.log("ID GOING IN IS: " + this.state.organization.fields.name);
      var contactsArray = [];
      this.props.database('contact').select({
          filterByFormula: '{organizations} = "' + this.state.organization.fields.name +'"',
          view: 'Grid view',
      }).firstPage((err, records) => {
          if (err) { console.error(err); return; }
          records.forEach((record) => {
              //console.log('Retrieved contact', record.get('Name'));
              contactsArray.push(record);
          });
      });
      var contactServiceNamesArray = [];
      for (let i = 0; i < contactsArray.length; i++){
        contactServiceNamesArray.push("NONE");
      }

      setTimeout(() => {
        //console.log("The one and only contact array is: ")
        //console.log(contactsArray);
        this.setState({
          contactRecords: contactsArray, ///FIXME: ARE WE KEEPING RECORDS OR ID NUMBERS??????
          contactServiceNames: contactServiceNamesArray
        })
      }, 2000);
    }, 2000);



    //Retrieve Contact Services  and phones/////////////////////////////////////////////
    setTimeout(() => {
      var contactServiceHolder = [];
      var contactServiceNameHolder = [];
      for (let i = 0; i < this.state.contactRecords.length; i++){
        for (let j = 0; j < this.state.serviceRecords.length; j ++){
          if (this.state.contactRecords[i].fields.services == this.state.serviceRecords[j].id){
            contactServiceHolder[i] = this.state.serviceRecords[j];
            contactServiceNameHolder[i] = this.state.serviceRecords[j].fields.Name;
          }
        }
      }
      var contactPhoneHolder = [];
      var contactPhoneNumberHolder = [];
      for (let i = 0; i < this.state.contactRecords.length; i++){
        for (let j = 0; j < this.state.phoneRecords.length; j ++){
          if (this.state.contactRecords[i].fields.phones == this.state.phoneRecords[j].id){
            contactPhoneHolder[i] = this.state.phoneRecords[j];
            contactPhoneNumberHolder[i] = this.state.phoneRecords[j].fields.number;
          }
        }
      }
      setTimeout(() => {
        this.setState({
          contactServices: contactServiceHolder,
          contactServiceNames: contactServiceNameHolder,
          contaactPhones: contactPhoneHolder,
          contactPhoneNumbers: contactPhoneNumberHolder,
        })
      }, 1000);
    }, 5000);


    //RETRIEVE Location RECORDS: //////////////////////////////////////////////
    setTimeout(() => {
      var locationsArray = [];
      this.props.database('locations').select({
          filterByFormula: '{organization} = "' + this.state.organization.fields.name +'"',
          view: 'Grid view',
      }).firstPage((err, records) => {
          if (err) { console.error(err); return; }
          records.forEach((record) => {
              console.log('Retrieved location', record.get('name'));
              locationsArray.push(record);
          });
      });
      var locationAddressesArray = [];
      var locationServicesArray = [];
      for (let i = 0; i < locationsArray.length; i++){
        locationAddressesArray.push("NONE");
        locationServicesArray.push("NONE");
      }
      setTimeout(() => {
        this.setState({
          locationRecords: locationsArray,
          locationAddresses: locationAddressesArray,
          locationServices: locationServicesArray,
        })
        //console.log("The location Records are as follows: ");
        //console.log(locationsArray);
      }, 2000);
    }, 2000); //// END OF RETRIEVING LOCATION RECORDS

    //Retrieve Location Services/////////////////////////////////////////////
    setTimeout(() => {
      var locationServiceHolder = [];
      var locationServiceNameHolder = [];
      for (let i = 0; i < this.state.locationRecords.length; i++){
        for (let j = 0; j < this.state.serviceRecords.length; j ++){
          if (this.state.locationRecords[i].fields.services == this.state.serviceRecords[j].id){
            locationServiceHolder[i] = this.state.serviceRecords[j];
            locationServiceNameHolder[i] = this.state.serviceRecords[j].fields.Name;
          }
        }
      }
      setTimeout(() => {
        this.setState({
          locationServices: locationServiceHolder,
          locationServiceNames: locationServiceNameHolder,
          //contaactPhones: contactPhoneHolder,
          //contactPhoneNumbers: contactPhoneNumberHolder,
        })
      }, 1000);
    }, 5000);


    //Retrieve the address Records: //////////////////////////////////////////
    setTimeout(() => {
      var locationAddressesArray = [];
      var rearrangedArray = [];
      for (let i = 0; i < this.state.locationRecords.length; i++){
        console.log("Making it in the address retrieval loop");
        //console.log(this.state.locationRecords[i].fields);
        this.props.database('address').find(this.state.locationRecords[i].fields.address, (err, record) => {
            if (err) { console.error(err); return; }
            //console.log('Retrieved');
            //console.log(record);
            locationAddressesArray.push(record);
        });
      }
      setTimeout(() => {
        //console.log("Phones array" + phonesArray);
        for (let i = 0; i < this.state.locationRecords.length; i++){ //What's this little gem you asK? Well, even though we retrieve address records
          for (let j = 0; j < this.state.locationRecords.length; j++){//and push them to a list in the same order the locations appear in, somehow
            if (this.state.locationRecords[i].fields.address == locationAddressesArray[j].id){//because react is a treat, they still do not get added
              rearrangedArray[i] = locationAddressesArray[j];// in propper order, and can screw up how we display loc / add pairs.
            }																								//this thing fixes that problem!
          }
        }
        //console.log("H E R E   I S   R E A R R A N G E D   A R R A Y ");
        //console.log(rearrangedArray);
        //console.log(this.state.locationRecords[0].fields.address);
        //console.log(locationAddressesArray[0].fields.address_1);
        this.setState({
          locationAddressRecords: rearrangedArray,
        })
      }, 2000);
    }, 5000);
    //END OF GETTING address RECORDS ////////////////////////////////////////////



    //Retrieve Service Taxonomies /////////////////////////////////////////////
    setTimeout(() => {
      //console.log("Even accessing the service stuff?");
      var allTax = [];
      var taxonomyArray = [];
      for (let i = 0; i < this.state.serviceRecords.length; i++){
        //console.log(this.state.serviceRecords[i].fields.Name + " at index " + i)
        allTax.push([]);
        taxonomyArray = [];
        //console.log("Taxonomy Array at iteration " + i);
        //console.log(allTax);
        this.props.database('taxonomy').select({
            filterByFormula: '{services 2} = "' + this.state.serviceRecords[i].fields.id +'"',
            view: 'Grid view',
        }).firstPage((err, records) => {
            if (err) { console.error(err); return; }
            records.forEach((record) => {
          //			console.log('Retrieved taxonomy', record.get('name'), 'at ' + i);
                allTax[i].push(record);
            });
            //allTax.push(taxonomyArray);
        });
      }
      setTimeout(() => {
        //console.log("Alltax here");
        //console.log(allTax);
        this.setState({
          serviceTaxonomies: allTax
        })
      }, 1000);
    }, 5000);



	}


  //=======================================================================================================================================================

  //=========================================================================================================================================================

  componentDidUpdate() {
    //console.log("Here is the organization: ");
    //console.log(this.state.organization);
    //console.log(this.state.phoneRecords);
    //console.log(this.state.organization.id);
    //console.log("STARTS HERE:::::::::")
    //console.log(this.state.organization != []);
    //console.log(!this.state.org_update);
    //console.log(this.state.phoneRecords.length > 0);
    //console.log(this.state.serviceRecords.length > 0);
    //console.log(this.state.contactRecords.length > 0);
    //console.log(this.state.locationRecords.length > 0);
    //console.log(this.state.locationAddressRecords.length > 0);

    if (
      this.state.organization != [] &&
      !this.state.org_update &&
      this.state.phoneRecords.length > 0 &&
      this.state.serviceRecords.length > 0 &&				//FIXME: FROM TIME TO TIME THESE DO NOT EVALUATE TO TRUE
      this.state.contactRecords.length > 0 &&							//In this event, the name of the organization is not loaded into state
      this.state.locationRecords.length > 0 &&						//If the user clicks "update", the empty name is uploaded to the database
      this.state.locationAddressRecords.length > 0		//this causes all other fields not to load, since most are linked to the org name
    ) {																													//and the base can't handle an empty string for a name!!!!
      console.log("R e a c h i n g   i n s i d e   t h e   d i d U p d a t e   i f ")
      var phoneNumArray = [];
      var phoneDescArray = [];
      for (let i = 0; i < this.state.phoneRecords.length; i++){
        phoneNumArray[i] = this.state.phoneRecords[i].fields.number;
        phoneDescArray[i] = this.state.phoneRecords[i].fields.description;
      }
      var serviceNamesArray = [];
      var serviceDescriptionsArray = [];
      var serviceTaxonomiesArray = [];
      var serviceAltNamesArray = [];
      var serviceLocationsArray = [];
      var serviceEmailsArray = [];
      var serviceURLsArray = [];
      for (let i = 0; i < this.state.serviceRecords.length; i++){
        serviceNamesArray[i] = this.state.serviceRecords[i].fields.Name;
        serviceDescriptionsArray[i] = this.state.serviceRecords[i].fields.Description;
        serviceTaxonomiesArray[i] = this.state.serviceRecords[i].fields.taxonomy;
        serviceAltNamesArray[i] = this.state.serviceRecords[i].fields["Alternate Name"];
        serviceLocationsArray[i] = this.state.serviceRecords[i].fields.locations;
        serviceEmailsArray[i] = this.state.serviceRecords[i].fields.email;
        serviceURLsArray[i] = this.state.serviceRecords[i].fields.url;
      }
      var contactNamesArray = [];
      var contactTitlesArray  = [];
      var contactDepartmentsArray  = [];
      var contactEmailsArray  = [];
      var contactServicesArray  = [];									/////FIXME: TBD IF SERVICES AND PHONES SHALL BE DETERMINED HERE
      var contactPhonesArray  = [];
      for (let i = 0; i < this.state.contactRecords.length; i++){
        contactNamesArray[i] = this.state.contactRecords[i].fields.name;
        contactTitlesArray[i] = this.state.contactRecords[i].fields.title;
        contactDepartmentsArray[i] = this.state.contactRecords[i].fields.department;
        contactEmailsArray[i] = this.state.contactRecords[i].fields.email;
      }

      var locationNamesArray = [];
      var locationAltNamesArray = [];
      var locationDescriptionsArray = [];
      var locationTransportationArray = [];
      var locationLongitudeArray = [];
      var locationLatitudeArray = [];
      for (let i = 0; i < this.state.locationRecords.length; i++){
        locationNamesArray[i] = this.state.locationRecords[i].fields.name;
        locationAltNamesArray[i] = this.state.locationRecords[i].fields.alternate_name;
        locationDescriptionsArray[i] = this.state.locationRecords[i].fields.description;
        locationTransportationArray[i] = this.state.locationRecords[i].fields.transportation;
        locationLongitudeArray[i] = this.state.locationRecords[i].fields.longitude;
        locationLatitudeArray[i] = this.state.locationRecords[i].fields.latitude;

      }

      var addressCitiesArray = [];
      var addressRegionsArray = [];
      var addressStatesArray = [];
      var addressZipCodesArray = [];
      var addressCountriesArray = [];
      var addressTypesArray = [];
      var addressesArray = [];

      for (let i = 0; i < this.state.locationAddressRecords.length; i++){
        addressCitiesArray[i] = this.state.locationAddressRecords[i].fields.city;
        addressRegionsArray[i] = this.state.locationAddressRecords[i].fields.region;
        addressStatesArray[i] = this.state.locationAddressRecords[i].fields.State;
        addressZipCodesArray[i] = this.state.locationAddressRecords[i].fields["Zip Code"];
        addressCountriesArray[i] = this.state.locationAddressRecords[i].fields.Country;
        addressTypesArray[i] = this.state.locationAddressRecords[i].fields["address_type-x"];
        addressesArray[i] = this.state.locationAddressRecords[i].fields.address_1;
      }

      /*setTimeout(() => {
        console.log(allTax);
      }, 2000);*/

      this.setState({
        org_update: true,
        organizationName: this.state.organization.fields["name"],
        organizationDescription: this.state.organization.fields[
          "description"
        ],
        organizationEmail: this.state.organization.fields["email"],
        organizationURL: this.state.organization.fields["url"],
        phoneNumbers: phoneNumArray,
        phoneDescriptions: phoneDescArray,
        serviceNames: serviceNamesArray,
        serviceDescriptions: serviceDescriptionsArray,
        //serviceTaxonomies: taxonomyPlaceHolder,
        serviceAltNames: serviceAltNamesArray,
        serviceURLs: serviceURLsArray,
        serviceEmails: serviceEmailsArray,
        contactNames: contactNamesArray,
        contactTitles: contactTitlesArray,
        contactDepartments: contactDepartmentsArray,
        contactEmails: contactEmailsArray,
        contactServices: contactServicesArray,

        locationNames: locationNamesArray,
        locationAltNames: locationAltNamesArray,
        locationDescriptions: locationDescriptionsArray,
        locationTransportation: locationTransportationArray,
        locationLatitude: locationLatitudeArray,
        locationLongitude: locationLongitudeArray,

        addressCities: addressCitiesArray,
        addressRegions: addressRegionsArray,
        addressStates: addressStatesArray,
        addressZipCodes: addressZipCodesArray,
        addressCountries: addressCountriesArray,
        addressTypes: addressTypesArray,
        addresses: addressesArray,


      });
    } /*else if (
      this.state.organization.length > 0 &&
      !this.state.org_update &&
      this.state.phones.length == 0
    ) {
      this.setState({
        organizationName: this.state.organization[0].fields["name"],
        organizationDescription: this.state.organization[0].fields[
          "description"
        ],
        organizationEmail: this.state.organization[0].fields["email"],
        organizationURL: this.state.organization[0].fields["url"],
        org_update: true
      });
    }*/

    setTimeout(() => {
      //console.log(this.state.organizationName);
      //console.log(this.state.organizationEmail);
      //console.log(this.state.organizationURL);
      //console.log(this.state.organizationDescription);
      //console.log(this.state.phoneNumbers);
      //console.log(this.state.phoneDescriptions)

      //console.log(this.state.serviceNames);
      //console.log(this.state.serviceURLs);
      //console.log("Service Taxonomies: vvv")
      //console.log(this.state.serviceTaxonomies);
      //console.log(this.state.contactNames);
      //console.log(this.state.contactTitles);
      //console.log(this.state.contactDepartments);
      //console.log(this.state.contactEmails);
      //console.log("The contact services are: ");
      //console.log(this.state.contactServices);
      //console.log("The location names are: ");
      //console.log(this.state.locationNames);
      //console.log("The latitudes are: ");
      //console.log(this.state.locationLatitude);
      //console.log("H E R E  I S  T H E  A D D R E S S  I N F O")
      //console.log(this.state.addressCities);
      //console.log(this.state.locationRecords[0].id);
      //console.log(this.state.addressStates[0]);
      //console.log(this.state.locationAddressRecords[0]);
      /*for (let i = 0; i < this.state.locationRecords.length; i++){
        console.log("Printing for index: " + i)
        console.log(this.state.addresses[i]);
        console.log(this.state.addressCities[i]);
        console.log(this.state.addressStates[i]);
        console.log(this.state.addressZipCodes[i]);
        console.log(this.state.addressCountries[i]);
        console.log(this.state.addressTypes[i]);
        console.log(this.state.locationAddressRecords[i]);
      }*/
      //console.log(this.state.locationAddressRecords);
      console.log(this.state.serviceRecords);
    }, 10000);
  }

//=======================================================================================================================================================

//=========================================================================================================================================================

  render() {
    return(
      <div>
        <div>
          <Jumbotron>
            <h1>{this.state.organizationName} Information</h1>
            <div id="printSaveShare">
              <PrintButton id="printSaveShare"></PrintButton>
              <Pdf targetRef={ref} filename="code-example.pdf">
                {({ toPdf }) => <Button onClick={toPdf} variant="dark">Download As PDF</Button>}
              </Pdf>

            </div>
          </Jumbotron>
          <div className = "agencyInfoText" ref={ref}>
            <h3>Name: {this.state.organizationName}</h3>
            <h3>Website: {this.state.organizationURL}</h3>
            {/*<h3>Phone: 406 - XXX - XXXX</h3>*/}
            <h3>Email: {this.state.organizationEmail}</h3>
            {/*<h3>Rating: 8 / 10</h3>*/}
            <h3>Description:</h3>
            <p>{this.state.organizationDescription}</p>
              <h4>Service Name:</h4>
            <h3>Phones:</h3>
            <div>
              {this.state.phoneRecords.length > 0
                ? this.state.phoneRecords.map((phones, index) => (
                    <div key={index}>
                      <PhoneInfo
                        {...phones.fields}
                        index = {index}
                        handleNumberChange={this.handleNumberChange}
                      />
                    </div>
                  ))
                : ""}
            </div>
            <div>
            <br/>
            <h3>Services: </h3>
            {this.state.serviceRecords.length > 0
              ? this.state.serviceRecords.map((services, index) => (
                  <div className="container mt-3" key={index}>
                    <ServiceInfo
                      {...services.fields}
                      taxonomy = {this.state.serviceTaxonomies[index]}
                      index = {index}
                      taxonomyRecords={this.state.taxonomyRecords}
                    />
                  </div>
                ))
              : ""}
            </div>
            <div>
            <br/>
            <h3>Contacts</h3>
              {this.state.contactRecords.length > 0
                ? this.state.contactRecords.map((contacts, index) => (
                    <div key={index}>
                      <ContactInfo
                        {...contacts.fields}
                        index = {index}
                        services = {this.state.serviceRecords}
                        contactServiceName = {this.state.contactServiceNames[index]}
                        contactPhoneNumber = {this.state.contactPhoneNumbers[index]}
                        phones = {this.state.phoneRecords}
                      />
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </div>
      </div>
    )
	}
}

class PhoneInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		//console.log(this.props)
		return (
			<div>
        <br/>
        <h5>Phone {this.props.index + 1}: {this.props.number}</h5>
        <h5>Phone Description:</h5>
        <p>{this.props.description}</p>
			</div>
		);
	}
}

class ServiceInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}


	render() {
		console.log("HERE ARE PROPS");
		console.log(this.props.taxonomy);
		if (this.props.taxonomy == [][0]){
			return (<h1>loading services</h1>);
		}

		var taxonomyList = this.props.taxonomy;

		return (
			<div>
        <h5>Service {this.props.index + 1}: {this.props.Name}</h5>
        <h6>Alternate Name: {this.props["Alternate Name"]}</h6>
				<h6>Description: </h6>
        <p>{this.props.Description}</p>
        <h6>Website: {this.props.url}</h6>
        <h6>Email: {this.props.email}</h6>
        <h6>Taxonomies:</h6>
				{taxonomyList.length > 0
					? taxonomyList.map((taxonomy, index) => (
							<div key={index}>
								<p>{taxonomy.fields.name}</p>
							</div>
						))
					: ""}
			</div>
		);
	}
}

class ContactInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}


	render() {
		//console.log("H E R E  A R E  T H E  C O N T A C T  P R O P S")
		//console.log(this.props.services[0].id)
		//console.log("And the services are: ");
		//console.log(this.props.services);
		//console.log("THE CONTACT SERVICE PASSED IN IS: ");
		//console.log(this.props.contactServiceName);
		var name = "";
		if(this.props.contactServiceName == [][1]){
			name = "none";
		} else {
			name = this.props.contactServiceName;
		}
		//console.log("The name is : " + name);
		var number = "";
		if(this.props.contactPhoneNumber == [][1]){
			number = "none";
		} else {
			number = this.props.contactPhoneNumber;
		}
		//console.log("The number is : " + number);

		return (
			<div>
        <h4>Contact Name: {this.props.name}</h4>
        <h6>Service Specialty: {name}</h6>
        <h6>Contact Email: {this.props.email}</h6>
        <h6>Contact Phone: {number}</h6>
        <h6>Contact Title: {this.props.title}</h6>
        <h6>Contact Dept: {this.props.department}</h6>
        <br/>
			</div>
		);
	}
}

class LocationInfo extends Component { // WE WILL ALSO USE THESE FOR ADDRESSES
	constructor(props) {												//SINCE ADDRESS WITHOUT LOCATION IS POINTLESS
		super(props);															//AND WE'RE NOT GONNA LET THEM HAVE A LOCATION WITHOUT ADDRESS
		this.state = {};
	}


	render() {
		//console.log("H E R E  A R E  T H E  L O C A T I O N   P R O P S")
		//console.log(this.props)
		//console.log("And the services are: ");
		//console.log(this.props.services);
		var name = "";
		if(this.props.locationServiceName == [][1]){
			name = "none";
		} else {
			name = this.props.locationServiceName;
		}

		//console.log("The address record is as follows: ")
		//console.log(this.props.addressRecord);

		if(this.props.addressRecord == [][0]){
			return(
				<h1>loading address records...</h1>
			)
		}

		return (
			<div className>
        <h4>Location Name: {this.props.name}</h4>
        <h5>Associated Service: {name}</h5>
        <h5>Alternate Name: {this.props.alternate_name}</h5>
        <h6>Description: </h6>
        <p>{this.props.description}</p>
        <h4>Address</h4>
        <h5>
          {this.props.addressRecord.fields.address_1} <br/>
          {this.props.addressRecord.fields.city}, {this.props.addressRecord.fields.state} {this.props.addressRecord.fields["Zip Code"]} <br/>
          {this.props.addressRecords.fields.Country}
        </h5>
        <h6>Address type: {this.props.addressRecord.fields["address_type-x"]}</h6>
        <h6>Transportation: </h6>
        <p>{this.props.transportation}</p>
        <h6>Latitude: {this.props.latitude}</h6>
        <h6>Longitude: {this.props.longitude}</h6>
			</div>
		);
	}
}

function refreshPage(){
  window.location.reload(true);
}
