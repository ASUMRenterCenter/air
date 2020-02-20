import { Jumbotron } from "react-bootstrap";
import "../CSS/ComponentStyle.css";
import AgencyEditingFields from "./AgencyEditingFields";
import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";
import SaveChangesButton from "./SaveChangesButton.js";
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"


export default class AgencyEditPage extends Component {
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


		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleNumberChange = this.handleNumberChange.bind(this);
		this.deleteEntry = this.deleteEntry.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.createPhoneRecord = this.createPhoneRecord.bind(this);
		this.handleServiceNameChange = this.handleServiceNameChange.bind(this);
		this.handleServiceDescriptionChange = this.handleServiceDescriptionChange.bind(this);
		this.handleServiceTaxonomy = this.handleServiceTaxonomy.bind(this);
		this.deleteTaxonomy = this.deleteTaxonomy.bind(this);
		this.handleServiceAltNameChange = this.handleServiceAltNameChange.bind(this);
		this.handleServiceURLChange = this.handleServiceURLChange.bind(this);
		this.handleServiceEmailChange = this.handleServiceEmailChange.bind(this);
		this.handleContactNameChange = this.handleContactNameChange.bind(this);
		this.handleContactTitleChange = this.handleContactTitleChange.bind(this);
		this.handleContactEmailChange = this.handleContactEmailChange.bind(this);
		this.handleContactDepartmentChange = this.handleContactDepartmentChange.bind(this);
		this.deleteContactEntry = this.deleteContactEntry.bind(this);
		this.handleContactService = this.handleContactService.bind(this);
		this.handleContactPhone = this.handleContactPhone.bind(this);
		this.handleLocationNameChange = this.handleLocationNameChange.bind(this);
		this.handleLocationAltNameChange = this.handleLocationAltNameChange.bind(this);
		this.handleLocationDescriptionChange = this.handleLocationDescriptionChange.bind(this);
		this.handleLocationTransportationChange = this.handleLocationTransportationChange.bind(this);
		this.handleLocationLatitudeChange = this.handleLocationLatitudeChange.bind(this);
		this.handleLocationLongitudeChange = this.handleLocationLongitudeChange.bind(this);
		this.deleteLocationEntry = this.deleteLocationEntry.bind(this);
		this.createLocationRecord = this.createLocationRecord.bind(this);
		this.handleLocationService = this.handleLocationService.bind(this);
		this.handleLocationAddressChange = this.handleLocationAddressChange.bind(this);
		this.handleLocationAddressTypeChange = this.handleLocationAddressTypeChange.bind(this);
		this.handleLocationAddressCountryChange = this.handleLocationAddressCountryChange.bind(this);
		this.handleLocationAddressZipCodeChange = this.handleLocationAddressZipCodeChange.bind(this);
		this.handleLocationAddressStateChange = this.handleLocationAddressStateChange.bind(this);
		this.handleLocationAddressCityChange = this.handleLocationAddressCityChange.bind(this);
		this.createServiceRecord = this.createServiceRecord.bind(this);
		this.deleteServiceEntry = this.deleteServiceEntry.bind(this);








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





