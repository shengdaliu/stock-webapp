require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

// let headerImage = require('../images/top-chef.png');

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        {/* <img src={headerImage} alt="Top Chef Header" /> */}
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
