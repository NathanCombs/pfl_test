import React, { Component } from 'react';
import './CartDisplay.css'

export default class CartDisplay extends Component {

    handleChange(index, event) {
        let fieldName = this.props.productDetails.templateFields.fieldlist.field[index].fieldname;
        let templateData = [...this.props.templateData];
        templateData[index] = { templateDataName: fieldName, templateDataValue: event.target.value };
        this.props.updateTemplateData(templateData)
    }

    render() {
        var templateForm;
        if (this.props.productDetails.hasTemplate) {
            return this.props.productDetails.templateFields.fieldlist.field.map((value, index) => {
                if (value.type === 'MULTILINE') {
                    return <input key={index} className={'TemplateField'} type="text" placeholder={`${value.fieldname}`} onChange={this.handleChange.bind(this, index)} />
                } else if (value.type === 'SINGLELINE') {
                    return <input key={index} className={'TemplateField'} type="text" placeholder={`${value.fieldname}`} onChange={this.handleChange.bind(this, index)} />
                } else if (value.type === 'SEPARATOR') {
                    //something is going on here that when this field's value is changed it causes a 400 error from the API.
                    //the API is getting the data in the same format as other fields in the form.
                    return <select key={index} className={'TemplateField'} onChange={this.handleChange.bind(this, index)}>
                        <option value="en-us">English - US</option>
                        <option value="de">German</option>
                        <option value="fr">French</option>
                        <option value="es">Spanish</option>
                        <option value="it">Italian</option>
                    </select>
                }
            })
        }
        return (
            <div>
                <p> {this.props.productInCart.name} </p>
                <form> {templateForm} </form>
            </div>
        )
    }
}