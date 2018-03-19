'use strict';

import React from 'react';
import axios from 'axios';
import {FormGroup,FormControl,ControlLabel, Button} from 'react-bootstrap';

class FormComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        country: '',
        sector: '',
        industry: '',
        company: '',
        countryList: [],
        sectorList: [],
        industryList: []
      };
  
      this.handleCountryChange = this.handleCountryChange.bind(this);
      this.handleSectorChange = this.handleSectorChange.bind(this);
      this.handleIndustryChange = this.handleIndustryChange.bind(this);
      this.handleCompanyChange = this.handleCompanyChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
      this.FormComponent();
    }
    
    FormComponent() {
      const country_url = 'http://localhost:8080/stock/distinct?key=description.Country';
      const sector_url = 'http://localhost:8080/stock/distinct?key=description.Sector';
      const industry_url = 'http://localhost:8080/stock/distinct?key=description.Industry';
      axios.get(country_url)
        .then(res => {
          const countryList = res.data;
          this.setState({ countryList });
        });
      axios.get(sector_url)
        .then(res => {
          const sectorList = res.data;
          this.setState({ sectorList });
        });
      axios.get(industry_url)
        .then(res => {
          const industryList = res.data;
          this.setState({ industryList });
        });
    }
  
    handleCountryChange(event) {
      this.setState({country: event.target.value});
      // this.props.handlerFromParent(this.state);
    }
    handleSectorChange(event) {
      this.setState({sector: event.target.value});
      // this.props.handlerFromParent(this.state);
    }
    handleIndustryChange(event) {
      this.setState({industry: event.target.value});
      // this.props.handlerFromParent(this.state);
    }
    handleCompanyChange(event) {
      this.setState({company: event.target.value});
    }
  
    handleSubmit(event) {
      event.preventDefault();
      // pass the input field value to the event handler passed
      // as a prop by the parent (App)
      this.props.handlerFromParent(this.state);
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Country :</ControlLabel>
            <FormControl componentClass="select" placeholder="select" value={this.state.country} onChange={this.handleCountryChange}>
              <option value="">All</option>
              {this.state.countryList.map((country) => {
                return <option key={country} value={country}>{country}</option>
              })}
            </FormControl>
          </FormGroup>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Sector :</ControlLabel>
            <FormControl componentClass="select" placeholder="select" value={this.state.sector} onChange={this.handleSectorChange}>
              <option value="">All</option>
              {this.state.sectorList.map((sector) => {
                return <option key={sector} value={sector}>{sector}</option>
              })}
            </FormControl>
          </FormGroup>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Industry :</ControlLabel>
            <FormControl componentClass="select" placeholder="select" value={this.state.industry} onChange={this.handleIndustryChange}>
              <option value="">All</option>
              {this.state.industryList.map((industry) => {
                return <option key={industry} value={industry}>{industry}</option>
              })}
            </FormControl>
          </FormGroup>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Company Name :</ControlLabel>
            <FormControl
              type="text"
              value={this.state.company}
              placeholder="Enter text"
              onChange={this.handleCompanyChange}
            />
          </FormGroup>
          
          <p/>
          <Button type="submit">Submit</Button>
          <p/>
        </form>
      )
    }
  }
  
FormComponent.displayName = 'FormComponent';
export default FormComponent;
  