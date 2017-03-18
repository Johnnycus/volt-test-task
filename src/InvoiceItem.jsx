import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

export default class InvoiceItem extends Component {
  handleChange(e) {
    let quantityValues = this.props.quantityValues;
    let name = e.target.name;
    let value = e.target.value;
    let obj = {};
    obj[name] = value;

    quantityValues.push(obj);

    console.log(quantityValues);
    // this.props.updateQuantity(value);
  }

  render() {
    const products = this.props.selectedProducts.map(product =>
      <tr key={product.id}>
        <td>{product.name}</td>
        <td>${product.price}</td>
        <td><input name={product.name} value={this.props.quantityValues["name"]} type="number" ref="quantity" min="1" step="1" /></td>
        <td><a onClick={this.handleChange.bind(this)}>apply</a></td>
      </tr>
    );

    return (
      <tbody>
        {products}
      </tbody>
    );
  }
}