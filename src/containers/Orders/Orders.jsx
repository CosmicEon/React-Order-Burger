import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../services/axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: false,
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then((response) => {
        const fetchOrders = [];

        // eslint-disable-next-line
        for (const key in response.data) {
          fetchOrders.push({
            ...response.data[key],
            id: key
          });
        }

        this.setState({ loading: false, orders: fetchOrders });
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
