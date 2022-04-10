import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../features/Auth/reducer';
import productReducer from '../features/Products/reducer';

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducers = combineReducers({
    auth: authReducer,
    products: productReducer
});

const store = createStore(rootReducers, composerEnhancer(applyMiddleware(thunk)));

export default store;