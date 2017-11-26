const Base = require('./base.js');

module.exports = class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    const page = this.get('page') || 1;
    const size = this.get('size') || 10;
    const name = this.get('name') || '';

    const model = this.model('goods');
    const data = await model.where({name: ['like', `%${name}%`]}).order(['id DESC']).page(page, size).countSelect();

    return this.success(data);
  }

  async infoAction() {
    const id = this.get('id');
    const model = this.model('goods');
    const data = await model.where({id: id}).find();

    // 取出相册
    const gallery = await this.model('goods_gallery').where({goods_id: id}).select();
    data.gallery = gallery.map(item => {
      item.url = item.img_url;
      item.name = item.id;
      return item;
    });
    return this.success(data);
  }

  async storeAction() {
    const values = this.post();
    const id = this.post('id');
    const model = this.model('goods');
    const isAdd = id > 0;
    if (isAdd) {
      await model.where({id: id}).update(values);
    } else {
      delete values.id;
      await model.add(values);
    }

    return this.success(values);
  }

  async galleryDestoryAction() {
    const id = this.post('id');
    // 删除文件
    await this.model('goods_gallery').where({id: id}).limit(1).delete();
    return this.success();
  }

  async destoryAction() {
    const id = this.post('id');
    await this.model('goods').where({id: id}).limit(1).delete();
    // TODO 删除图片

    return this.success();
  }
};
