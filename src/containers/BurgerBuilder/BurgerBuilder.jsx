import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../services/axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  // constructor() {
  //     super(props);
  //     this.state = {};
  // }
  state = {
    ingredients: null,
    totalPrice: 4,
    toPurchase: false,
    purchasing: false,
    loading: false,
    error: false,
  }

  componentDidMount() {
    axios.get('/ingredients.json')
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log(error);
      });
  }

  // eslint-disable-next-line
  updatePurchaseState(ingredients) {
    const totalSum = Object.keys(ingredients)
      .map((ingrKey) => {
        return ingredients[ingrKey]
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({ toPurchase: totalSum > 0 });
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
      ...this.state.ingredients,
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
      totalPrice: newPrice,
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
    const queryParams = [];

    // eslint-disable-next-line
    for (let i in this.state.ingredients) {
      queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.state.ingredients[i])}`);
    }
    queryParams.push(`price=${this.state.totalPrice}`);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: `?${queryString}`,
    });
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    // eslint-disable-next-line
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error
      ? <p>Ingredient can't be loaded!</p>
      : <Spinner />;

    if (this.state.ingredients) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.state.ingredients} />
          <BurgerControls
            price={this.state.totalPrice}
            toPurchase={this.state.toPurchase}
            disabled={disabledInfo}
            addIngredient={this.addIngredientHandler}
            removeIngredient={this.removeIngredientHandler}
            completeOrder={this.purchaseHandler}
          />
        </Auxiliary>
      );

      orderSummary = (
        <OrderSummary
          totalPrice={this.state.totalPrice}
          ingredients={this.state.ingredients}
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    //  {salad: true, meat: false, ... }
    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          closeBackdrop={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
