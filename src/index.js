import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "./_reducers"
import {composeWithDevTools} from "redux-devtools-extension";
import ReduxThunk from 'redux-thunk';
import promiseMiddleware from "redux-promise";
import {setAuthToken} from "./utils/axios";

export const store = createStore(rootReducer,
    composeWithDevTools(
    applyMiddleware(
    ReduxThunk,
    promiseMiddleware
)));
setAuthToken(localStorage.AuthToken);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <App/>
      </Provider>
  </React.StrictMode>
);

// If you want to start meas    uring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();