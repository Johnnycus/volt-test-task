import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import 'react-select/dist/react-select.css';

import Header from './Header';
import Products from './Products';
import Customers from './Customers';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />

          <Route exact path="/" component={Products}/>
          <Route path="/products" component={Products}/>
          <Route path="/customers" component={Customers}/>
        </div>
      </Router>
    );
  }
}

render(<App />, document.getElementById('app-root'));
