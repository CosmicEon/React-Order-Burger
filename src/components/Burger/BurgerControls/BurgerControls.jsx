import React from 'react';
import './BurgerControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' }
];

const burgerControls = (props) => {
    return (
        <div className="BurgerControls">
            {controls.map(ctrl => {
                return <BuildControl key={ctrl.label} label={ctrl.label} />
            })}
        </div>
    );
};

export default burgerControls;
