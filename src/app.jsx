import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'react-select/dist/react-select.css';

import Header from './Header.jsx';
import Invoices from './Invoices';
import InvoiceForm from './InvoiceForm';
import Products from './Products';
import Customers from './Customers';

const App = () => {
  return (
    <Router>
      <div>
        <Header />

        <Route exact path="/" component={Invoices} />
        <Route exact path="/invoices" component={Invoices} />
        <Route exact path="/invoices/create" component={InvoiceForm} />
        <Route exact path="/invoices/:id/edit" component={InvoiceForm} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/customers" component={Customers} />
      </div>
    </Router>
  );
}

render(<App />, document.getElementById('app-root'));
