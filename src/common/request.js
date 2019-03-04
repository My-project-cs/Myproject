/**
 * @Author: wys
 * @Date: 2018-12-06 18:07:45
 * -----
 * @Modified By: wys
 * @Last Modified: 2019-03-04 11:26:39
 * HISTORY:
 * Date  	By	Comments
 * ------	---	---------------------------------------------------------
 */
import { baseUrl } from '../config';

export async function post(url, params = {}) {
    url = baseUrl ? baseUrl + url : url;
    return fetch(url,{
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then((response) => {
        return response.json();
    });
}
