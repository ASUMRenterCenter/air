import React, { Component } from 'react';
import phoneimg from '../Images/ButtonImages/phone.png';
import '../CSS/styles.css'

export default class HotlineBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
            hotlines: [],
            buttonclosed: false
        }
        this.wrapperRef = React.createRef();
    }

    componentDidMount(){
        this.props.database("hotlines").select({

            }).eachPage((hotlines, fetchNextPage) => {
                this.setState({
                hotlines
                });
             
            fetchNextPage();
            }, function done(error) {});
    }

    handleClick(){
        const wrapper = this.wrapperRef.current;
        wrapper.classList.toggle('is-nav-open')
        console.log("was clicked")
    }

    icondisplay(){
        if(this.state.buttonclosed){
            this.setState({
                buttonclosed: false
            })
        }
        else {
            this.setState({
                buttonclosed: true
            })
        }
    }

    render (){
        return (
            <div ref={this.wrapperRef} className="wrapper buttonpagescolumn">
                <div className="side">
                    {this.state.buttonclosed ? (<button 
                        className="nav__icon"
                        onClick={() => {this.handleClick(); this.icondisplay();}}
                    >&#x25C1;</button>) :
                    (<button 
                        className="nav__icon"
                        onClick={() => {this.handleClick(); this.icondisplay();}}
                    >&#x274C;</button>)
                    }
                    <div className="nav__body">
                        <ul className="sidebarcontent">
                            {this.state.hotlines.length > 0 ? (
                                this.state.hotlines.map((hotline, index) =>
                                    <li key={hotline.id}>
                                        <h1 className="hotlinetitles">
                                            <img src={phoneimg} alt='phone' height="30px" width="30px" />
                                            {hotline.fields['name']} Hotline
                                        </h1>
                                        <h2 className="hotlinephone">{hotline.fields['phone']}</h2>   
                                    </li>
                                )):(null)}
                        </ul>


                    {/* </div> */}
                    </div>
                </div>
            </div>
        );
    }
}


    
//     // closeNav() {
//     //     document.getElementById("mySidebar").style.width = "0";
//     //     document.getElementById("main").style.marginRight = "0";
//     // }
//     render(){
//         return (
//             
//         );
//     }
// }
