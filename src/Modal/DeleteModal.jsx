import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class DeleteModal extends Component {
  deleteCustomer() {
    fetch(`/api/customers/${this.props.selected}`, {
      method: 'DELETE'
    })

    // Idk why, but fetch customers to show new state (customers list without deleted customer) doesn't work so just page reload here
    // fetch('/api/customers')
    //   .then(response => response.json())
    //   .then(customers => this.props.updateCustomers(customers));
    window.location.reload();
  }

  deleteProduct() {
    fetch(`/api/products/${this.props.selected}`, {
      method: 'DELETE'
    })

    // Idk why, but fetch products to show new state (products list without deleted product) doesn't work so just page reload here
    // fetch('/api/products')
    //   .then(response => response.json())
    //   .then(products => this.props.updateProducts(products));
    window.location.reload();
  }

  render() {
    const page = this.props.page;

    return (
      <Modal show={this.props.showModal} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {page === 'Customers' ? 'customer' : 'product'} #{this.props.selected}</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ textAlign: 'center', fontSize: '24px' }}>
          Are you sure?
        </Modal.Body>

        <Modal.Footer>
          <Button bsStyle="danger" onClick={page === 'Customers' ? this.deleteCustomer.bind(this) : this.deleteProduct.bind(this)}>Delete</Button>
          <Button onClick={this.props.closeModal}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}