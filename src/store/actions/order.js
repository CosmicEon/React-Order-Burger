import * as actionTypes from './actionTypes';
import axios from '../../services/axios-orders';

// eslint-disable-next-line
const purchaseBurgerSuccess = (orderId, orderDetails) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId,
    orderDetails,
  };
};

// eslint-disable-next-line
const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error,
  };
};

// eslint-disable-next-line
export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

// eslint-disable-next-line
export const purchaseBurger = (orderDetails, token) => {
  return (dispatch) => { // dispatch comes from Redux Thunk
    dispatch(purchaseBurgerStart());

    axios.post(`/orders.json?auth=${token}`, orderDetails) // .json is required by firebase
      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderDetails));
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

// eslint-disable-next-line
export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

// eslint-disable-next-line
const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders,
  };
};

// eslint-disable-next-line
const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error,
  };
};

// eslint-disable-next-line
const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

// eslint-disable-next-line
export const fetchOrders = (token, userId) => {
  return (dispatch) => { // dispatch comes from Redux Thunk
    dispatch(fetchOrdersStart());

    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    axios.get(`/orders.json${queryParams}`) // .json is required by firebase
      .then((response) => {
        const fetchOrdersArray = [];

        // eslint-disable-next-line
        for (const key in response.data) {
          fetchOrdersArray.push({
            ...response.data[key],
            id: key,
          });
        }

        dispatch(fetchOrdersSuccess(fetchOrdersArray));
      })
      .catch((error) => {
        dispatch(fetchOrdersFail(error));
      });
  };
};
