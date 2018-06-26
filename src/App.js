import React, { Component } from 'react';
import axios from 'axios';
import StartButton from './StartButton/StartButton';
import ProductList from './ProductList/ProductList';
import CartModal from './CartModal';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      showProductList: false,
      isModalOpen: false,
      productData: [],
      productInCart: [],
      productDetails: []
    }
    this.setProductData = this.setProductData.bind(this);
    this.toggleContent = this.toggleContent.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  setProductData(APIdata) {
    this.setState({ productData: APIdata })
  }

  toggleContent() {
    this.setState({ showProductList: !this.state.showProductList })
  }

  async addToCart(product) {
    try {
      this.setState({ productInCart: product })
      await axios.post('/getProductDetails', { productID: product.productID })
        .then((response) => {
          this.setState({ productDetails: response.data.results.data })
        })
      this.toggleModal()
    } catch (error) {
      console.log(error)
    }
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen })
  }

  render() {
    var content;
    if (this.state.showProductList) {
      content = <div>
        <ProductList productData={this.state.productData} addToCart={this.addToCart} />
      </div>
    } else {
      content = <StartButton setProductData={this.setProductData} toggleContent={this.toggleContent} />
    }

    return (
      <div>
        <img className="Background" src="https://images.unsplash.com/photo-1437209484568-e63b90a34f8b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b250a2e715b60e123c6b5ba13b299e7e&auto=format&fit=crop&w=1366&q=80" alt="mountains" />
        <div className="App">
          {content}
          <CartModal isModalOpen={this.state.isModalOpen} toggleModal={this.toggleModal} productInCart={this.state.productInCart} productDetails={this.state.productDetails} />
        </div>
      </div>
    );
  }
}

export default App;