		//CHECK FOR J-DOG /////////////////////////////////////////////////////////
		///////////////////////////////////////////////////////////////////////////
		if (this.props.isJordan) {
			this.setState({
				org_edit_name: this.props.match.params.org_edit_name,
				org_edit_id: this.props.match.params.org_edit_id
			});
		}
	}

	/*
  componentDidMount(){
    this.props.database('organizations').find('recgRmL5hpzXrhUHI', (err, record) => {
      if (err) { console.error(err); return; }
      console.log('Retrieved', record);
      this.setState(previousState => ({
        organization: record
      }));
    });
    console.log(this.state.organization);
  }
*/

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

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
		console.log(e.target.value);
	}

	handleNumberChange(e, index) {
		var newHolder = this.state.phoneNumbers;
		newHolder[index] = e.target.value;
		this.setState({
			phoneNumber: newHolder
		})

		//console.log(this.state.phoneNumbers);
	}

	handleDescriptionChange(e, index) {
		var newHolder = this.state.phoneDescriptions;
		newHolder[index] = e.target.value;
		this.setState({
			phoneDescriptions: newHolder
		})

		//console.log(this.state.phoneDescriptions);
	}

	handleServiceNameChange(e, index){
		var newHolder = this.state.serviceNames;
		newHolder[index] = e.target.value;
		this.setState({
			serviceNames: newHolder
		})
		//console.log(this.state.serviceNames);
	}

	handleServiceDescriptionChange(e, index){
		var newHolder = this.state.serviceDescriptions;
		newHolder[index] = e.target.value;
		this.setState({
			serviceDescriptions: newHolder
		})
		console.log(this.state.serviceDescriptions);
	}

	handleServiceAltNameChange(e, index){
		var newHolder = this.state.serviceAltNames;
		newHolder[index] = e.target.value;
		this.setState({
			serviceAltNames: newHolder
		})
		console.log(this.state.serviceAltNames);
	}

	handleServiceURLChange(e, index){
		var newHolder = this.state.serviceURLs;
		newHolder[index] = e.target.value;
		this.setState({
			serviceURLs: newHolder
		})
		console.log(this.state.serviceURLs);
	}

	handleServiceEmailChange(e, index){
		var newHolder = this.state.serviceEmails;
		newHolder[index] = e.target.value;
		this.setState({
			serviceEmails: newHolder
		})
		console.log(this.state.serviceEmails);
	}

	handleContactNameChange(e, index){
		var newHolder = this.state.contactNames;
		newHolder[index] = e.target.value;
		this.setState({
			contactNames: newHolder
		})
		console.log(this.state.contactNames);
	}

	handleContactTitleChange(e, index){
		var newHolder = this.state.contactTitles;
		newHolder[index] = e.target.value;
		this.setState({
			contactTitles: newHolder
		})
		console.log(this.state.contactTitles);
	}

	handleContactEmailChange(e, index){
		var newHolder = this.state.contactEmails;
		newHolder[index] = e.target.value;
		this.setState({
			contactEmails: newHolder
		})
		console.log(this.state.contactEmails);
	}

	handleContactDepartmentChange(e, index){
		var newHolder = this.state.contactDepartments;
		newHolder[index] = e.target.value;
		this.setState({
			contactDepartments: newHolder
		})
		console.log(this.state.contactDepartments);
	}

	handleLocationNameChange(e, index){
		var newHolder = this.state.locationNames;
		newHolder[index] = e.target.value;
		this.setState({
			locationNames: newHolder
		})
		console.log(this.state.locationNames);
	}

	handleLocationAltNameChange(e, index){
		var newHolder = this.state.locationAltNames;
		newHolder[index] = e.target.value;
		this.setState({
			locationAltNames: newHolder
		})
		console.log(this.state.locationAltNames);
	}

	handleLocationDescriptionChange(e, index){
		var newHolder = this.state.locationDescriptions;
		newHolder[index] = e.target.value;
		this.setState({
			locationDescriptions: newHolder
		})
		console.log(this.state.locationDescriptions);
	}

	handleLocationTransportationChange(e, index){
		var newHolder = this.state.locationTransportation;
		newHolder[index] = e.target.value;
		this.setState({
			locationTransportation: newHolder
		})
		console.log(this.state.locationTransportation);
	}

	handleLocationLatitudeChange(e, index){
		var newHolder = this.state.locationLatitude;
		newHolder[index] = e.target.value;
		this.setState({
			locationLatitude: newHolder
		})
		console.log(this.state.locationLatitude);
	}

	handleLocationLongitudeChange(e, index){
		var newHolder = this.state.locationLongitude;
		newHolder[index] = e.target.value;
		this.setState({
			locationLongitude: newHolder
		})
		console.log(this.state.locationLongitude);
	}

	handleLocationAddressTypeChange(e, index){
		var newHolder = this.state.addressTypes;
		newHolder[index] = e.target.value;
		this.setState({
			addressTypes: newHolder
		})
		console.log(this.state.addressTypes);
	}

	handleLocationAddressCountryChange(e, index){
		var newHolder = this.state.addressCountries;
		newHolder[index] = e.target.value;
		this.setState({
			addressCountries: newHolder
		})
		console.log(this.state.addressCountries);
	}

	handleLocationAddressZipCodeChange(e, index){
		var newHolder = this.state.addressZipCodes;
		newHolder[index] = e.target.value;
		this.setState({
			addressZipCodes: newHolder
		})
		console.log(this.state.addressZipCodes);
	}

	handleLocationAddressStateChange(e, index){
		var newHolder = this.state.addressStates;
		newHolder[index] = e.target.value;
		this.setState({
			addressStates: newHolder
		})
		console.log(this.state.addressStates);
	}

	handleLocationAddressCityChange(e, index){
		var newHolder = this.state.addressCities;
		newHolder[index] = e.target.value;
		this.setState({
			addressCities: newHolder
		})
		console.log(this.state.addressCities);
	}

	handleLocationAddressChange(e, index){
		var newHolder = this.state.addresses;
		newHolder[index] = e.target.value;
		this.setState({
			addresses: newHolder
		})
		console.log(this.state.addresses);
	}

	/*handleServiceTaxonomy(e, serviceIndex, taxonomyIndex){
		console.log("Service Taxonomy Information: ")
		console.log(serviceIndex);
		console.log(taxonomyIndex);
		var taxonomyHolder = this.state.serviceTaxonomies;
		taxonomyHolder[serviceIndex][taxonomyIndex] = e.target.value;
		this.setState({
			serviceTaxonomies: taxonomyHolder
		});
		console.log("taxonomy layer 1" + this.state.serviceTaxonomies[serviceIndex][taxonomyIndex]);
	}*/

	handleServiceTaxonomy(e, serviceIndex){
		this.setState({
			[e.target.name]: e.target.value
		});
		console.log("taxonomy layer 1" + this.state.serviceTaxonomyName);

		setTimeout(() =>{
			console.log("THE SERVICE INDEX IS: " + serviceIndex);
			var finalLayer = false;
			var newTaxonomyArray = [];
			this.props.database('taxonomy').select({
					filterByFormula: "({parent_id} = '" + this.state.serviceTaxonomyName + "')",
					view: 'Grid view',
			}).firstPage((err, records) => {
					if (err) { console.error(err); return; }
					records.forEach((record) => {
							console.log('Retrieved layer 2 ', record.get('name'));
							newTaxonomyArray.push(record);
					});
			});

			setTimeout(() => {
				var recordHolder = this.state.taxonomyRecords;
				console.log("Pre push the recordHolder =  " + recordHolder);
				if (newTaxonomyArray.length > 0){
					recordHolder.push(newTaxonomyArray);
				} else {
					finalLayer = true;
				}
				console.log("post push the recordHolder =  " + recordHolder);
				console.log("Service Taxonomy ID: " + this.state.serviceTaxonomyName);

				this.setState({
					taxonomyRecords: recordHolder,
				})
				console.log("Here we print the taxonomyRecords and the recordHolder: ")
				console.log(this.state.taxonomyRecords);
				console.log(recordHolder);
				if (finalLayer == true){
					var holder = this.state.serviceTaxonomies;
					console.log("Here is holder!!!")
					console.log(holder);
					console.log("Here is the last of the taxonomies:")
					console.log(this.state.taxonomyRecords[this.state.taxonomyRecords.length - 1]);
					for (let i = 0; i < this.state.taxonomyRecords[this.state.taxonomyRecords.length - 1].length; i++){
						if (this.state.taxonomyRecords[this.state.taxonomyRecords.length - 1][i].fields.id == this.state.serviceTaxonomyName){
							holder[serviceIndex].push(this.state.taxonomyRecords[this.state.taxonomyRecords.length -1][i]);
						}
					}
					setTimeout(() => {
						var idNumbers = [];
						for (let i = 0; i < holder[serviceIndex].length; i++){
							idNumbers[i] = holder[serviceIndex][i].id
						}
						console.log("Here are the id numbers: ::::::")
						console.log(idNumbers);
						this.props.database('services').update([
						  {
						    "id": this.state.serviceRecords[serviceIndex].id,
						    "fields": {
						      "taxonomy": idNumbers,
						    }
						  },
						], (err, records) => {
						  if (err) {
						    console.error(err);
						    return;
						  }
						  records.forEach((record) => {
						    console.log(record.get('id'));
						  });
						});
						this.setState({
							serviceTaxonomies: holder,
							taxonomyRecords: [this.state.taxonomyRecords[0]],
						})
					}, 2000);
				}
			}, 500);

		}, 100);

		setTimeout(() => {
			console.log(this.state.serviceTaxonomyName);
		}, 7000);

	}


	handleLocationService(e, locationIndex){
		console.log("The location index: ");
		console.log(locationIndex);
		console.log("T H E  V A L U E  P A S S E D  I N :  ");
		console.log(e.target.value);
		this.props.database('locations').update([ //FIXME: THE user can select "none" but this does not affect the database!!!
			{																			//Luckily, if the contact originally has not services, this still works
				"id": this.state.locationRecords[locationIndex].id,
				"fields": {
					"services": [e.target.value]
				}
			},
		], function(err, records) {
			if (err) {
				console.error(err);
				return;
			}
			records.forEach(function(record) {
				console.log(record.get('name'));
			});
		});

		var foundIt = false;
		var serviceHolder = this.state.locationServices;
		var nameHolder = this.state.locationServiceNames;
		for (let i = 0; i < this.state.serviceRecords.length; i++){
			if (this.state.serviceRecords[i].id == [e.target.value]){
				serviceHolder[locationIndex] = this.state.serviceRecords[i];
				nameHolder[locationIndex] = this.state.serviceRecords[i].fields.Name;
				foundIt = true;
			}
		}
		if (!foundIt){
			serviceHolder[locationIndex] = null;
			nameHolder[locationIndex] = "None";
		}
		this.setState({
			locationServices: serviceHolder,
			locationServiceNames: nameHolder,
		})

	}

	handleContactService(e, contactIndex){
		console.log("The contact index: ");
		console.log(contactIndex);
		console.log("T H E  V A L U E  P A S S E D  I N :  ");
		console.log(e.target.value);
		this.props.database('contact').update([ //FIXME: THE user can select "none" but this does not affect the database!!!
		  {																			//Luckily, if the contact originally has not services, this still works
		    "id": this.state.contactRecords[contactIndex].id,
		    "fields": {
		      "services": [e.target.value]
		    }
		  },
		], function(err, records) {
		  if (err) {
		    console.error(err);
		    return;
		  }
		  records.forEach(function(record) {
		    console.log(record.get('name'));
		  });
		});

		var foundIt = false;
		var serviceHolder = this.state.contactServices;
		var nameHolder = this.state.contactServiceNames;
		for (let i = 0; i < this.state.serviceRecords.length; i++){
			if (this.state.serviceRecords[i].id == [e.target.value]){
				serviceHolder[contactIndex] = this.state.serviceRecords[i];
				nameHolder[contactIndex] = this.state.serviceRecords[i].fields.Name;
				foundIt = true;
			}
		}
		if (!foundIt){
			serviceHolder[contactIndex] = null;
			nameHolder[contactIndex] = "None";
		}
		this.setState({
			contactServices: serviceHolder,
			contactServiceNames: nameHolder,
		})

	}

	handleContactPhone(e, contactIndex){
		console.log("The contact index: ");
		console.log(contactIndex);
		console.log("T H E  V A L U E  P A S S E D  I N :  ");
		console.log(e.target.value);
		this.props.database('contact').update([ //FIXME: THE user can select "none" but this does not affect the database!!!
			{																			//Luckily, if the contact originally has not services, this still works
				"id": this.state.contactRecords[contactIndex].id,
				"fields": {
					"phones": [e.target.value]
				}
			},
		], function(err, records) {
			if (err) {
				console.error(err);
				return;
			}
			records.forEach(function(record) {
				console.log(record.get('name'));
			});
		});

		var foundIt = false;
		var phoneHolder = this.state.contactPhones;
		var numberHolder = this.state.contactPhoneNumbers;
		for (let i = 0; i < this.state.phoneRecords.length; i++){
			if (this.state.phoneRecords[i].id == [e.target.value]){
				phoneHolder[contactIndex] = this.state.phoneRecords[i];
				numberHolder[contactIndex] = this.state.phoneRecords[i].fields.number;
				foundIt = true;
			}
		}
		if (!foundIt){
			phoneHolder[contactIndex] = null;
			numberHolder[contactIndex] = "None";
		}
		this.setState({
			contactPhones: phoneHolder,
			contactPhoneNumbers: numberHolder,
		})

	}


	deleteEntry(type, index){
		this.props.database(type).destroy([this.state.phoneRecords[index].id], function(err, deletedRecords) {
		  if (err) {
		    console.error(err);
		    return;
		  }
		  console.log('Deleted', deletedRecords.length, 'records');
		});
		//console.log(this.state.phoneRecords[index].id);
		setTimeout(function() {
			refreshPage();
		}, 100);
	}

	deleteContactEntry(index){
		this.props.database("contact").destroy([this.state.contactRecords[index].id], function(err, deletedRecords) {
			if (err) {
				console.error(err);
				return;
			}
			console.log('Deleted', deletedRecords.length, 'records');
		});
		//console.log(this.state.phoneRecords[index].id);
		setTimeout(function() {
			refreshPage();
		}, 100);
	}


	deleteServiceEntry(index){
		this.props.database("services").destroy([this.state.serviceRecords[index].id], function(err, deletedRecords) {
			if (err) {
				console.error(err);
				return;
			}
			console.log('Deleted', deletedRecords.length, 'records');
		});
		//console.log(this.state.phoneRecords[index].id);
		setTimeout(function() {
			refreshPage();
		}, 100);
	}


	deleteLocationEntry(index){
		this.props.database("locations").destroy([this.state.locationRecords[index].id], function(err, deletedRecords) {
			if (err) {
				console.error(err);
				return;
			}
			console.log('Deleted', deletedRecords.length, 'records');
		});
		//console.log(this.state.phoneRecords[index].id);
		setTimeout(function() {
			refreshPage();
		}, 100);
	}




	deleteTaxonomy(serviceIndex, taxonomyIndex){
		//console.log("State of service taxonomies going into funciton vvv THE INDEXES: " + serviceIndex + taxonomyIndex);
		//console.log(this.state.serviceTaxonomies);

		var holder = this.state.serviceTaxonomies;
		holder[serviceIndex].splice(taxonomyIndex, 1)
		//console.log("what holder makes: ");
		//console.log(holder);
		this.setState({
			serviceTaxonomies: holder
		})
		var idNumbers = [];
		for (let i = 0; i < holder[serviceIndex].length; i++){
			idNumbers[i] = holder[serviceIndex][i].id
		}
		this.props.database('services').update([
			{
				"id": this.state.serviceRecords[serviceIndex].id,
				"fields": {
					"taxonomy": idNumbers,
				}
			},
		], (err, records) => {
			if (err) {
				console.error(err);
				return;
			}
			records.forEach((record) => {
				console.log(record.get('id'));
			});
		});
		this.setState({
			serviceTaxonomies: holder,
			taxonomyRecords: [this.state.taxonomyRecords[0]],
		})
	}



	///CREATIONS HERE ////////////////////////////////////////////////////////////////////////////////////////////
	//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
	createPhoneRecord(){
		this.props.database('phones').create([
			{
				"fields": {
					"number": this.state.notListed,
					"description": this.state.notListed,
					"organizations": [
						this.state.organization.id
					],
				}
			},
		], (err, records) => {
			if (err) {
				console.error(err);
				return;
			}
		});
		//console.log(this.state.phoneRecord.id);
		setTimeout(function() {
			refreshPage();
		}, 100);
	}


	createServiceRecord(){


		this.props.database('services').create([
		  {
		    "fields": {
		      "id": "4",
		      "Organization": [
		        this.state.organization.id
		      ],
		      "Alternate Name": this.state.notListed,
		      "Description": this.state.notListed,
		      "url": this.state.notListed,
		      "email": this.state.notListed,
		      "Name": this.state.notListed,
		    }
		  },
		], function(err, records) {
		  if (err) {
		    console.error(err);
		    return;
		  }
		  records.forEach(function (record) {
		    console.log(record.getId());
		  });
		});


		setTimeout(function() {
			refreshPage();
		}, 100);
	}


	createContactRecord(){
		this.props.database('contact').create([
			{
				"fields": {
					"name": this.state.notListed,
					"title": this.state.notListed,
					"department": this.state.notListed,
					"email": this.state.notListed,
					"organizations": [
						this.state.organization.id
					],
				}
			},
		], (err, records) => {
			if (err) {
				console.error(err);
				return;
			}
		});
		//console.log(this.state.phoneRecord.id);
		setTimeout(function() {
			refreshPage();
		}, 100);
	}

	createLocationRecord(){
		var newLocation = [];
		this.props.database('locations').create([
			{
				"fields": {
					"name": this.state.notListed,
					"id": "999",								//FIXME: NOT GOD ID
					"alternate_name": this.state.notListed,
					"description": this.state.notListed,
					"transportation": this.state.notListed,
					"latitude": this.state.notListed,
					"longitude": this.state.notListed,
					"organization": [
						this.state.organization.id
					],
				}
			},
		], (err, records) => {
			if (err) {
				console.error(err);
				return;
			}
			newLocation = records;
		});
		//console.log(this.state.phoneRecord.id);
		setTimeout(() => {
			//console.log(newLocation);
			this.props.database('address').create([
				{
					"fields": {
						"address_1": this.state.notListed,
						"locations": [
							newLocation[0].id
						],
						"city": this.props.notListed,
						"State": this.props.notListed,
						"Zip Code": this.props.notListed,
						"address_type-x": [
							"physical_address"
						]
					}
				},
			], function(err, records) {
				if (err) {
					console.error(err);
					return;
				}
				records.forEach(function (record) {
					console.log(record.getId());
				});
			});
		}, 1000);

		setTimeout(function() {
			refreshPage();
		}, 1200);
	}




	handleSubmit(e) {
		this.props.database("organizations").update(
			[
				{
					id: this.state.organization.id,
					fields: {
						name: this.state.organizationName,
						description: this.state.organizationDescription,
						email: this.state.organizationEmail,
						url: this.state.organizationURL
					}
				}
			],
			function(err, records) {
				if (err) {
					console.error(err);
					return;
				}
				records.forEach(function(record) {
					//console.log(record.get('name'));
				});
			}
		);
		this.setState({
			org_update: false
		});


		if (this.state.phoneRecords.length > 0) {
			for (let i =0; i < this.state.phoneRecords.length; i++){
				console.log(this.state.phoneRecords);
				this.props.database("phones").update(
					[
						{
							id: this.state.phoneRecords[i].id,
							fields: {
								number: this.state.phoneNumbers[i],
								description: this.state.phoneDescriptions[i],
							}
						}
					],
					function(err, records) {
						if (err) {
							console.error(err);
							return;
						}
						records.forEach(function(record) {
							console.log(record.get("name"));
						});
					}
				);
			}
			this.setState({
				org_update: false
			});
		}

		if (this.state.serviceRecords.length > 0) {
			for (let i = 0; i < this.state.serviceRecords.length; i++){
				this.props.database("services").update(
					[
						{
							id: this.state.serviceRecords[i].id,
							fields: {
								"Alternate Name": this.state.serviceAltNames[i],
								Description: this.state.serviceDescriptions[i],
								url: this.state.serviceURLs[i],
								email: this.state.serviceEmails[i],
								Name: this.state.serviceNames[i]
							}
						}
					],
					function(err, records) {
						if (err) {
							console.error(err);
							return;
						}
						records.forEach(function(record) {
							console.log(record.get("id"));
						});
					}
				);
			}
		}

		//UPDATING CONTACT INFO /////////////////
		if (this.state.contactRecords.length > 0) {
			console.log("W e A r e m a k i n g i t i n  th e i f")
			for (let i = 0; i < this.state.contactRecords.length; i++){
				this.props.database("contact").update(
					[
						{
							id: this.state.contactRecords[i].id,
							fields: {
								"name": this.state.contactNames[i],
					      "title": this.state.contactTitles[i],
					      "department": this.state.contactTitles[i],
					      "email": this.state.contactEmails[i],
							}
						}
					],
					function(err, records) {
						if (err) {
							console.error(err);
							return;
						}
						records.forEach(function(record) {
							console.log(record.get("id"));
						});
					}
				);
			}
		}

		//UPDATING LOCATION INFO /////////////////
		if (this.state.locationRecords.length > 0) {
			console.log("MADE IT INSIDE THE LOCATION IF");
			for (let i = 0; i < this.state.locationRecords.length; i++){
				this.props.database("locations").update(
					[
						{
							id: this.state.locationRecords[i].id,
							fields: {
								"name": this.state.locationNames[i],
								"alternate_name": this.state.locationAltNames[i],
								"description": this.state.locationDescriptions[i],
								"transportation": this.state.locationTransportation[i],
								"latitude": this.state.locationLatitude[i],
								"longitude": this.state.locationLongitude[i],
							}
						}
					],
					function(err, records) {
						if (err) {
							console.error(err);
							return;
						}
						records.forEach(function(record) {
							console.log(record.get("id"));
						});
					}
				);

				/*console.log(this.state.addresses[i]);
				console.log(this.state.addressCities[i]);
				console.log(this.state.addressStates[i]);
				console.log(this.state.addressZipCodes[i]);
				console.log(this.state.addressCountries[i]);
				console.log(this.state.addressTypes[i]);*/

				this.props.database('address').update([
				  {
				    "id": this.state.locationAddressRecords[i].id[0],
				    "fields": {
				      "address_1": this.state.addresses[i],
				      "city": this.state.addressCities[i],
				      "State": this.state.addressStates[i],
				      "Zip Code": this.state.addressZipCodes[i],
							"Country": this.state.addressCountries[i],
				      "address_type-x": [
				        this.state.addressTypes[i][0]
				      ]
				    }
				  },
				], function(err, records) {
				  if (err) {
				    console.error(err);
				    return;
				  }
				  records.forEach(function(record) {
				    console.log(record.get('address_1'));
				  });
				});


			}

		}

		setTimeout(function() {
			refreshPage();
		}, 2000);
	}

	render() {
		return (
			<div className ="outermost">
				<div className="container mt-3">
					<OrgEditFields
						{...this.state.organization.fields}
						handleChange={this.handleChange}
						handleSubmit={this.handleSubmit}
					/>
				</div>
				<div className="container mt-3">
					{this.state.phoneRecords.length > 0
						? this.state.phoneRecords.map((phones, index) => (
								<div className="container mt-3" key={index}>
									<PhoneEditFields
										{...phones.fields}
										index = {index}
										handleNumberChange={this.handleNumberChange}
										handleDescriptionChange={this.handleDescriptionChange}
										handleSubmit={this.handleSubmit}
										deleteEntry={this.deleteEntry}
									/>
								</div>
							))
						: ""}
						<button
							onClick={event => this.createPhoneRecord()}
							className="btn btn-dark"
							type="button"
						>
							Create New Phone Record
						</button>
				</div>
				<div>
				{this.state.serviceRecords.length > 0
					? this.state.serviceRecords.map((services, index) => (
							<div className="container mt-3" key={index}>
								<ServiceEditFields
									{...services.fields}
									taxonomy = {this.state.serviceTaxonomies[index]}
									index = {index}
									handleServiceNameChange={this.handleServiceNameChange}
									handleServiceDescriptionChange={this.handleServiceDescriptionChange}
									handleSubmit={this.handleSubmit}
									deleteEntry={this.deleteEntry}
									taxonomyRecords={this.state.taxonomyRecords}
									deleteTaxonomy ={this.deleteTaxonomy}
									handleServiceTaxonomy={this.handleServiceTaxonomy}
									handleServiceAltNameChange = {this.handleServiceAltNameChange}
									handleServiceURLChange = {this.handleServiceURLChange}
									handleServiceEmailChange = {this.handleServiceEmailChange}
									deleteServiceEntry = {this.deleteServiceEntry}
								/>
							</div>
						))
					: ""}
					<button
						onClick={event => this.createServiceRecord()}
						className="btn btn-dark"
						type="button"
					>
						Create New Service Record
					</button>
				</div>
				<div className="container mt-3">
					{this.state.contactRecords.length > 0
						? this.state.contactRecords.map((contacts, index) => (
								<div className="container mt-3" key={index}>
									<ContactEditFields
										{...contacts.fields}
										index = {index}
										handleContactNameChange = {this.handleContactNameChange}
										handleContactTitleChange = {this.handleContactTitleChange}
										handleContactEmailChange = {this.handleContactEmailChange}
										handleContactDepartmentChange = {this.handleContactDepartmentChange}
										deleteContactEntry = {this.deleteContactEntry}
										services = {this.state.serviceRecords}
										handleContactService = {this.handleContactService}
										contactServiceName = {this.state.contactServiceNames[index]}
										contactPhoneNumber = {this.state.contactPhoneNumbers[index]}
										phones = {this.state.phoneRecords}
										handleContactPhone = {this.handleContactPhone}
									/>
								</div>
							))
						: ""}
						<button
							onClick={event => this.createContactRecord()}
							className="btn btn-dark"
							type="button"
						>
							Create New Contact Record
						</button>
				</div>
				<div className="container mt-3">
					{this.state.locationRecords.length > 0
						? this.state.locationRecords.map((location, index) => (
								<div className="container mt-3" key={index}>
									<LocationEditFields
										{...location.fields}
										handleLocationNameChange = {this.handleLocationNameChange}
										handleLocationAltNameChange = {this.handleLocationAltNameChange}
										handleLocationDescriptionChange = {this.handleLocationDescriptionChange}
										handleLocationTransportationChange = {this.handleLocationTransportationChange}
										handleLocationLatitudeChange = {this.handleLocationLatitudeChange}
										handleLocationLongitudeChange = {this.handleLocationLongitudeChange}
										deleteLocationEntry = {this.deleteLocationEntry}
										handleLocationService = {this.handleLocationService}
										locationServiceName = {this.state.locationServiceNames[index]}
										index = {index}
										services = {this.state.serviceRecords}

										addressRecord = {this.state.locationAddressRecords[index]}
										handleLocationAddressTypeChange = {this.handleLocationAddressTypeChange}
										handleLocationAddressCountryChange = {this.handleLocationAddressCountryChange}
										handleLocationAddressZipCodeChange = {this.handleLocationAddressZipCodeChange}
										handleLocationAddressStateChange = {this.handleLocationAddressStateChange}
										handleLocationAddressCityChange = {this.handleLocationAddressCityChange}
										handleLocationAddressChange = {this.handleLocationAddressChange}

									/>
								</div>
							))
						: ""}
						<button
							onClick={event => this.createLocationRecord()}
							className="btn btn-dark"
							type="button"
						>
							Create New Location Record
						</button>
				</div>
				<button
					onClick={event => this.handleSubmit(event)}
					className="btn btn-dark"
					type="button"
				>
					Submit Changes
				</button>
			</div>
		);
	}
}

