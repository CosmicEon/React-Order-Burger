import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(ingrKey => {
            return (
                < li key={ingrKey} >
                    <span style={{ textTransform: 'capitalize' }}>{ingrKey}</span>: {props.ingredients[ingrKey]}
                </li >
            );
        });

    return (
        <Auxiliary>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button buttonType="Danger" clickEvent={props.purchaseCancel}>Cancel</Button>
            <Button buttonType="Success" clickEvent={props.purchaseContinue}>Continue</Button>
        </Auxiliary>
    );
};

export default orderSummary;
