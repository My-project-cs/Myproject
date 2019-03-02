/**
 * @Author: wys
 * @Date: 2018-12-05 18:06:26
 * -----
 * @Modified By: wys
 * @Last Modified: 2019-03-01 15:35:01
 * HISTORY:
 * Date  	By	Comments
 * ------	---	---------------------------------------------------------
 */

import React, { Component } from 'react';
import { any, func, string, number} from 'prop-types';
import { connect } from 'react-redux';

import { increase, decrease, login} from '../../store/modules/login/function';

import './login.less';

// 设置state reducers
const mapStateToProps = (state) => ({
    count: state.login.count,
    loginState: state.login.LoginState
});

const mapDispatchToProps = (dispatch) => ({
    increase: () => dispatch(increase()),
    decrease: () => dispatch(decrease()),
    login: (params) => login(dispatch,params)
});

@connect(
    mapStateToProps,
    mapDispatchToProps
)

export default class Login extends Component {
    static propTypes = {
        history: any,
        login: func,
        loginState: string,
        count: number,
        increase: func,
        decrease: func
    }

    constructor(props) {
        super(props);
        this.onClick.bind(this);
    }

    componentDidMount() {
        this.props.increase();
    }

    onClick = () => {
        const { login , count , history } = this.props;
        if(count >= 5) {
            history.push({
                pathname:'/'
            });
        } else {
            login();
        } 
    }

    render() {
        return (
            <div className='vw-Login'>
                <p>login...</p>
                <p>{this.props.count}</p>
                <p>{this.props.loginState}</p>
                <div onClick = {this.onClick}>Click Me</div>
            </div>
        );
    }
}