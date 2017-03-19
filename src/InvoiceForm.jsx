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
      selectedProducts: [],
      total: 0
    }

    this.clearSelect = this.clearSelect.bind(this);
    this.handleCustomers = this.handleCustomers.bind(this);
    this.handleProducts = this.handleProducts.bind(this);
    this.addProduct = this.addProduct.bind(this);
  }

  clearSelect(type) {
    if (type === 'Customer') {
      this.setState({ selectedCustomer: undefined });
    } else {
      this.setState({ selectedProduct: undefined });
    }
  }

  handleCustomers(e) {
    this.clearSelect('Customer');
    if (e != null) {
      this.setState({ selectedCustomer: e.value });
    }
  }

  handleProducts(e) {
    this.clearSelect('Product');
    if (e != null) {
      this.setState({ selectedProduct: e });
    }
  }

  addProduct() {
    const { selectedProduct, selectedProducts, total } = this.state;
    if (selectedProduct) {
      const newSelectedProducts = selectedProducts.slice();
      const duplicate = new Set();
      newSelectedProducts.push(selectedProduct);
      const hasDuplicates = newSelectedProducts.some(function(currentObj) {
        return duplicate.size === duplicate.add(currentObj.name).size;
      });
      if (!hasDuplicates) {
        this.setState({ selectedProducts: newSelectedProducts });
      } else {
        // let duplicate = [];
        // selectedProducts.filter((arr, i) => {
        //   if (arr == selectedProduct){
        //     duplicate.push(i);
        //   }
        // });
        // this.setState({ selectedProduct, selectedProducts: newSelectedProducts, tota: total + (selectedProduct.price * selectedProduct.quantity) });

        let newSelectedProduct = selectedProduct;
        newSelectedProduct.quantity = selectedProduct.quantity ? selectedProduct.quantity + 1 : 1 + 1;
        let uniq = () => [...new Set(newSelectedProducts)];
        let uniqSelectedProducts = uniq();

        // console.log(newSelectedProduct.quantity);

        this.setState({ selectedProduct: newSelectedProduct, selectedProducts: uniqSelectedProducts });
      }
    }
  }

  handleChange(e) {
    // const { total, selectedProduct, selectedProducts } = this.state;
    // let quantityValues = this.state.quantityValues;
    // let name = e.target.name;
    // let value = e.target.value;
    // let obj = {};

    // obj[name] = value;

    // quantityValues.push(obj);
    // if (quantityValues.length > 1) {
    //   quantityValues.shift();
    // }

    // var quantities = {};
    // var newValues = quantityValues.reverse().filter(function(entry) {
    //   if (quantities[entry.name]) {
    //       return false;
    //   }
    //   quantities[entry.name] = true;
    //   return true;
    // });
    // let totalPrice = 0;
    // let quantity = findDOMNode(this.refs[`quantity-${selectedProduct.name}`]).value;
    // totalPrice += selectedProduct.price*quantity;
    // console.log(totalPrice);

    // this.setState({ quantityValues, total: totalPrice });
  }

   handleInputChange(e, product) {
    // const target = e.target;
    // const value = target.value;
    // const name = target.name;
    // this.setState({
    //   [name]: value
    // });
    const name = e.refs.quantity.name;
    const quantity = +e.refs.quantity.value;
    const price = product.price;
    const newSelectedProducts = this.state.selectedProducts;
    newSelectedProducts.forEach(function(obj) {
      if (obj.name == name) {
        obj.quantity = quantity;
      }
    });
    this.setState({ selectedProducts: newSelectedProducts });
    // console.log(this.state.selectedProducts);

    // const newState = this.state;
    // newState.forEach(function(obj) {
    //   if (obj.name == name) {
    //     obj.quantity = quantity;
    //   }
    // });
    // this.setState({[name]: quantity})
  }

  onApply() {
    let total = 0;
    const discount = findDOMNode(this.refs.discount).value;
    const products = this.state.selectedProducts;
    products.forEach(function(obj) {
      total += obj.price * obj.quantity;
    });
    const totalDiscount = (discount/100) * total;
    this.setState({ total: total-totalDiscount });
  }

  render() {
    const getData = (type) => {
      return fetch(`/api/${type}`)
        .then((response) => {
          return response.json();
        }).then((data) => {
          data.forEach(function(obj) {
            obj.label = obj.name;
            obj.value = obj.name;
            if (type === 'products') {
              obj.quantity = 1;
            }
          });
          return { options: data };
        });
    }

    return (
      <DocumentTitle title='Create Invoice'>
        <div className="container" >
          <h1>Create Invoice</h1>

          <form>
            <label style={{ display: 'block' }}>Discount (%)</label>
            <input type="number" ref="discount" min="1" step="1" defaultValue="0" />

            <label style={{ display: 'block' }}>Customer</label>
            <Select.Async
              name="customer"
              value={this.state.selectedCustomer}
              loadOptions={() => getData('customers')}
              onChange={this.handleCustomers}
              style={{ width: '300px' }}
            />

            <label style={{ display: 'block' }}>Add product</label>
            <Select.Async
              name="product"
              value={this.state.selectedProduct ? this.state.selectedProduct.value : ''}
              loadOptions={() => getData('products')}
              onChange={this.handleProducts}
              style={{ width: '220px', float: 'left' }}
              className="Select-products"
            />
            <Button onClick={this.addProduct} style={{ marginLeft: '30px', float: 'left' }}>Add</Button>
            <Button onClick={this.onApply.bind(this)} style={{ marginLeft: '10px', float: 'left' }} bsStyle="primary">Apply</Button>
          </form>

          <Table responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
              </tr>
            </thead>

              <InvoiceItem selectedProducts={this.state.selectedProducts} handleInputChange={this.handleInputChange.bind(this)} />

          </Table>

          <h1>Total: ${this.state.total.toFixed(2)}</h1>
        </div>
      </DocumentTitle>
    );
  }
}