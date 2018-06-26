import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import './StartButton.css';

export default class StartButton extends Component {
    constructor() {
        super();
        this.getProducts = this.getProducts.bind(this);
    }

    getProducts() {
        axios.get('/getProducts', { method: 'GET' })
        .then((response) => {
            this.props.setProductData(response.data)
            this.props.toggleContent()
        })
    }

    render() {
        return (
            <div className="Welcome">
                <p className="WelcomeHeader"> welcome </p>
                <Button color="success" onClick={this.getProducts}> View Available Products </Button>
            </div>
        )
    }
}