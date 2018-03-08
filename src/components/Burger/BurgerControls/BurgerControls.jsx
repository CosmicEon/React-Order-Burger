import React from 'react';
import './BurgerControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const burgerControls = (props) => {
    return (
        <div className="BurgerControls">
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>

            {controls.map(ctrl => {
                return <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    disabled={props.disabled[ctrl.type]}
                    addIngredient={() => props.addIngredient(ctrl.type)}
                    removeIngredient={() => props.removeIngredient(ctrl.type)}
                />
            })}

            <button
                className="OrderButton"
                disabled={!props.toPurchase}
                onClick={props.completeOrder}
            >Order Now</button>
        </div>
    );
};

export default burgerControls;
