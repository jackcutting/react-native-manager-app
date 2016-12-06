import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import * as firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

const config = {
  apiKey: 'AIzaSyAI2P1Bl6AmFPGwKtpu011aVT7CHVxoauQ',
  authDomain: 'reactnativemanager-d2c35.firebaseapp.com',
  databaseURL: 'https://reactnativemanager-d2c35.firebaseio.com',
  storageBucket: '',
  messagingSenderId: '11828520568'
};

firebase.initializeApp(config);

class App extends Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
