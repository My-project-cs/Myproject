/**
 * @Author: wys
 * @Date: 2018-12-05 17:48:47
 * -----
 * @Modified By: wys
 * @Last Modified: 2019-03-01 10:59:35
 * HISTORY:
 * Date  	By	Comments
 * ------	---	---------------------------------------------------------
 */

import React, { Component } from 'react';
import { HashRouter as Router, Route , Switch , Redirect } from 'react-router-dom';

import Login from '../containers/login';
import Success from '../containers/success';

export default class RootRouter extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path='/success' component={Success}/>
                    <Redirect from="/" to='/login' />
                    
                </Switch>
            </Router>
        );
    }
}