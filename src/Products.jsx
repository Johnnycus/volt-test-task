import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';

export default class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };
  }

  componentDidMount() {
    fetch('/api/products')
      .then(response => response.json())
      .then(products => this.setState({ products }));
  }

  render() {
    const products = this.state.products.map(product =>
      <tr key={product.id}>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.price}</td>
      </tr>
    );

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
            {products}
          </tbody>
        </Table>
      </div>
    );
  }
}