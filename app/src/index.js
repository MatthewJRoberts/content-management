import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import sitesReducer from './store/reducers/sites';
import userReducer from './store/reducers/user';
import photoReducer from './store/reducers/photo';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const rootReducer = combineReducers({
    sites: sitesReducer,
    user: userReducer,
    photo: photoReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={ store } ><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
