require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Form from './FormComponent';
import Stock from './StockComponent';

let headerImage = require('../images/stock.png');

class AppComponent extends React.Component {
  constructor() {
    super();
    this.handleData = this.handleData.bind(this);
    this.state = {};
  }
  
  handleData(data) {
    this.setState(data);
  }

  render() {
    return (
      <div>
        <div className="index">
          <img src={headerImage} alt="Stock Image Header" />
        </div>
        <Form handlerFromParent={this.handleData}/>
        <Stock data={this.state}/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
