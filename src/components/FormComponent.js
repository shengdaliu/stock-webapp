'use strict';

import React from 'react';
// import axios from 'axios';
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
      // var api_url = 'http://localhost:8080/stock/distinct?key=description.Country';
      // // console.log(api_url);
      // axios.get(api_url)
      //   .then(res => {
      //     const countryList = res.data;
      //     this.setState({ countryList });
      //   });
      // api_url = 'http://localhost:8080/stock/distinct?key=description.Sector';
      // axios.get(api_url)
      //   .then(res => {
      //     const sectorList = res.data;
      //     this.setState({ sectorList });
      //   });
      // api_url = 'http://localhost:8080/stock/distinct?key=description.Industry';
      // axios.get(api_url)
      //   .then(res => {
      //     const industryList = res.data;
      //     this.setState({ industryList });
      //   });
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
              <option value=""></option>
              <option value="USA">USA</option><option value="Canada">Canada</option><option value="Switzerland">Switzerland</option><option value="Brazil">Brazil</option><option value="Bermuda">Bermuda</option><option value="China">China</option><option value="Ireland">Ireland</option><option value="Israel">Israel</option><option value="Netherlands">Netherlands</option><option value="Luxembourg">Luxembourg</option><option value="Germany">Germany</option><option value="Chile">Chile</option><option value="France">France</option><option value="Sweden">Sweden</option><option value="Mexico">Mexico</option><option value="Colombia">Colombia</option><option value="Greece">Greece</option><option value="Argentina">Argentina</option><option value="Taiwan">Taiwan</option><option value="United Kingdom">United Kingdom</option><option value="Japan">Japan</option><option value="South Africa">South Africa</option><option value="Singapore">Singapore</option><option value="Australia">Australia</option><option value="Peru">Peru</option><option value="Spain">Spain</option><option value="Panama">Panama</option><option value="Hong Kong">Hong Kong</option><option value="Belgium">Belgium</option><option value="Russia">Russia</option><option value="Cayman Islands">Cayman Islands</option><option value="Channel Islands">Channel Islands</option><option value="Italy">Italy</option><option value="Monaco">Monaco</option><option value="South Korea">South Korea</option><option value="India">India</option><option value="British Virgin Islands">British Virgin Islands</option><option value="Finland">Finland</option><option value="Denmark">Denmark</option><option value="Netherlands Antilles">Netherlands Antilles</option><option value="Cyprus">Cyprus</option><option value="Philippines">Philippines</option><option value="Portugal">Portugal</option><option value="Bahamas">Bahamas</option><option value="Norway">Norway</option><option value="Turkey">Turkey</option><option value="Indonesia">Indonesia</option>
            </FormControl>
          </FormGroup>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Sector :</ControlLabel>
            <FormControl componentClass="select" placeholder="select" value={this.state.sector} onChange={this.handleSectorChange}>
              <option value=""></option>
              <option value="Healthcare">Healthcare</option><option value="Basic Materials">Basic Materials</option><option value="Financial">Financial</option><option value="Services">Services</option><option value="Technology">Technology</option><option value="Industrial Goods">Industrial Goods</option><option value="Consumer Goods">Consumer Goods</option><option value="Utilities">Utilities</option><option value="Conglomerates">Conglomerates</option>
            </FormControl>
          </FormGroup>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Industry :</ControlLabel>
            <FormControl componentClass="select" placeholder="select" value={this.state.industry} onChange={this.handleIndustryChange}>
              <option value=""></option>
              <option value="Medical Laboratories & Research">Medical Laboratories & Research</option><option value="Aluminum">Aluminum</option><option value="Exchange Traded Fund">Exchange Traded Fund</option><option value="Asset Management">Asset Management</option><option value="Life Insurance">Life Insurance</option><option value="Rental & Leasing Services">Rental & Leasing Services</option><option value="Semiconductor - Integrated Circuits">Semiconductor - Integrated Circuits</option><option value="General Building Materials">General Building Materials</option><option value="Auto Parts Stores">Auto Parts Stores</option><option value="Electronic Equipment">Electronic Equipment</option><option value="REIT - Office">REIT - Office</option><option value="Gold">Gold</option><option value="Oil & Gas Drilling & Exploration">Oil & Gas Drilling & Exploration</option><option value="Air Services, Other">Air Services, Other</option><option value="Diagnostic Substances">Diagnostic Substances</option>
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
  