function refreshPage() {
	window.location.reload(true);
}

//class OrgEditFields extends Component = ({name, alternate_name, description, email, url, phones}) =>(
class OrgEditFields extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<Form>
					<div className="ServiceEditingChunk1">
						<Form.Group controlId="organizationNameId">
							<Form.Label><h5>Organization Name</h5></Form.Label>
							<input
								type="organizationName"
								name="organizationName"
								placeholder={this.props.name}
								className="form-control"
								onChange={event => this.props.handleChange(event)}
							/>
						</Form.Group>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Description</Form.Label>
							<textarea
								type="organizationDescription"
								name="organizationDescription"
								as="textarea"
								rows="3"
								placeholder={this.props.description}
								className="form-control"
								onChange={event => this.props.handleChange(event)}
							/>
						</Form.Group>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Email</Form.Label>
							<input
								type="organizationEmail"
								name="organizationEmail"
								placeholder={this.props.email}
								className="form-control"
								onChange={event => this.props.handleChange(event)}
							/>
						</Form.Group>

						<Form.Group controlId="formGridAddress1">
							<Form.Label>URL</Form.Label>
							<input
								type="organizationURL"
								name="organizationURL"
								placeholder={this.props.url}
								className="form-control"
								onChange={event => this.props.handleChange(event)}
							/>
						</Form.Group>
					</div>
				</Form>
			</div>
		);
	}
}

