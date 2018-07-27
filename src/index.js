/* globals document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './containers/App/App';
import store from './store/storeConfig';
import registerServiceWorker from './registerServiceWorker';
import './assets/styles/index.css';


const app = (
  // eslint-disable-next-line
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root')); // eslint-disable-line
registerServiceWorker();
