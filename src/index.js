import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import thunk from "redux-thunk";
import {createStore, applyMiddleware} from "redux";
import { Provider } from "react-redux";
import reducers from './reducers';
const store = createStore(reducers, applyMiddleware(thunk))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