class PhoneEditFields extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		//console.log(this.props)
		return (
			<div className="ServiceEditingChunk1">
				<Form>
					<Form.Group controlId="formBasicEmail">
						<Form.Label><h5>Phone {this.props.index + 1}</h5></Form.Label>
						<input
							type="organizationPhone"
							name="phoneNumbers"
							placeholder={this.props.number}
							className="form-control"
							onChange={event => this.props.handleNumberChange(event, this.props.index)}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Phone Description</Form.Label>
						<textarea
							type="organizationPhoneDescription"
							name="organizationPhoneDescription"
							as="textarea"
							rows="3"
							placeholder={this.props.description}
							className="form-control"
							onChange={event => this.props.handleDescriptionChange(event, this.props.index)}
						/>
					</Form.Group>
				</Form>
				<button
					onClick={event => this.props.deleteEntry("phones", this.props.index)}
					className="btn btn-dark"
					type="button"
				>
					Delete Phone {this.props.index + 1}
				</button>
			</div>
		);
	}
}

class ServiceEditFields extends Component {
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
			<div className="ServiceEditingChunk1">
				<Form>
					<Form.Group controlId="formBasicEmail">
						<Form.Label><h5>Service {this.props.index + 1} Name: {this.props.Name}</h5></Form.Label>
						<input
							type="serviceNames"
							name="serviceNames"
							placeholder={this.props.Name}
							className="form-control"
							onChange={event => this.props.handleServiceNameChange(event, this.props.index)}
						/>
						<Form.Label>Service Description</Form.Label>
						<input
							type="serviceNames"
							name="serviceNames"
							placeholder={this.props.Description}
							as="textarea"
							rows="3"
							className="form-control"
							onChange={event => this.props.handleServiceDescriptionChange(event, this.props.index)}
						/>
						<Form.Label>Service Alt Name</Form.Label>
						<input
							type="serviceNames"
							name="serviceNames"
							placeholder={this.props["Alternate Name"]}
							className="form-control"
							onChange={event => this.props.handleServiceAltNameChange(event, this.props.index)}
						/>
						<Form.Label>Service Location</Form.Label>
						<input
							type="serviceNames"
							name="serviceNames"
							placeholder={this.props.locations}
							className="form-control"
							onChange={event => this.props.handleServiceLocationChange(event, this.props.index)}
						/>
						<Form.Label>Service URL (if different from organization)</Form.Label>
						<input
							type="serviceNames"
							name="serviceNames"
							placeholder={this.props.url}
							className="form-control"
							onChange={event => this.props.handleServiceURLChange(event, this.props.index)}
						/>
						<Form.Label>Service Email (if different form Oranization)</Form.Label>
						<input
							type="serviceNames"
							name="serviceNames"
							placeholder={this.props.email}
							className="form-control"
							onChange={event => this.props.handleServiceEmailChange(event, this.props.index)}
						/>
						<Form.Label>{this.props.Name} Taxonomy / Taxonomies</Form.Label>
						{taxonomyList.length > 0
							? taxonomyList.map((taxonomy, index) => (
									<div key={index}>
									<Form.Label>Taxonomy {index + 1}</Form.Label>
										<h4>{taxonomy.fields.name}</h4>
										<button
											onClick={event => this.props.deleteTaxonomy(this.props.index, index)}
											className="btn btn-dark"
											type="button"
										>
											Delete Taxonomy {index + 1}
										</button>
									</div>
								))
							: ""}

