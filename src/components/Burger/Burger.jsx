import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import './Burger.css';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(ingrKey => {
            return [...Array(props.ingredients[ingrKey])] // create array for the given property
                .map((_, i) => {
                    return < BurgerIngredient key={ingrKey + i} type={ingrKey} />
                });
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    console.log(transformedIngredients);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>;
    }

    return (
        <div className="Burger">
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;