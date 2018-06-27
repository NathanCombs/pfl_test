import React, { Component } from 'react';
import './ProductList.css'
import AddToCartButton from '../AddToCartButton';

export default class ProductList extends Component {
    constructor() {
        super();
        this.state = {
            productsInCart: []
        }
    }

//renders a product card containing product image, name, and add to cart button for each object in the 
//productData array fetched from the API

    render() {
        return this.props.productData.map((value, index) => {
            return (
                <div key={index} className="productCard">
                    <img className="productImage" src={`${value.imageURL}`} alt="product" />
                    <div className="productInfo">
                        <p> {value.name} </p>
                        <AddToCartButton product={value} addToCart={this.props.addToCart} />
                    </div>

                </div>
            )
        })
    }
}