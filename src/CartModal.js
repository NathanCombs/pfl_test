import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import CartDisplay from './CartDisplay/CartDisplay'

export default class CartModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderNumber: 0,
            orderSuccess: false,
            templateData: []
        }
        this.toggle = this.toggle.bind(this);
        this.placeOrder = this.placeOrder.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.updateTemplateData = this.updateTemplateData.bind(this);
    }

    toggle() {
        this.props.toggleModal()
    }

    updateTemplateData(newData) {
        //used in CartDisplay.js if a product contains template fields
        this.setState({ templateData: newData })
    }

    placeOrder() {
        axios.post('http://localhost:5000/placeOrder', { productID: this.props.productInCart.productID, templateData: this.state.templateData })
            .then((response) => {
                this.setState({
                    orderNumber: response.data,
                    orderSuccess: true,
                })
            })
    }

    closeModal() {
        //closes the shopping cart modal and resets cart related data so that the user can continue shopping.
        this.toggle()
        this.setState({
            orderSuccess: false,
            templateData: []
        })
    }

    render() {
        var modalBody;
        var buttonGroup;
        if (this.state.orderSuccess) {
            modalBody = <p> Success! Your order number is: {this.state.orderNumber} </p>
            buttonGroup =   
                        <ModalFooter>
                            <Button color="secondary" onClick={this.closeModal}> Back to Products </Button>
                        </ModalFooter>
        } else {
            modalBody = 
                        <CartDisplay 
                            productInCart={this.props.productInCart} 
                            productDetails={this.props.productDetails} 
                            templateData={this.state.templateData}
                            updateTemplateData={this.updateTemplateData}
                        />
            buttonGroup = 
                        <ModalFooter>
                            <Button color="primary" onClick={this.placeOrder}>Place Order</Button>
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
        }
        return (
            <div>
                <Modal isOpen={this.props.isModalOpen} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Shopping cart</ModalHeader>
                    <ModalBody>
                        {modalBody}
                    </ModalBody>
                    { buttonGroup }
                </Modal>
            </div>
        );
    }
}
