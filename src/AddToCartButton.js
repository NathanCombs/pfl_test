import React, { Component } from 'react';
import { Button } from 'reactstrap';

export default class AddToCartButton extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.addToCart(this.props.product);
    }

    render() {
        return (
            <Button color="success" onClick={this.handleClick}> Add to Cart </Button>
        )
    }
}