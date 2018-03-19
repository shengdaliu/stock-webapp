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

class VolumeComponent extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        volumes:{}
      };
  }
  
  componentDidMount() {
    this.VolumeComponent();
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    
    if (nextProps.data !== this.props.data) {
      this.updateDataTable(nextProps.data);
      // this.VolumeComponent();
    }
  }

  updateDataTable(data){
    let volume_url = 'http://localhost:8080/stock/aggregateAvgVolume?';

    if(data.country !== '' && data.country !== undefined)
    {
        volume_url += '&description.Country=' + data.country;
    }

    if(data.sector !== '' && data.sector !== undefined)
    {
        volume_url += '&description.Sector=' + data.sector;
    }

    if(data.industry !== '' && data.industry !== undefined)
    {
        volume_url += '&description.Industry=' + data.industry;
    }

    axios.get(volume_url)
      .then(res => {
        const volumes = res.data[0];
        // Use Maths to round all result numbers
        Object.keys(volumes).map((objectKey) => {
          volumes[objectKey] = Math.round(volumes[objectKey] * Math.pow(10, 5)) / Math.pow(10, 5);
        });
        this.setState({ volumes });
      });
  }

  VolumeComponent() {
    this.updateDataTable(this.props.data);
  }

  render() {
    return (
    <div>
    <BootstrapTable data={[this.state.volumes]} version='4'>
        <TableHeaderColumn isKey dataField='avgAvgVolume'  columnClassName={ columnClassNameFormat }>Average Volume</TableHeaderColumn>
        <TableHeaderColumn dataField='minAvgVolume' columnClassName={ columnClassNameFormat }>Min Volume</TableHeaderColumn>
        <TableHeaderColumn dataField='maxAvgVolume' columnClassName={ columnClassNameFormat }>Max Volume</TableHeaderColumn>
    </BootstrapTable>
    <br/>
    </div>)
  }
}

VolumeComponent.displayName = 'VolumeComponent';

// Uncomment properties you need
// OfferComponent.propTypes = {};
// OfferComponent.defaultProps = {};

export default VolumeComponent;
