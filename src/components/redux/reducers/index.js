import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';

import user from './user';


const rootReducer = combineReducers({
    user,
});

const middlewares = [];

if(process.env.NODE_ENV === 'development') {
    const {logger } = require('redux-logger');
    middlewares.push(logger);
};

export default createStore(rootReducer, applyMiddleware(thunk, ...middlewares))
