import {createStore, combineReducers} from 'redux';

import postReducer from './postReducer';
import userReducer from './userReducer';

const reducer = combineReducers({
    posts: postReducer,
    user: userReducer
})

export default createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());