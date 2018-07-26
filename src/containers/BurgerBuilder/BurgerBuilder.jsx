import React, { Component } from 'react';
import { connect } from 'react-redux';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../services/axios-orders';
import * as actions from '../../store/actions';


class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  }

  componentDidMount() {
    this.props.onInitIngredients();
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

    return totalSum > 0;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    this.props.onPurchaseInit();
    this.props.history.push('/checkout');
  }

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };

    // eslint-disable-next-line
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error
      ? <p>Ingredient can't be loaded!</p>
      : <Spinner />;

    if (this.props.ings) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.props.ings} />
          <BurgerControls
            price={this.props.price}
            addIngredient={this.props.onIngredientAdded}
            removeIngredient={this.props.onIngredientRemoved}
            completeOrder={this.purchaseHandler}
            toPurchase={this.updatePurchaseState(this.props.ings)}
            disabled={disabledInfo}
          />
        </Auxiliary>
      );

      orderSummary = (
        <OrderSummary
          totalPrice={this.props.price}
          ingredients={this.props.ings}
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
        />
      );
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

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilderReducer.ingredients,
    price: state.burgerBuilderReducer.totalPrice,
    error: state.burgerBuilderReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: ingName => dispatch(actions.ingredientAdded(ingName)),
    onIngredientRemoved: ingName => dispatch(actions.ingredientRemoved(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onPurchaseInit: () => dispatch(actions.purchaseInit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
