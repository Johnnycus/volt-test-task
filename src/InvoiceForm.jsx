import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Button, Table } from 'react-bootstrap';
import Select from 'react-select';
import { findDOMNode } from 'react-dom';

import InvoiceItem from './InvoiceItem';

export default class InvoiceForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCustomer: undefined,
      selectedProduct: undefined,
      selectedInvoice: undefined,
      selectedProducts: [],
      discount: 0,
      total: 0
    }

    this.clearSelect = this.clearSelect.bind(this);
    this.handleCustomers = this.handleCustomers.bind(this);
    this.handleProducts = this.handleProducts.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.createInvoice = this.createInvoice.bind(this);
    this.editInvoice = this.editInvoice.bind(this);
    this.onApply = this.onApply.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      fetch(`/api/invoices/${id}`)
        .then(response => response.json())
        .then(invoice => this.setState({ selectedInvoice: invoice, selectedCustomer: invoice.customer_id, discount: invoice.discount, total: invoice.total }));
    }
  }

  clearSelect(type) {
    this.setState(type === 'Customer' ? { selectedCustomer: undefined } : { selectedProduct: undefined });
  }

  handleCustomers(e) {
    this.clearSelect('Customer');
    if (e != null) {
      this.setState({ selectedCustomer: e });
    }
  }

  handleProducts(e) {
    this.clearSelect('Product');
    if (e != null) {
      this.setState({ selectedProduct: e });
    }
  }

  addProduct() {
    const { selectedProduct, selectedProducts } = this.state;
    const newSelectedProducts = selectedProducts.slice();
    const duplicate = new Set();
    newSelectedProducts.push(selectedProduct);
    const hasDuplicates = newSelectedProducts.some(function(currentObj) {
      return duplicate.size === duplicate.add(currentObj.name).size;
    });
    if (!hasDuplicates) {
      this.setState({ selectedProducts: newSelectedProducts });
    }
  }

  handleInputChange(e) {
    const name = e.refs.quantity.name;
    const quantity = +e.refs.quantity.value;
    const newSelectedProducts = this.state.selectedProducts;

    newSelectedProducts.forEach(function(obj) {
      if (obj.name == name) {
        obj.quantity = quantity;
      }
    });
    this.setState({ selectedProducts: newSelectedProducts });
  }

  onApply() {
    let total = 0;
    const discount = findDOMNode(this.refs.discount).value;
    const products = this.state.selectedProducts;
    products.forEach(function(obj) {
      total += obj.price * obj.quantity;
    });
    const totalDiscount = (discount/100) * total;
    total = total-totalDiscount;
    this.setState({ total: total.toFixed(2), discount });
  }

  createInvoice() {
    this.refs.invoice.createInvoiceItem();
    fetch('/api/invoices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customer_id: this.state.selectedCustomer.value,
        discount: +this.state.discount,
        total: +this.state.total
      })
    })
    .then(window.location = '/invoices');
  }

  editInvoice() {
    fetch(`/api/invoices/${this.props.match.params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customer_id: this.state.selectedCustomer.value,
        discount: +this.state.discount,
        total: +this.state.total
      })
    })
    .then(window.location = '/invoices');
  }

  render() {
    const { id } = this.props.match.params;
    const title = id ? `Edit invoice #${id}` : 'Create Invoice';
    const getData = (type) => {
      return fetch(`/api/${type}`)
        .then((response) => {
          return response.json();
        }).then((data) => {
          data.forEach(obj => {
            obj.label = obj.name;
            obj.value = obj.name;
            if (type === 'products') {
              obj.quantity = 1;
            }
          });
          return { options: data };
        });
    }
    const customerValue = this.state.selectedCustomer ? this.state.selectedCustomer.value : '';
    const productValue = this.state.selectedProduct ? this.state.selectedProduct.value : '';

    return (
      <DocumentTitle title={title}>
        <div className="container" >
          <h1>{title}</h1>

          <form>
            <label style={{ display: 'block' }}>Discount (%)</label>
            <input type="number" ref="discount" min="1" step="1" value={this.state.discount} onChange={(e) => this.setState({ discount: e.target.value })} />

            <label style={{ display: 'block' }}>Customer</label>
            <Select.Async
              name="customer"
              value={id ? this.state.selectedCustomer : customerValue}
              loadOptions={() => getData('customers')}
              onChange={this.handleCustomers}
              style={{ width: '300px' }}
            />

            <label style={{ display: 'block' }}>Add product</label>
            <Select.Async
              name="product"
              value={productValue}
              loadOptions={() => getData('products')}
              onChange={this.handleProducts}
              style={{ width: '220px', float: 'left' }}
              className="Select-products"
            />
            <Button onClick={this.addProduct} style={{ marginLeft: '30px', float: 'left' }} disabled={!this.state.selectedProduct}>Add</Button>
          </form>

          <Table responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
              </tr>
            </thead>
            <InvoiceItem selectedProducts={this.state.selectedProducts} handleInputChange={this.handleInputChange} ref="invoice" />
          </Table>

          <Button onClick={id ? this.editInvoice : this.createInvoice} style={{ float: 'right', width: '125px', fontSize: '16px', marginLeft: '10px'}} bsStyle="success" disabled={!this.state.selectedCustomer}>Save Invoice</Button>
          <Button onClick={this.onApply} style={{ float: 'right', width: '125px', fontSize: '16px' }} bsStyle="primary" disabled={!this.state.selectedProducts[0]}>Apply</Button>
          <h1>Total: ${this.state.total}</h1>
        </div>
      </DocumentTitle>
    );
  }
}