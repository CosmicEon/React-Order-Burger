import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  // constructor() {
  //     super(props);
  //     this.state = {};
  // }
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    toPurchase: false,
    purchasing: false
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(ingrKey => {
        return ingredients[ingrKey]
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({ toPurchase: sum > 0 });
  }

  addIngredientHandler = (type) => {
    const ingredientsCopy = {
      ...this.state.ingredients
    };

    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    ingredientsCopy[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({
      ingredients: ingredientsCopy,
      totalPrice: newPrice
    });

    this.updatePurchaseState(ingredientsCopy);
  }

  removeIngredientHandler = (type) => {
    const ingredientsCopy = {
      ...this.state.ingredients
    };

    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    ingredientsCopy[type] = updatedCount;

    const priceReduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceReduction;

    this.setState({
      ingredients: ingredientsCopy,
      totalPrice: newPrice
    });

    this.updatePurchaseState(ingredientsCopy);
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    //  To implement
    console.log('To implement');
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;

    }

    //  {salad: true, meat: false, ... }
    return (
      <Auxiliary>
        <Modal show={this.state.purchasing} closeBackdrop={this.purchaseCancelHandler}>
          <OrderSummary
            totalPrice={this.state.totalPrice}
            ingredients={this.state.ingredients}
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
          />
        </Modal>

        <Burger ingredients={this.state.ingredients} />

        <BurgerControls
          price={this.state.totalPrice}
          toPurchase={this.state.toPurchase}
          disabled={disabledInfo}
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          completeOrder={this.purchaseHandler}
        />
      </Auxiliary >
    );
  }
}

export default BurgerBuilder;
