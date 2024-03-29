import React, { Component } from 'react';
import { Button, Table, Modal, FormGroup, FormControl } from 'react-bootstrap';
import DocumentTitle from 'react-document-title';

import CreateModal from './Modal/CreateModal';
import DeleteModal from './Modal/DeleteModal';
import EditModal from './Modal/EditModal';

export default class Customers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      customer: {},
      selected: undefined,
      showModal: false,
      showEditModal: false,
      showDeleteModal: false,
    };

    this.closeModal = this.closeModal.bind(this);
    this.updateCustomers = this.updateCustomers.bind(this);
  }

  componentDidMount() {
    fetch('/api/customers')
      .then(response => response.json())
      .then(customers => this.setState({ customers }));
  }

  openModal(selected, e) {
    const modalType = e.target.innerHTML;
    if (modalType === 'Create') {
      this.setState({ showModal: true });
    } else if (modalType === 'edit') {
      this.setState({ showEditModal: true, customer: selected });
    } else if (modalType === 'delete') {
      this.setState({ showDeleteModal: true, selected });
    }
  }

  closeModal() {
    this.setState({ showModal: false, showDeleteModal: false, showEditModal: false });
  }

  updateCustomers(customers) {
    this.setState({ customers });
    this.closeModal();
  }

  render() {
    const customers = this.state.customers.map(customer =>
      <tr key={customer.id}>
        <td>{customer.id}</td>
        <td>{customer.name}</td>
        <td>{customer.address}</td>
        <td>{customer.phone}</td>
        <td><a onClick={this.openModal.bind(this, customer)}>edit</a>
        &nbsp;|&nbsp;
        <a onClick={this.openModal.bind(this, customer.id)}>delete</a></td>
      </tr>
    );

    return (
      <DocumentTitle title='Customers'>
        <div className="container">
          <h1 style={{ float: 'left' }}>Customer list</h1>
          <Button onClick={this.openModal.bind(this, this)} style={{ marginTop: '23px', marginLeft: '25px' }}>Create</Button>

          <CreateModal showModal={this.state.showModal} closeModal={this.closeModal} customers={this.state.customers} updateCustomers={this.updateCustomers} page='Customers' />
          <DeleteModal showModal={this.state.showDeleteModal} closeModal={this.closeModal} customers={this.state.customers} selected={this.state.selected} page='customers' />
          <EditModal showModal={this.state.showEditModal} closeModal={this.closeModal} customers={this.state.customers} customer={this.state.customer} page='Customers' />

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
              {customers}
            </tbody>
          </Table>
        </div>
      </DocumentTitle>
    );
  }
}