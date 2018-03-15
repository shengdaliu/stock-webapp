'use strict';

import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import axios from 'axios';

require('styles//Stock.css');

var api_url = 'http://localhost:8080/stock?description.Country=France';


class StockComponent extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        stocks: []
      };
  }
  
  componentDidMount() {
    this.StockComponent();
  }

  StockComponent() {
    axios.get(api_url)
      .then(res => {
        const stocks = res.data;
        this.setState({ stocks });
      });
  }

  render() {
    var listStocks = this.state.stocks;

    return (<BootstrapTable exportCSV data={listStocks} version='4'
      expandableRow={ this.isExpandableRow }
      expandComponent={ this.expandComponent }
      search>
          <TableHeaderColumn isKey dataField='Company' dataSort={ true }>a</TableHeaderColumn>
          <TableHeaderColumn dataField='Change' dataSort={ true }>b</TableHeaderColumn>
          <TableHeaderColumn dataField='description' dataSort={ true }>c</TableHeaderColumn>
      </BootstrapTable>)
  }
}

StockComponent.displayName = 'StockComponent';

// Uncomment properties you need
// OfferComponent.propTypes = {};
// OfferComponent.defaultProps = {};

export default StockComponent;
