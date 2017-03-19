import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Button, Modal, FormGroup, FormControl } from 'react-bootstrap';

export default class EditModal extends Component {
  editCustomer() {
    fetch(`/api/customers/${this.props.customer.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: findDOMNode(this.refs.name).value,
        address: findDOMNode(this.refs.address).value,
        phone: findDOMNode(this.refs.phone).value
      })
    })

    // Can't make it work in a way that after edit - new state shows up (with edited customer), so just page reload here
    window.location.reload();
  }

  editProduct() {
    fetch(`/api/products/${this.props.product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: findDOMNode(this.refs.name).value,
        price: findDOMNode(this.refs.price).value
      })
    })

    // Can't make it work in a way that after edit - new state shows up (with edited product), so just page reload here
    window.location.reload();
  }

  render() {
    const { page, customer, product, showModal, closeModal } = this.props;

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
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit {page === 'Customers' ? 'customer' : 'product'} #{page === 'Customers' ? customer.id : product.id}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {pageType}
        </Modal.Body>

        <Modal.Footer>
          <Button bsStyle="success" onClick={page === 'Customers' ? this.editCustomer.bind(this) : this.editProduct.bind(this)}>Save</Button>
          <Button onClick={closeModal}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}