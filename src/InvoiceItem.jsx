import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

export default class InvoiceItem extends Component {
  createInvoiceItem() {
    const arr = this.props.selectedProducts;
    fetch('/api/invoices/1/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product_id: findDOMNode(this.refs.product).value,
        quantity: findDOMNode(this.refs.quantity).value
      })
    })
  }

  render() {
    const { selectedProducts, handleInputChange } = this.props;
    const products = selectedProducts.map(product =>
      <tr key={product.id}>
        <td>{product.name}</td>
        <td>${product.price}</td>
        <td><input name={product.name} onChange={() => handleInputChange(this)} defaultValue="1" type="number" ref="quantity" min="0" step="1" />
        <input type="hidden" key={product.id} value={product.id} ref="product" /></td>
      </tr>
    );

    return (
      <tbody>
        {products}
      </tbody>
    );
  }
}