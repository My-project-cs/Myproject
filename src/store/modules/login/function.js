/**
 * @Author: wys
 * @Date: 2018-12-06 16:39:32
 * -----
 * @Modified By: wys
 * @Last Modified: 2019-03-01 11:00:01
 * HISTORY:
 * Date  	By	Comments
 * ------	---	---------------------------------------------------------
 */

import { GetLoginInfo } from '../../../api';
import { INCREASE , DECREASE , LoginState} from './action';

export function increase() {
    return SetAction(INCREASE);
}

export function decrease() {
    return SetAction(DECREASE);
}

export async function login(dispatch,params) {
    const response = await GetLoginInfo(params);
    if(!response) return;
    let obj = SetAction(LoginState,response);
    return dispatch(increase()) && dispatch(obj);
}

function SetAction(type,state) {
    return {
        type: type,
        ...state
    };
}