import React from "react";
import history from './history';
import "../CSS/styles.css";


export default class buttonresults extends React.Component{
    constructor(props) {
		super(props);
		this.state = {
            continue: false,
            html: []
        }
        this.handleEvents = this.handleEvents.bind(this);
        this.handlePhones = this.handlePhones.bind(this);
        this.handleOrganizations = this.handleOrganizations.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.handleLocation = this.handleLocation.bind(this);
        this.handleInformation = this.handleInformation.bind(this);
        this.returnInformation = this.returnInformation.bind(this);
    }
    
    // locations = [];
    // events = [];
    // addresses = [];
    // phones = [];
    // organizations = [];

    handleEvents= async () => {
        console.log("Got to handleEvents")
        let all_events = [];
        await this.props.database('bulletin_board').select({
        }).eachPage((new_events, fetchNextPage) => {
            all_events = [...all_events, ...new_events]
            fetchNextPage();            
        })

        return all_events;
    }

    handleLocation= async (location_id) => {
        console.log("Got to handleLocation");
        let locations = [];
        await this.props.database('locations').find(location_id, (err, location) => {
            locations.push(location)
            
        });
        return locations;

    }

    handleAddress= async (location) => {
        console.log(location)
        console.log("Got to handleAddress")
        let addresses = [];
        await this.props.database('address').find(location.fields['address'], (err, address) => {
            addresses.push(address);
        })
        return addresses;
    }

    handlePhones= async (location) => {
        console.log("Got to handlePhones")
        let phones = [];
        await this.props.database('phones').find(location, (err, phone) => {
            phones.push(phone);
        })
        return phones;
    }

    handleOrganizations= async (location) => {
        console.log("Got to handleOrganizations")
        let organizations = [];
        await this.props.database('organizations').find(location, (err, organization) => {
            organizations.push(organization);
        })
        return organizations;
    }

    handleInformation = async() => {
        console.log("Got to handleInformation")
        const events = await this.handleEvents();
        // let locations;
        // let addresses;
        // let phones;
        // let organizations;
        let html = [];
        for(let i = 0; i < events.length; i++){
            var date = events[i].fields['date'];
            var month = date.slice(5,7);
            var year = date.slice(0,4);
            var day = date.slice(8,10);
            var hour = parseInt(date.slice(11,13));
            var minute = date.slice(13,16);
            var ampm;

            if(hour > 12 && hour < 24){
                ampm = 'PM';
                hour = hour - 12;
            }
            else if(hour == 12){
                ampm = 'PM';
            }
            else if(hour == 0){
                ampm ='AM';
                hour = 12
            }
            else{
                ampm='AM';
            }
            console.log(events[i].fields['location'])
            var location = await this.handleLocation(events[i].fields['location']);
            console.log(location);
            var address = await this.handleAddress(location.id);
            var phone = await this.handlePhones(location.id);
            var organization = await this.handleOrganizations(location.id);

            html = [...html, <div className='t-row' key={events[i].id}>
                                {events[i] !== undefined ? 
                                <div className='t-col'>
                                    <p>{month}/{day}/{year}</p>
                                </div>:null}

                                {/*------------------------------------------*/}
                                {events[i] !== undefined ? 
                                <div className='t-col'>
                                    <p>{hour+minute + ' ' + ampm}</p>
                                </div>:null}
                                {/*------------------------------------------*/}
                                {events[i] !== undefined ? 
                                <div className='t-col'>
                                    <p>
                                        {events[i] !== undefined ? events[i].fields['event_name']: 'event name unavailable'}
                                    </p>
                                </div>
                                :<p>invalid event name</p>}
                                {/*------------------------------------------*/}
                                {location !== undefined ? 
                                <div className='t-col'>
                                    <p>
                                        {location !== undefined ? location.fields['name']: 'event name unavailable'}
                                    </p>
                                </div>
                                :<h3>invalid location name</h3>}
                                {/*------------------------------------------*/}
                                {events[i] !== undefined ? 
                                <div className='t-col'>
                                    <p>
                                        {address !== undefined ? address.fields['address_1']: 'street'}&nbsp;
                                        {address !== undefined ? address.fields['city']: 'city'},&nbsp;
                                        {address !== undefined ? address.fields['State']: 'state'}&nbsp;
                                        {address !== undefined ? address.fields['Zip Code']: '00000'}
                                    </p>
                                </div>:null}
                                {/*------------------------------------------*/}
                                {events[i] !== undefined ? 
                                <div className='t-col'>
                                    <p>
                                        {phone !== undefined ? phone.fields['number']: 'phone number unavailable'}
                                    </p>
                                </div>
                                :<h3>invalid phone number</h3>}
                                </div>];


        }
        return html;

    }

    returnInformation = async() => {
        console.log("Got to returnInformation")
        const html = await this.handleInformation();
        this.setState(prevState=>({
            continue: true
        }));
        return html;

    }

    componentDidMount(){
        if(this.state.continue === false){
            console.log("Component Did Update")
            let html = this.returnInformation();
            this.setState =(prevState =>({
                html: html
            }))
        }
    }





    render(){
        if(this.state.continue){
            return  (<div className="table">
                        <div className='t-title'><p>Events</p></div>
                            <div className='heading'>
                                <div className='t-col'><p>Date</p></div>
                                <div className='t-col'><p>Time</p></div>
                                <div className='t-col'><p>Event Name</p></div>
                                <div className='t-col'><p>Location</p></div>
                                <div className='t-col'><p>Address</p></div>
                                <div className='t-col'><p>Phone Number</p></div>
                                
                            </div>
                            {this.state.html}
                            </div>);
        }
        else return null;
    }
};