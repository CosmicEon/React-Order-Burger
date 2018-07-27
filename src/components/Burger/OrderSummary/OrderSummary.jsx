import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  // This could be a functional component, doesn't have to be a class
  componentWillUpdate() {
    console.log('[OrderSummary] WillUpdate');
  }

  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients)
      .map((ingrKey) => {
        return (
          <li key={ingrKey}>
            <span style={{ textTransform: 'capitalize' }}>{ingrKey}</span>: {this.props.ingredients[ingrKey]}
          </li>
        );
      });

    return (
      <Auxiliary>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientsSummary}
        </ul>
        <p><strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button buttonType="Danger" clickEvent={this.props.purchaseCancel}>Cancel</Button>
        <Button buttonType="Success" clickEvent={this.props.purchaseContinue}>Continue</Button>
      </Auxiliary>
    );
  }
}

export default OrderSummary;
