/**
 * @Author: wys
 * @Date: 2018-12-06 11:44:56
 * -----
 * @Modified By: wys
 * @Last Modified: 2019-03-01 15:06:33
 * HISTORY:
 * Date  	By	Comments
 * ------	---	---------------------------------------------------------
 */

const Login = {
    'POST /login001.json': (req, res) => {
        return res.json({
            head_ret_code: '0000',
            head_ret_msg: '交易成功',
            baseKey: 'EDCFB3DDE6A1456B'
        });
    }
};

module.exports = Login;
