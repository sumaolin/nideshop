// default config
const path = require('path');

module.exports = {
  default_module: 'api',
  weixin: {
    appid: '', // 小程序 appid
    secret: '', // 小程序密钥
    mch_id: '', // 商户帐号ID
    partner_key: '', // 微信支付密钥
    notify_url: '' // 微信异步通知，例：https://www.nideshop.com/api/pay/notify
  },
  image_prefix_url: 'http://127.0.0.1:8360/', // TODO 待删除
  image: {
    save_root_path: path.join(think.ROOT_PATH, 'www/static/'), // 图片保存的根目录
    url_prefix: 'http://127.0.0.1:8360/static' // 图片访问的根链接
  }
};
