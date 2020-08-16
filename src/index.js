import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from "redux-thunk";
import {createStore, applyMiddleware} from "redux";
import {createLogger} from "redux-logger";
import * as serviceWorker from './serviceWorker';

import  rootReducer from "./reducers";
import {select_Subreddit, fetchPosts, fetchPostsIfNeeded} from "./actions";

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

store.dispatch(select_Subreddit("react.js"));
store.dispatch(fetchPosts("react.js"))
    .then(
      () => console.log(store.getState())
    )

store.dispatch(fetchPostsIfNeeded("react.js"));



ReactDOM.render(
  <React.StrictMode>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
