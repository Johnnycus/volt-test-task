import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

import ListItemLink from './ListItemLink';

const Header = () => {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">Invoice App</Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <ListItemLink to="/invoices">Invoices</ListItemLink>
        <ListItemLink to="/products">Products</ListItemLink>
        <ListItemLink to="/customers">Customers</ListItemLink>
      </Nav>
    </Navbar>
  );
}

export default Header;