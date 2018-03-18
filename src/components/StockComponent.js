'use strict';

import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import axios from 'axios';

require('styles//Stock.css');

function descriptionFormatter(cell, row) {
  let description = `<p>${row.description.Country}<p><p>${row.description.Sector}<p><p>${row.description.Industry}<p>`;
  return description;
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
        stocks: []
      };
  }
  
  componentDidMount() {
    this.StockComponent();
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.data.country !== this.state.country) {
      this.StockComponent();
    }
  }

  StockComponent() {
    let api_url = 'http://localhost:8080/stock?';
    let change_url = 'http://localhost:8080/stock/aggregateChange?';


    if(this.props.data.country !== '' && this.props.data.country !== undefined)
    {
      api_url += '&description.Country=' + this.props.data.country;
      change_url += '&description.Country=' + this.props.data.country;
    }

    if(this.props.data.sector !== '' && this.props.data.sector !== undefined)
    {
      api_url += '&description.Sector=' + this.props.data.sector;
      change_url += '&description.Sector=' + this.props.data.sector;
    }

    if(this.props.data.industry !== '' && this.props.data.industry !== undefined)
    {
      api_url += '&description.Industry=' + this.props.data.industry;
      change_url += '&description.Industry=' + this.props.data.industry;
    }
  
    axios.get(api_url)
      .then(res => {
        const stocks = res.data;
        this.setState({ stocks });
      });

    axios.get(change_url)
      .then(res => {
        const changes = res.data[0];
        this.setState({ changes });
      });
  }

  render() {
    var listStocks = this.state.stocks;

    return (
    <div>
    <BootstrapTable data={[this.state.changes]} version='4'>
          <TableHeaderColumn isKey dataField='avgChange'  columnClassName={ columnClassNameFormat }>Average Change</TableHeaderColumn>
          <TableHeaderColumn dataField='minChange' columnClassName={ columnClassNameFormat }>Min Change</TableHeaderColumn>
          <TableHeaderColumn dataField='maxChange' columnClassName={ columnClassNameFormat }>Max Change</TableHeaderColumn>
      </BootstrapTable>
    <br/>
    <BootstrapTable exportCSV data={listStocks} version='4'
      search>
          <TableHeaderColumn isKey dataField='Company' dataSort={ true }>Company Name</TableHeaderColumn>
          <TableHeaderColumn dataField='Change' dataSort={ true } columnClassName={ columnClassNameFormat } >24h Change</TableHeaderColumn>
          <TableHeaderColumn dataField='description' dataFormat={ descriptionFormatter } >Description</TableHeaderColumn>
      </BootstrapTable>
      
    </div>)
  }
}

StockComponent.displayName = 'StockComponent';

// Uncomment properties you need
// OfferComponent.propTypes = {};
// OfferComponent.defaultProps = {};

export default StockComponent;