							<p>If you would like to add another taxonomy, please narrow it down here: <br/> (continue until fields are no longer generated)</p>
							{(this.props.taxonomyRecords || []).map((recordSet, id) =>{
								return(
									<Form.Control key={id} as="select" name="serviceTaxonomyName" onChange={event => this.props.handleServiceTaxonomy(event, this.props.index)}>
										<option key={999} value={-1}>Please Select an Option</option>
										{(recordSet || []).map((record, key) => {
											return <option key={key} value={record.fields.id}>{record.fields.name}</option>;
										})}
									</Form.Control>
								)
							})}

					</Form.Group>
				</Form>
				<button
					onClick={event => this.props.deleteServiceEntry(this.props.index)}
					className="btn btn-dark"
					type="button"
				>
					Delete Service {this.props.index + 1}
				</button>
			</div>
		);
	}
}


class ContactEditFields extends Component {
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
			<div className="ServiceEditingChunk1">
				<Form>
					<Form.Group controlId="formBasicEmail">
						<Form.Label><h5>Contact {this.props.index + 1}</h5></Form.Label>
						<input
							type="contctName"
							name="contactName"
							placeholder={this.props.name}
							className="form-control"
							onChange={event => this.props.handleContactNameChange(event, this.props.index)}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Contact Title</Form.Label>
						<input
							type="contactTitle"
							name="contactTitle"
							placeholder={this.props.title}
							className="form-control"
							onChange={event => this.props.handleContactTitleChange(event, this.props.index)}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Contact Department: </Form.Label>
						<input
							type="contactDepartment"
							name="contactDepartment"
							placeholder={this.props.department}
							className="form-control"
							onChange={event => this.props.handleContactDepartmentChange(event, this.props.index)}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Contact Email: </Form.Label>
						<input
							type="contactEmail"
							name="contactEmail"
							placeholder={this.props.email}
							className="form-control"
							onChange={event => this.props.handleContactEmailChange(event, this.props.index)}
						/>
					</Form.Group>
					<p>This contact is currently associate with the service: {name}</p>
					<Form.Label>Would you like to associate this contact with a different service?</Form.Label>
					<Form.Control as="select" name="contactService" onChange={event => this.props.handleContactService(event, this.props.index)}>
						<option key={888} value={""}>No Change</option>
						<option key={987} value={""}>None / No service</option>
						{(this.props.services || []).map((service, key) => {
							return <option key={key} value={service.id}>{service.fields.Name}</option>;
						})}
					</Form.Control>
					<p><br/>This contact is currently associate with the phone: {number}</p>
					<Form.Label>Would you like to associate this contact with a different number?</Form.Label>
					<Form.Control as="select" name="contactNumber" onChange={event => this.props.handleContactPhone(event, this.props.index)}>
						<option key={888} value={""}>No Change</option>
						<option key={987} value={""}>None / No number</option>
						{(this.props.phones || []).map((phone, key) => {
							return <option key={key} value={phone.id}>{phone.fields.number}</option>;
						})}
					</Form.Control>
				</Form>
				<button
					onClick={event => this.props.deleteContactEntry(this.props.index)}
					className="btn btn-dark"
					type="button"
				>
					Delete Contact {this.props.index + 1}
				</button>
			</div>
		);
	}
}


