/**
 * @Author: wys
 * @Date: 2018-12-05 14:28:18
 * -----
 * @Modified By: wys
 * @Last Modified: 2019-03-01 11:01:01
 * HISTORY:
 * Date  	By	Comments
 * ------	---	---------------------------------------------------------
 */

import 'amfe-flexible';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import Router from './router';

import './common/style/reset.less';

render(
    <Provider store={store}>
        <Router />
    </Provider>,
    document.getElementById('app')
);