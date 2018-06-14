import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { reducer, initialState as chuck } from './modules/chuck';

export default () => {
  const middlewares = [thunk];

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line
    const { logger } = require('redux-logger');

    middlewares.push(logger);
  }

  const store = createStore(
    reducer,
    { chuck },
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  return store;
};
