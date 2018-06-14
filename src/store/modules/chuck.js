import axios from 'axios';

const CHUCK_NORRIS_API = 'https://api.chucknorris.io/jokes';

const CATEGORIES_FETCH__REQUEST = '@kupara/CATEGORIES_FETCH__REQUEST';
const CATEGORIES_FETCH__SUCCESS = '@kupara/CATEGORIES_FETCH__SUCCESS';
const CATEGORIES_FETCH__FAILURE = '@kupara/CATEGORIES_FETCH__FAILURE';

const CATEGORY_JOKE_REQUEST = '@kupara/CATEGORY_JOKE_REQUEST';
const CATEGORY_JOKE_FETCH_SUCCESS = '@kupara/CATEGORY_JOKE_FETCH_SUCCESS';
const CATEGORY_JOKE_FETCH__FAILURE = '@kupara/CATEGORY_JOKE_FETCH__FAILURE';

export function fetchCategories() {
  return async dispatch => {
    dispatch({
      type: CATEGORIES_FETCH__REQUEST,
    });

    try {
      const response = await axios.get(`${CHUCK_NORRIS_API}/categories`);

      dispatch({
        type: CATEGORIES_FETCH__SUCCESS,
        payload: {
          data: response.data,
        },
      });
    } catch (e) {
      dispatch({
        type: CATEGORIES_FETCH__FAILURE,
        payload: {
          errorMessage: 'There was an error fetching categories',
        },
      });
    }
  };
}

export function fetchJoke(category) {
  return async dispatch => {
    dispatch({
      type: CATEGORY_JOKE_REQUEST,
    });

    try {
      const response = await axios.get(
        `${CHUCK_NORRIS_API}/random?category=${category}`
      );
      const res = response.data;
      const postCodes = [];
      const towns = [];
      res.forEach(item => postCodes.push(item.code));
      res.forEach(item => towns.push(item.office));
      dispatch({
        type: CATEGORY_JOKE_FETCH_SUCCESS,
        payload: {
          towns,
          postCodes,
        },
      });
    } catch (e) {
      dispatch({
        type: CATEGORY_JOKE_FETCH__FAILURE,
        payload: {
          errorMessage: 'There was an error fetching the joke',
          error: e,
        },
      });
    }
  };
}

// =========================================================================
// Action Handlers

// Your reducer should be without side effects, simply digesting the action
// payload and returning a new state object
// =========================================================================

const ACTION_HANDLERS = {
  [CATEGORY_JOKE_REQUEST]: state =>
    Object.assign({}, state, {
      loadingMetaData: true,
      errorMessage: '',
    }),
  [CATEGORY_JOKE_FETCH_SUCCESS]: (state, action) =>
    Object.assign({}, state, {
      loadingMetaData: false,
      towns: action.payload.towns,
      postCodes: action.payload.postCodes,
    }),
  [CATEGORY_JOKE_FETCH__FAILURE]: (state, action) =>
    Object.assign({}, state, {
      loadingMetaData: false,
      errorMessage: action.payload.errorMessage,
    }),
};

// ========
// Reducer
// ========

const initialState = {
  categories: [],
  isLoading: false,
  loaded: false,
  joke: {},
};

function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

export { initialState, reducer };
