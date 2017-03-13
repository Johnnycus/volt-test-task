import React, { Component } from 'react';
import { render } from 'react-dom';

import 'react-select/dist/react-select.css';

import Customers from './Customers';

class App extends Component {
  render() {
    return (
      <Customers />
    );
  }
}

render(<App />, document.getElementById('app-root'));
