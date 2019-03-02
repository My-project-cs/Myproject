# 创建文件夹
mkdir myapp

# 进入文件夹
cd myapp

# npm 初始化
npm init 

# webpack配置

# 安装webpack webpack脚手架 webpack运行服务
npm install webpack webpack-cli webpack-dev-server 

# 安装webpack配置继承插件 打包html文件插件
npm install webpack-merge html-webpack-plugin

# 创建文件目录
mkdir src index webpack
touch src/index.js index/index.html webpack/webpack-config.js webpack/webpack.dev.js webpack/webpack.prod.js

# package.json 添加命令
# "script":{
# 	"webpack": "webpack"，
#   "dev": "webpack --config webpack/webpack-config.js",
#   "start": "webpack-dev-server --config webpack/webpack.dev.js",
#   "build": "webpack --config webpack/webpack.prod.js"
# }
# webpack 命令自动寻找src目录下index.js 运行打包,默认放置在dist目录下(没有就新建文件夹)

# 根据webpack默认配置打包
npm run webpack

# 根据 webpack/webpack-config.js配置打包
npm run dev

# 根据 webpack/webpack.dev.js 配置运行服务
npm run start

# 根据 webpack/webpack.prod.js 配置打包文件
npm run build

# 安装 babel编译工具
npm install babel-cli babel-core babel-eslint babel-loader babel-plugin-dva-hmr babel-plugin-import babel-plugin-transform-async-to-generator babel-plugin-transform-decorators babel-plugin-transform-decorators-legacy babel-plugin-transform-runtime babel-preset-env babel-preset-react babel-preset-stage-0

# 配置 .babelrc 文件
    
{
    "presets": ["env", "react", "stage-0"],
    "plugins": [
        "dva-hmr",
        "transform-decorators-legacy",
        "transform-async-to-generator",
        [
            "transform-runtime",
            {
                "helpers": false,
                "polyfill": false,
                "regenerator": true,
                "moduleName": "babel-runtime"
            }
        ]
    ]
}

#安装 eslint
npm install eslint eslint-loader eslint-plugin-react

# 安装 react react-dom
npm install react react-dom

# 修改index.js 为react 

import React, { Component } from 'react';
import { render } from 'react-dom';

# react组件 可单独提出来
export default class Test extends Component {
    render() {
        return (
            <div>
                hello react
            </div>
        );
    }
}

render(<Test/>,document.getElementById('app'));

# react路由学习

# 安装路由
npm install react-router react-router-dom

# 配置路由
import React, { Component } from 'react';
import { HashRouter as Router, Route , Switch , Redirect } from 'react-router-dom';

import Login from '../login';
import Test from '../test';

export default class RootRouter extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/test" component={Test} />
                    <Route path="/login" component={Login} />
                    <Redirect from="/" to='/login' />
                </Switch>
            </Router>
        );
    }
}

# redux 学习

# 安装redux
npm install redux react-redux react-router-redux redux-thunk

# 使用redux
store.js
import { createStore } from 'redux';

const reducer = (state = {count: 0}, action) => {
    switch (action.type){
        case 'INCREASE': return {count: state.count + 1};
        case 'DECREASE': return {count: state.count - 1};
        default: return state;
    }
};
  
const store = createStore(reducer);
  
store.subscribe(() =>
    console.log(store.getState())
);

export const actions = {
    increase: () => ({type: 'INCREASE'}),
    decrease: () => ({type: 'DECREASE'})
};

export default store;

login.js
import store , { actions } from '../redux';

componentDidMount() {
	store.dispatch(actions.increase());
}

# 学习使用 react-redux

# 引入Provider 和 store
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import Router from './router';

render(
    <Provider store={store}>
        <Router />
    </Provider>,
    document.getElementById('app')
);

# 创建 store 并引入 reducer
store/index.js
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

store/reducer/index.js
import login from '../modules/login';

export default { login };

store/modules/login/index.js

// Reducer
const initState = {
    count: 0
};

export default (state = initState , action) => {
    let obj = {};
    switch (action.type){
        case 'INCREASE': 
            obj = {
                count: state.count + 1               
            };
            return obj;
        case 'DECREASE':
            obj = {
                count: state.count - 1               
            };
            return obj;
        case 'LoginState':
            obj = {
                ...state,
                LoginState: action.baseKey
            };
            return obj;
        default: 
            return state;
    }
};

# 组件使用react-redux

import React, { Component } from 'react';
import { any, func, string, object, number} from 'prop-types';
import { connect } from 'react-redux';

// import store , { actions } from '../redux';

import { increase, decrease, login} from '../store/modules/login/function';

// 设置state reducers
const mapStateToProps = (store) => ({
    count: store.login.count
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
        dispatch: any,
        login: func,
        loginState: string,
        ChangeState: object,
        count: number,
        increase: func,
        decrease: func
    }

    constructor(props) {
        super(props);
        this.onClick.bind(this);
    }

    componentDidMount() {
        // store.dispatch(actions.increase()); redux
        this.props.increase();
    }

    onClick = () => {
        // const Props = this.props,
        //     { history } = Props;
        
        // history.push({
        //     pathname:'/test'
        // });
        this.props.login();
    }

    render() {
        return (
            <div>
                <p>login...</p>
                <p>{this.props.count}</p>
                <div onClick = {this.onClick}>Click Me</div>
            </div>
        );
    }
}