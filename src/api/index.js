/**
 * @Author: wys
 * @Date: 2018-12-06 17:56:05
 * -----
 * @Modified By: wys
 * @Last Modified: 2019-03-01 15:09:12
 * HISTORY:
 * Date  	By	Comments
 * ------	---	---------------------------------------------------------
 */
import { post } from '../common/request';

export async function GetLoginInfo(params) {
    return post('/login001.json', params);
}
