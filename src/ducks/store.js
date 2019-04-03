import {createStore, combineReducers} from 'redux';

import userReducer from './userReducer';
import postReducer from './postReducer';

const reducer = combineReducers({
    user: userReducer, 
    post: postReducer
});

export default createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());