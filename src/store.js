import {createStore, combineReducers, applyMiddleware} from 'redux';
import photoReducer from './reducerc/photoReducer';
import thunk from 'redux-thunk';

const reducer =  combineReducers({
    photo: photoReducer
});

const configureStore = createStore(reducer, applyMiddleware(thunk));

export default configureStore;