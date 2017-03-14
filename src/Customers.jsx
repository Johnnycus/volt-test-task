import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';

export default class Customers extends Component {
  render() {
    return (
      <div className="container" >
        <h1 style={{ fontWeight: 600, float: 'left' }}>Customer list</h1>
        <Button style={{ marginTop: '23px', marginLeft: '25px' }}>Create</Button>

        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Name Name</td>
              <td>Address 123</td>
              <td>505 555 555</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Name Name</td>
              <td>Address 123</td>
              <td>505 555 555</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}