import React from "react";
import history from './history';
import "../CSS/styles.css";


export default class buttonresults extends React.Component{
    constructor(props) {
		super(props);
		this.state = {
            events: [],
            html: [],
            num_events: 9999,
            events_did_update: false,
		}
    }
    componentDidMount (){
        this.props.database('bulletin_board').select({
        }).eachPage((events, fetchNextPage) => {
            if(this.state.num_events === 9999){
                this.setState(previousState => ({
                    num_events: events.length
                    //events: [...this.state.events, ...events]            
                }));
            }
            else{
                this.setState(previousState => ({
                    num_events: previousState.num_events + events.length
                    //events: [...this.state.events, ...events]            
                }));
            }
            
            events.map((event, index) => (
                console.log(event.fields['services']),
                this.props.database('services').find(event.fields['services'], (err, service) => {
                    var addresses = []
                    var phones = []
                    var organizations = []
                    console.log(service)
                        if(service !== undefined){
                        this.props.database('address').find(service.fields['address'], (err, address) => {
                            console.log("Address")
                            console.log(address)
                            addresses.push(address.fields['address_1'])//Object.assign({}, address))
                            addresses.push(address.fields['city'])
                            addresses.push(address.fields['State'])
                            addresses.push(address.fields['Zip Code'])
                        })
                        this.props.database('phones').find(service.fields['phones'], (err, phone) => {
                            phones.push(phone.fields['number'])//Object.assign({}, phone))
                        })
                        this.props.database('organizations').find(service.fields['Organization'], (err, organization) => {
                            organizations.push(organization.fields['name'].slice(0))//Object.assign({}, organization))
                        })
                        this.setState({
                            html: 
                                <div className='col'>
                                    <h2>
                                        {organizations[0]}
                                    </h2>
                                </div>
                        })
                    }
                    
                })
            ));
        });
    }

    componentDidUpdate (){

    }

    render(){
        if(this.state.events_did_update){
            return <div>{this.state.html}</div>;
        }
        else return null;
    }
};