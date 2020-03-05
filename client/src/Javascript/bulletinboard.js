import React from "react";
import history from './history';
import "../CSS/styles.css";


export default class buttonresults extends React.Component{
    constructor(props) {
		super(props);
		this.state = {
            events: [],
            addresses: [],
            organizations: [],
            locations: [],
            phones: [],
            html: [],
            num_events: 9999,
            continue: false,
            events_did_update: false,
		}
    }
    componentDidMount (){
        this.props.database('bulletin_board').select({
        }).eachPage((events, fetchNextPage) => {
            if(this.state.num_events === 9999){
                this.setState(previousState => ({
                    num_events: events.length,
                    events: [...this.state.events, ...events]            
                }));
            }
            else{
                this.setState(previousState => ({
                    num_events: previousState.num_events + events.length,
                    events: [...this.state.events, ...events]            
                }));
            }
            
            events.map(async (event, index) => (
                console.log(event.fields['location']),
                this.props.database('locations').find(event.fields['location'], (err, location) => {
                    // const addresses = [];
                    // const phones = [];
                    // const organizations = "";
                    if(location !== undefined){
                        this.props.database('address').find(location.fields['address'], (err, address) => {
                            this.setState({
                                addresses: [...this.state.addresses, address]
                            })
                        })
                        this.props.database('phones').find(location.fields['phones'], (err, phone) => {
                            console.log("phone")
                            console.log(phone.fields['number'])
                            this.setState({
                                phones: [...this.state.phones, phone]
                            })
                        })
                        this.props.database('organizations').find(location.fields['organization'], (err, organization) => {
                            this.setState({
                                organizations: [...this.state.organizations, organization]
                            })
                        })
                        this.setState({
                            locations: [...this.state.locations, location]
                        })

                        // console.log(organizations)
                        // this.setState({
                        //     html: 
                        //         <div className='col'>
                        //             <h2>     
                        //                 {organizations}
                        //             </h2>
                        //         </div>
                        // })
                    }
                    
                })
            ));
            fetchNextPage();
        }, (err) =>{
            if (err) { console.error(err); return; }
            this.setState(previousState => ({
                events_did_update: true,          
            }));
        });
    }

    componentDidUpdate (prevProps, prevState){
        if(this.state.events_did_update){
            if(this.state.events_did_update !== prevState.events_did_update){}
            else{
                for(let i = 0; i < this.state.events.length; i ++){
                    let date;
                    let month;
                    let year;
                    let day;
                    let hour;
                    let minute;
                    let ampm;
                    if(this.state.events[i] !== undefined){
                        date = this.state.events[i].fields['date'];
                        month = date.slice(5,7);
                        year = date.slice(0,4);
                        day = date.slice(8,10);
                        hour = parseInt(date.slice(11,13));
                        minute = date.slice(13,16);
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

                    }
                    else{
                        month ='00';
                        year='0000';
                        day='00';
                    }
                    this.setState(previousState => ({
                        html: [...this.state.html, 
                        <div className='t-row' key={this.state.events[i].id}>
                            {this.state.events[i] !== undefined ? 
                            <div className='t-col'>
                                <p>{month}/{day}/{year}</p>
                            </div>:null}

                            {/*------------------------------------------*/}
                            {this.state.events[i] !== undefined ? 
                            <div className='t-col'>
                                <p>{hour+minute + ' ' + ampm}</p>
                            </div>:null}
                            {/*------------------------------------------*/}
                            {this.state.events[i] !== undefined ? 
                            <div className='t-col'>
                                <p>
                                    {this.state.events[i] !== undefined ? this.state.events[i].fields['event_name']: 'event name unavailable'}
                                </p>
                            </div>
                            :<p>invalid event name</p>}
                            {/*------------------------------------------*/}
                            {this.state.locations[i] !== undefined ? 
                            <div className='t-col'>
                                <p>
                                    {this.state.locations[i] !== undefined ? this.state.locations[i].fields['name']: 'event name unavailable'}
                                </p>
                            </div>
                            :<h3>invalid location name</h3>}
                            {/*------------------------------------------*/}
                            {this.state.events[i] !== undefined ? 
                            <div className='t-col'>
                                <p>
                                    {this.state.addresses[i] !== undefined ? this.state.addresses[i].fields['address_1']: 'street'}&nbsp;
                                    {this.state.addresses[i] !== undefined ? this.state.addresses[i].fields['city']: 'city'},&nbsp;
                                    {this.state.addresses[i] !== undefined ? this.state.addresses[i].fields['State']: 'state'}&nbsp;
                                    {this.state.addresses[i] !== undefined ? this.state.addresses[i].fields['Zip Code']: '00000'}
                                </p>
                            </div>:null}
                            {/*------------------------------------------*/}
                            {this.state.events[i] !== undefined ? 
                            <div className='t-col'>
                                <p>
                                    {this.state.phones[i] !== undefined ? this.state.phones[i].fields['number']: 'phone number unavailable'}
                                </p>
                            </div>
                            :<h3>invalid phone number</h3>}
                        </div> ]       
                    }));
                    if(i === this.state.events.length -1){
                        this.setState(previousState =>({
                            events_did_update: false,
                            continue: true
                        }))
                    }
                }
            }
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