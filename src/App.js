import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';

import createStore from './store/createStore';

const store = createStore();
import Header from './Header/';
import Jokes from './Jokes/';

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Provider store={store}>
          <Jokes />
        </Provider>
      </Fragment>
    );
  }
}
