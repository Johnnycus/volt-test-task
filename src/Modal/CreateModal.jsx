import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, FormGroup, FormControl } from 'react-bootstrap';

export default class CreateModal extends Component {
  createCustomer() {
    fetch('/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: ReactDOM.findDOMNode(this.refs.name).value,
        address: ReactDOM.findDOMNode(this.refs.address).value,
        phone: ReactDOM.findDOMNode(this.refs.phone).value
      })
    })

    fetch('/api/customers')
      .then(response => response.json())
      .then(customers => this.props.updateCustomers(customers));
  }

  createProduct() {
    fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: ReactDOM.findDOMNode(this.refs.name).value,
        price: ReactDOM.findDOMNode(this.refs.price).value
      })
    })

    fetch('/api/products')
      .then(response => response.json())
      .then(products => this.props.updateProducts(products));
  }

  render() {
    const page = this.props.page;

    let pageType;
    if (page === 'Customers') {
      pageType =
        <div>
          <FormGroup>
            <label>Address</label>
            <FormControl type="text" ref="address" />
          </FormGroup>
          <FormGroup>
            <label>Phone</label>
            <FormControl type="text" ref="phone" />
          </FormGroup>
        </div>;
    } else if (page === 'Products') {
      pageType =
        <FormGroup>
          <label>Price</label>
          <FormControl type="number" step="0.01" min="0" ref="price" />
        </FormGroup>;
    }

    return (
      <Modal show={this.props.showModal} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create {page === 'Customers' ? 'customer' : 'product'}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <FormGroup>
              <label>Name</label>
              <FormControl type="text" ref="name" />
            </FormGroup>
            {pageType}
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button bsStyle="success" onClick={page === 'Customers' ? this.createCustomer.bind(this) : this.createProduct.bind(this)}>Save</Button>
          <Button onClick={this.props.closeModal}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}