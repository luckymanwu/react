import { createStore, applyMiddleware } from 'redux';
import { reducer } from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = composeWithDevTools({});

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);
