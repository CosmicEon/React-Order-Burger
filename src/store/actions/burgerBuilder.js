import * as actionTypes from './actionTypes';
import axios from '../../services/axios-orders';


// eslint-disable-next-line
export const ingredientAdded = (ingName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingName,
  };
};

// eslint-disable-next-line
export const ingredientRemoved = (ingName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingName,
  };
};

// eslint-disable-next-line
export const initIngredients = () => {
  return (dispatch) => { // dispatch comes from Redux Thunk
    axios.get('/ingredients.json')
      .then((response) => {
        dispatch(setIngredients(response.data));
      })
      .catch((error) => {
        dispatch(fetchIngredientsFailed());
      });
  };
};

// eslint-disable-next-line
export const fetchIngredientsFailed = (ingName) => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients,
  };
};
