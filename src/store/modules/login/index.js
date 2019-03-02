/**
 * @Author: wys
 * @Date: 2018-12-06 14:27:44
 * -----
 * @Modified By: wys
 * @Last Modified: 2019-03-01 11:00:10
 * HISTORY:
 * Date  	By	Comments
 * ------	---	---------------------------------------------------------
 */

 
// Reducer
const initState = {
    count: 0,
    LoginState: ''
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