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

  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add customer</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <FormGroup>
              <label>Name</label>
              <FormControl type="text" ref="name" />
            </FormGroup>
            <FormGroup>
              <label>Address</label>
              <FormControl type="text" ref="address" />
            </FormGroup>
            <FormGroup>
              <label>Phone</label>
              <FormControl type="text" ref="phone" />
            </FormGroup>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button bsStyle="success" onClick={this.createCustomer.bind(this)}>Save</Button>
          <Button onClick={this.props.closeModal}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}