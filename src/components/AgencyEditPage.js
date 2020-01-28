
import { Jumbotron } from 'react-bootstrap'
import '../CSS/ComponentStyle.css'
import AgencyEditingFields from './AgencyEditingFields'
import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import {Col} from "react-bootstrap"
import SaveChangesButton from "./SaveChangesButton.js"



export default class AgencyEditPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
	     organization: [],
       organizationName: "",
       organizationDescription: "",
       organizationEmail: "",
       organizationURL: "",
       org_updated: false,
		}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log(this.state.organizationURL);
	}

  componentDidMount() {
		this.props.database('organizations').select({
			filterByFormula: '{id} = "47"',//Your ord ID here
			view: "Grid view",
		}).eachPage((organization, fetchNextPage) => {
			this.setState({
				organization
			});
			console.log(organization)
			fetchNextPage();
		}, function done(error) {
			console.log("Will Return An Error:" + error);
		});

	}

  componentDidUpdate() {
    if (this.state.organization.length > 0 && !this.state.org_update){
      this.setState({
        organizationName: this.state.organization[0].fields["name"],
        organizationDescription: this.state.organization[0].fields["description"],
        organizationEmail: this.state.organization[0].fields["email"],
        organizationURL: this.state.organization[0].fields["url"],
        org_update: true
      })
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value

    });
    console.log(this.state.organizationName);
  }


  handleSubmit(e) {
    this.props.database('organizations').update([
      {
        "id": "recgRmL5hpzXrhUHI",
        "fields": {
          "name": this.state.organizationName,
          "description": this.state.organizationDescription,
          "email": this.state.organizationEmail,
          "url": this.state.organizationURL
        }
      }
    ], function(err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function(record) {
        console.log(record.get('name'));
      });
    });
    this.setState({
      org_update: false
    })
    setTimeout(function(){
      refreshPage();
    }, 100);
  }


  render() {
		return (
			<div className="outermost">
				{this.state.organization.length > 0 ? (
					this.state.organization.map((organizations, index) =>
					<div className ="container mt-3" key={organizations.id}>
						<OrgEditFields {...organizations.fields} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
					</div>
					)
				):("")
				}
			</div>
		)

	}

}

function refreshPage(){
  window.location.reload(true);
}

//class OrgEditFields extends Component = ({name, alternate_name, description, email, url, phones}) =>(
class OrgEditFields extends Component{
  constructor(props) {
		super(props);
		this.state = {

		}
	}

  render(){
    return(
      <div>
        <Form>
          <div className="ServiceEditingChunk1">
            <Form.Group controlId="organizationNameId">
              <Form.Label>Organization Name</Form.Label>
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
              <button
                onClick={event => this.props.handleSubmit(event)}
                className="btn btn-dark"
                type="button"
              >
                Submit Changes
              </button>
            </div>
        </Form>

      </div>
    )
  }
}



//);
