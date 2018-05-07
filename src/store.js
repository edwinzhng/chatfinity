import { createStore, combineReducers, applyMiddleware } from 'redux';
import chatReducer from './reducers/chatReducer';
import thunk from 'redux-thunk';

const reducer = combineReducers({
    chat: chatReducer,
});

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

export default store;