class LocationEditFields extends Component { // WE WILL ALSO USE THESE FOR ADDRESSES
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
			<div className="ServiceEditingChunk1">
				<Form>
					<Form.Group controlId="formBasicEmail">
						<Form.Label><h5>Location {this.props.index + 1}</h5></Form.Label>
						<input
							type="locationName"
							name="locationName"
							placeholder={this.props.name}
							className="form-control"
							onChange={event => this.props.handleLocationNameChange(event, this.props.index)}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Location Alt Name</Form.Label>
						<input
							type="locationAltName"
							name="locationAltName"
							placeholder={this.props.alternate_name}
							className="form-control"
							onChange={event => this.props.handleLocationAltNameChange(event, this.props.index)}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Location Description: </Form.Label>
						<input
							type="locationDescription"
							name="locationDescription"
							placeholder={this.props.description}
							className="form-control"
							onChange={event => this.props.handleLocationDescriptionChange(event, this.props.index)}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Location Transportation: </Form.Label>
						<input
							type="locationTransportation"
							name="locationTransportation"
							placeholder={this.props.transportation}
							className="form-control"
							onChange={event => this.props.handleLocationTransportationChange(event, this.props.index)}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Location Latitude: </Form.Label>
						<input
							type="locationLatitude"
							name="locationLatitude"
							placeholder={this.props.latitude}
							className="form-control"
							onChange={event => this.props.handleLocationLatitudeChange(event, this.props.index)}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Location Longitude: </Form.Label>
						<input
							type="locationLongitude"
							name="locationLongitude"
							placeholder={this.props.longitude}
							className="form-control"
							onChange={event => this.props.handleLocationLongitudeChange(event, this.props.index)}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Location Address: </Form.Label>
						<input
							type="locationAddress"
							name="locationAddress"
							placeholder={this.props.addressRecord.fields.address_1}
							className="form-control"
							onChange={event => this.props.handleLocationAddressChange(event, this.props.index)}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Location Address City: </Form.Label>
						<input
							type="locationAddressCity"
							name="locationAddressCity"
							placeholder={this.props.addressRecord.fields.city}
							className="form-control"
							onChange={event => this.props.handleLocationAddressCityChange(event, this.props.index)}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Location Address State: </Form.Label>
						<input
							type="locationAddressState"
							name="locationAddressState"
							placeholder={this.props.addressRecord.fields.State}
							className="form-control"
							onChange={event => this.props.handleLocationAddressStateChange(event, this.props.index)}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Location Address Zip Code: </Form.Label>
						<input
							type="locationAddressZip"
							name="locationAddressZip"
							placeholder={this.props.addressRecord.fields["Zip Code"]}
							className="form-control"
							onChange={event => this.props.handleLocationAddressZipCodeChange(event, this.props.index)}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Location Address Country: </Form.Label>
						<input
							type="locationAddressCountry"
							name="locationAddressCountry"
							placeholder={this.props.addressRecord.fields.Country}
							className="form-control"
							onChange={event => this.props.handleLocationAddressCountryChange(event, this.props.index)}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Location Address Type: </Form.Label>
						<select onChange={event => this.props.handleLocationAddressTypeChange(event, this.props.index)}>
							<option value={this.props.addressRecord.fields["address_type-x"]}>{this.props.addressRecord.fields["address_type-x"]}</option>
							<option value="Physical Address">Physical Address</option>
							<option value="Postal Address">Postal Address</option>
						</select>
					</Form.Group>
					<p>This location is currently associate with the service: {name}</p>
					<Form.Label>Would you like to associate this contact with a different service?</Form.Label>
					<Form.Control as="select" name="contactService" onChange={event => this.props.handleLocationService(event, this.props.index)}>
						<option key={888} value={""}>No Change</option>
						<option key={987} value={""}>None / No service</option>
						{(this.props.services || []).map((service, key) => {
							return <option key={key} value={service.id}>{service.fields.Name}</option>;
						})}
					</Form.Control>
				</Form>
				<button
					onClick={event => this.props.deleteLocationEntry(this.props.index)}
					className="btn btn-dark"
					type="button"
				>
					Delete Location {this.props.index + 1}
				</button>
			</div>
		);
	}
}


//);
