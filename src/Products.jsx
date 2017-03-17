import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import DocumentTitle from 'react-document-title';

import CreateModal from './Modal/CreateModal';
import DeleteModal from './Modal/DeleteModal';
import EditModal from './Modal/EditModal';

export default class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      selected: null,
      product: {},
      showModal: false,
      showDeleteModal: false,
      showEditModal: false
    };

    this.closeModal = this.closeModal.bind(this);
    this.updateProducts = this.updateProducts.bind(this);
  }

  componentDidMount() {
    fetch('/api/products')
      .then(response => response.json())
      .then(products => this.setState({ products }));
  }

  openModal(selected, e) {
    const modalType = e.target.innerHTML;
    if (modalType === 'Create') {
       this.setState({ showModal: true });
    } else if (modalType === 'delete') {
      this.setState({ showDeleteModal: true, selected });
    } else if (modalType === 'edit') {
      this.setState({ showEditModal: true, product: selected });
    }
  }

  closeModal() {
    this.setState({ showModal: false, showDeleteModal: false, showEditModal: false });
  }

  updateProducts(products) {
    this.setState({ products });
    this.closeModal();
  }

  render() {
    const products = this.state.products.map(product =>
      <tr key={product.id}>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td><a onClick={this.openModal.bind(this, product)}>edit</a>
        &nbsp;|&nbsp;
        <a onClick={this.openModal.bind(this, product.id)}>delete</a></td>
      </tr>
    );

    return (
      <DocumentTitle title='Products'>
        <div className="container" >
          <h1 style={{ fontWeight: 600, float: 'left' }}>Product list</h1>
          <Button onClick={this.openModal.bind(this, this)} style={{ marginTop: '23px', marginLeft: '25px' }}>Create</Button>

          <CreateModal showModal={this.state.showModal} closeModal={this.closeModal} products={this.state.products} updateProducts={this.updateProducts} page='Products' />
          <DeleteModal showModal={this.state.showDeleteModal} closeModal={this.closeModal} products={this.state.products} updateProducts={this.updateProducts} selected={this.state.selected} page='Products' />
          <EditModal showModal={this.state.showEditModal} closeModal={this.closeModal} products={this.state.products} updateProducts={this.updateProducts} product={this.state.product} page='Products' />

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
      </DocumentTitle>
    );
  }
}