import React from "react";
import history from './history';
import "../CSS/styles.css";


export default class buttonresults extends React.Component{
    constructor(props) {
		super(props);
		this.state = {
            events: [],
            events_did_update: false,
		}
    }
    componentDidMount (){
        this.props.database('bulletin_board').select({
        }).eachPage((events, fetchNextPage) => {
            console.log(events)
            this.setState(previousState => ({
                events: [...this.state.events, ...events]            
            }));
        });
    }

    componentDidUpdate (){

    }

    render(){
        return (<h1>This is a test</h1>);
    }
};