import { createStore, combineReducers, applyMiddleware } from 'redux';
import chatReducer from './reducers/chatReducer';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
    chat: chatReducer,
});

const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
);

export default store;