/**
 * Created on 2017-01-23.
 * @author: Gman Park
 */

module.exports = {
    /**
     * 11st search API proxy
     */
    '/11st/search': {
        //'http://apis.skplanetx.com/11st/v2/common/products?appKey=' + AppKey + '&searchKeyword=' + this.searchKeyword + '&sortCode=A'
        target: 'http://apis.skplanetx.com/11st/v2/common/products',
        secure: true,
        headers: {
            'Host': 'gman.io',
            'Cookie': '' // send cookie on demand
        },
        pathRewrite: function (path) {
            return path.replace(/^\/node-0/, ''); // remove '/node-0' prefix when requesting
        }
    }
};