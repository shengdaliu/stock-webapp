'use strict';

import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import axios from 'axios';

require('styles//Stock.css');

function descriptionFormatter(cell, row) {
  let description = `<p>${row.description.Country}<p><p>${row.description.Sector}<p><p>${row.description.Industry}<p>`;
  return description;
}

function priceFormatter(fieldValue) {
  return `<img class="icon" src="../images/dollar-sign.svg">${fieldValue}K`;
}

function percentFormatter(fieldValue) {
  return `${fieldValue}%`;
}

function columnClassNameFormat(fieldValue) {
  let color = 'td-column-negative'

  if (Number(fieldValue) >= 0) {
    color = 'td-column-positive'
  }

  return color;
}

class StockComponent extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        changes: {},
        volumes:{},
        stocks: []
      };
  }
  
  componentDidMount() {
    this.StockComponent();
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    
    if (nextProps.data !== this.props.data) {
      this.updateDataTable(nextProps.data);
      // this.StockComponent();
    }
  }

  updateDataTable(data){
    let api_url = 'http://localhost:8080/stock?';
    
    if(data.country !== '' && data.country !== undefined)
    {
      api_url += '&description.Country=' + data.country;
    }

    if(data.sector !== '' && data.sector !== undefined)
    {
      api_url += '&description.Sector=' + data.sector;
    }

    if(data.industry !== '' && data.industry !== undefined)
    {
      api_url += '&description.Industry=' + data.industry;
    }

    axios.get(api_url)
      .then(res => {
        const stocks = res.data;
        this.setState({ stocks });
      });
  }

  StockComponent() {
    this.updateDataTable(this.props.data);
  }

  render() {
    var listStocks = this.state.stocks;

    return (
    <div>
    <BootstrapTable exportCSV data={listStocks} version='4'
      search>
          <TableHeaderColumn isKey dataField='Company' dataSort={ true }>Company Name</TableHeaderColumn>
          <TableHeaderColumn dataField='description' dataFormat={ descriptionFormatter } >Description</TableHeaderColumn>
          <TableHeaderColumn dataField='Change' dataSort={ true } dataFormat={ percentFormatter } columnClassName={ columnClassNameFormat } >24h Change</TableHeaderColumn>
          <TableHeaderColumn dataField='Average Volume' dataSort={ true } dataFormat={ priceFormatter } columnClassName={ columnClassNameFormat } >Average Volume</TableHeaderColumn>
      </BootstrapTable>
      
    </div>)
  }
}

StockComponent.displayName = 'StockComponent';

// Uncomment properties you need
// OfferComponent.propTypes = {};
// OfferComponent.defaultProps = {};

export default StockComponent;
