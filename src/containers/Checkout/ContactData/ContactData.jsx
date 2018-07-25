import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../services/axios-orders';
import './ContactData.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Krasi',
        address: {
          street: 'test street',
          zipCode: '4334342',
          country: 'Bulgaria',
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest',
    };

    axios.post('/orders.json', order) // .json is required by firebase
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push('/');
        console.log(response);
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
      });
  }

  render() {
    let form = (
      <form action="#">
        <input className="Input" type="text" name="name" placeholder="Your Name" />
        <input className="Input" type="email" name="email" placeholder="Your Email" />
        <input className="Input" type="text" name="street" placeholder="Street" />
        <input className="Input" type="text" name="postal" placeholder="Postal Code" />
        <Button buttonType="Success" clickEvent={this.orderHandler}>Order</Button>
      </form>);

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className="ContactData">
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
