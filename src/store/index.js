/**
 * @Author: wys
 * @Date: 2018-12-06 14:22:35
 * -----
 * @Modified By: wys
 * @Last Modified: 2019-03-01 11:00:38
 * HISTORY:
 * Date  	By	Comments
 * ------	---	---------------------------------------------------------
 */

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
export default createStore(
    combineReducers({
        ...reducers,
        routing: routeReducer
    }),
    // middleware
    applyMiddleware(thunk)
);