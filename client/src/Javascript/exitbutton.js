import React from 'react';
import "../CSS/styles.css";
import axios from "axios";


export default class exitbutton extends React.Component{
   constructor(props) {
      super(props);
      this.state = {
         isopen: this.props.displayed
      }
      this.wrapperRef = React.createRef();
      this.buttonRef = React.createRef();
      this.handle_hide = this.handle_hide.bind(this)
    }

   static getDerivedStateFromProps(nextProps, prevState){
      if(nextProps.displayed !== prevState.isopen){
         return {isopen: nextProps.displayed}
      }
      else return null;
   }

   componentDidUpdate(prevProps, prevState){
      console.log("Got Here");
      console.log("prevProps: " + prevProps.displayed);
      if(prevProps.displayed !== prevState.isopen){
         console.log("Got Here")
         console.log("prevProps: " + prevProps.displayed)
         console.log("prevState")
         this.setState({isopen: prevProps.displayed})
      }
   }
   handle_hide() {
      const wrapper = this.wrapperRef.current;
      const button = this.buttonRef.current;
      const classes = Object.values(button.classList);
      // if(classes.includes("is-button-open")){
      console.log(this.props.displayed)
      if(!this.state.isopen){
         button.innerText='Hide Button';
         // this.props.action(true);
         const open = true;
         axios.post('/', open)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
         wrapper.classList.toggle('is-exit-open')
         button.classList.toggle('is-button-open')
         this.setState(prevState => ({
            isopen: true
         }))
         // this.props.action;
      }
      else {
         const open = false;
         button.innerText='Show Button';
         // this.props.action(false);
         axios.post('/', open)
         .then(function (response) {
           console.log(response);
         })
         .catch(function (error) {
           console.log(error);
         });
         wrapper.classList.toggle('is-exit-open')
         button.classList.toggle('is-button-open')
         this.setState(prevState => ({
            isopen: false
         }))
         // this.props.action;
      }
      

   }
   render(){
      return (
         <div className='exitbuttondiv'>
            <button type='button' className='btn btn-dark hide-button' id='exitbuttonhide' onClick={() => /*this.props.action*/this.handle_hide()} ref={this.buttonRef} >
               Hide Button
            </button>
            <nav className="navbar exit_button" id='flash-button-nav' ref={this.wrapperRef}>
               <a type='button' className ="navbar-item center" href="https://www.google.com" id='flash-button' >
                  <span className='navbar-text' id="button-exit-text">Exit Now</span>
                  <span className='navbar-text' id="button-description">If you are in an unsafe environment, click this button to quickly go to Google.com. Remember to clear your web history.</span>
               </a>
            </nav>
         </div>
      );
   }
};

//export default exitbutton;