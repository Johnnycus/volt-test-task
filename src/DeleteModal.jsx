import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class DeleteModal extends Component {
  deleteCustomer() {
    fetch(`/api/customers/${this.props.selected}`, {
      method: 'DELETE'
    })

    fetch('/api/customers')
      .then(response => response.json())
      .then(customers => this.props.updateCustomers(customers));
  }

  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete customer #{this.props.selected}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Are you sure?
        </Modal.Body>

        <Modal.Footer>
          <Button bsStyle="danger" onClick={this.deleteCustomer.bind(this)}>Delete</Button>
          <Button onClick={this.props.closeModal}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}