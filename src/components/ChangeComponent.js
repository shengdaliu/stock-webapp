'use strict';

import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import axios from 'axios';

require('styles//Stock.css');

function columnClassNameFormat(fieldValue) {
  let color = 'td-column-negative'

  if (Number(fieldValue) >= 0) {
    color = 'td-column-positive'
  }

  return color;
}

class ChangeComponent extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        changes:{}
      };
  }
  
  componentDidMount() {
    this.ChangeComponent();
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    
    if (nextProps.data !== this.props.data) {
      this.updateDataTable(nextProps.data);
      // this.ChangeComponent();
    }
  }

  updateDataTable(data){
    let change_url = 'http://localhost:8080/stock/aggregateChange?';

    if(data.country !== '' && data.country !== undefined)
    {
      change_url += '&description.Country=' + data.country;
    }

    if(data.sector !== '' && data.sector !== undefined)
    {
      change_url += '&description.Sector=' + data.sector;
    }

    if(data.industry !== '' && data.industry !== undefined)
    {
      change_url += '&description.Industry=' + data.industry;
    }

    axios.get(change_url)
      .then(res => {
        const changes = res.data[0];
        // Use Maths to round all result numbers
        Object.keys(changes).map((objectKey) => {
          changes[objectKey] = Math.round(changes[objectKey] * Math.pow(10, 5)) / Math.pow(10, 5);
        });
        this.setState({ changes });
      });
  }

  ChangeComponent() {
    this.updateDataTable(this.props.data);
  }

  render() {
    return (
    <div>
    <BootstrapTable data={[this.state.changes]} version='4'>
          <TableHeaderColumn isKey dataField='avgChange'  columnClassName={ columnClassNameFormat }>Average Change</TableHeaderColumn>
          <TableHeaderColumn dataField='minChange' columnClassName={ columnClassNameFormat }>Min Change</TableHeaderColumn>
          <TableHeaderColumn dataField='maxChange' columnClassName={ columnClassNameFormat }>Max Change</TableHeaderColumn>
      </BootstrapTable>
    <br/>
    </div>)
  }
}

ChangeComponent.displayName = 'ChangeComponent';

// Uncomment properties you need
// OfferComponent.propTypes = {};
// OfferComponent.defaultProps = {};

export default ChangeComponent;
