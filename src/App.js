import React, { Component } from 'react';
import { Provider } from 'react-redux';

import createStore from './store/createStore';

const store = createStore();
import Jokes from './Jokes/';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Jokes />
      </Provider>
    );
  }
}
