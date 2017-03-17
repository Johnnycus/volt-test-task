import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, FormGroup, FormControl } from 'react-bootstrap';

export default class EditModal extends Component {
  editCustomer() {
    fetch(`/api/customers/${this.props.customer.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: ReactDOM.findDOMNode(this.refs.name).value,
        address: ReactDOM.findDOMNode(this.refs.address).value,
        phone: ReactDOM.findDOMNode(this.refs.phone).value
      })
    })

    // Idk why, but fetch customers to show new state (customers list with edited customer) doesn't work so just page reload here
    // fetch('/api/customers')
    //   .then(response => response.json())
    //   .then(customers => this.props.updateCustomers(customers));
    window.location.reload();
  }

  editProduct() {
    fetch(`/api/products/${this.props.product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: ReactDOM.findDOMNode(this.refs.name).value,
        price: ReactDOM.findDOMNode(this.refs.price).value
      })
    })

    // Idk why, but fetch products to show new state (products list with edited product) doesn't work so just page reload here
    // fetch('/api/customers')
    //   .then(response => response.json())
    //   .then(products => this.props.updateProducts(products));
    window.location.reload();
  }

  render() {
    const page = this.props.page;
    const customer = this.props.customer;
    const product = this.props.product;

    let pageType;
    if (page === 'Customers') {
      pageType =
        <form>
          <FormGroup>
            <label>Name</label>
            <FormControl type="text" defaultValue={customer.name} ref="name" />
          </FormGroup>
          <FormGroup>
            <label>Address</label>
            <FormControl type="text" defaultValue={customer.address} ref="address" />
          </FormGroup>
          <FormGroup>
            <label>Phone</label>
            <FormControl type="text" defaultValue={customer.phone} ref="phone" />
          </FormGroup>
        </form>;
    } else if (page === 'Products') {
      pageType =
        <form>
          <FormGroup>
            <label>Name</label>
            <FormControl type="text" defaultValue={product.name} ref="name" />
          </FormGroup>
          <FormGroup>
            <label>Price</label>
            <FormControl type="number" step="0.01" min="0" defaultValue={product.price} ref="price" />
          </FormGroup>
        </form>;
    }

    return (
      <Modal show={this.props.showModal} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit {page === 'Customers' ? 'customer' : 'product'} #{page === 'Customers' ? customer.id : product.id}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {pageType}
        </Modal.Body>

        <Modal.Footer>
          <Button bsStyle="success" onClick={page === 'Customers' ? this.editCustomer.bind(this) : this.editProduct.bind(this)}>Save</Button>
          <Button onClick={this.props.closeModal}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}