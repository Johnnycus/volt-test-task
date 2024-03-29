import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router-dom';

import DeleteModal from './Modal/DeleteModal';

export default class Invoices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invoices: [],
      selected: undefined,
      showDeleteModal: false
    };

    this.closeModal = this.closeModal.bind(this);
    this.updateInvoices = this.updateInvoices.bind(this);
  }

  componentDidMount() {
    fetch('/api/invoices')
      .then(response => response.json())
      .then(invoices => this.setState({ invoices }));
  }

  openModal(selected, e) {
    this.setState({ showDeleteModal: true, selected });
  }

  closeModal() {
    this.setState({ showDeleteModal: false });
  }

  updateInvoices(invoices) {
    this.setState({ invoices });
    this.closeModal();
  }

  render() {
    const invoices = this.state.invoices.map(invoice =>
      <tr key={invoice.id}>
        <td>{invoice.id}</td>
        <td>{invoice.customer_id}</td>
        <td>{invoice.discount}</td>
        <td>{invoice.total}</td>
        <td><Link to={`/invoices/${invoice.id}/edit`}>edit</Link>
        &nbsp;|&nbsp;
        <a onClick={this.openModal.bind(this, invoice.id)}>delete</a></td>
      </tr>
    );

    return (
      <DocumentTitle title='Invoices'>
        <div className="container" >
          <h1 style={{ float: 'left' }}>Invoice list</h1>
          <Link to="/invoices/create" style={{textDecoration: 'none', color: '#000'}}>
            <Button style={{ marginTop: '23px', marginLeft: '25px' }}>Create</Button>
          </Link>

          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>customer</th>
                <th>discount</th>
                <th>total</th>
              </tr>
            </thead>
            <tbody>
              {invoices}
            </tbody>
          </Table>

          <DeleteModal closeModal={this.closeModal} showModal={this.state.showDeleteModal} selected={this.state.selected} page='invoices' />
        </div>
      </DocumentTitle>
    );
  }
}