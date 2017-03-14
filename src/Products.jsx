import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';

export default class Products extends Component {
  render() {
    return (
      <div className="container" >
        <h1 style={{ fontWeight: 600, float: 'left' }}>Product list</h1>
        <Button style={{ marginTop: '23px', marginLeft: '25px' }}>Create</Button>

        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Name Name</td>
              <td>505</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Name Name</td>
              <td>555</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}