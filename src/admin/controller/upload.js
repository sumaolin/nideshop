const Base = require('./base.js');
const gm = require('gm').subClass({imageMagick: true});
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

module.exports = class extends Base {
  async brandPicAction() {
    const brandFile = this.file('brand_pic');
    if (think.isEmpty(brandFile)) {
      return this.fail('保存失败');
    }
    const that = this;
    const filename = '/static/upload/brand/' + think.uuid(32) + '.jpg';
    const is = fs.createReadStream(brandFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
    is.pipe(os);

    return that.success({
      name: 'brand_pic',
      fileUrl: 'http://127.0.0.1:8360' + filename
    });
    // gm(brandFile.path)
    //   .resize(750, 420, '!')
    //   .write(think.RESOURCE_PATH + filename, function (err) {
    //     if (err) {
    //       return that.fail('图片上传失败');
    //     }
    //     return that.success({
    //       name: 'brand_pic',
    //       fileUrl: 'http://127.0.0.1:8360' + filename
    //     });
    //   });
  }

  async brandNewPicAction() {
    const brandFile = this.file('brand_new_pic');
    if (think.isEmpty(brandFile)) {
      return this.fail('保存失败');
    }
    const that = this;
    const filename = '/static/upload/brand/' + think.uuid(32) + '.jpg';

    const is = fs.createReadStream(brandFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
    is.pipe(os);

    return that.success({
      name: 'brand_new_pic',
      fileUrl: 'http://127.0.0.1:8360' + filename
    });
    // gm(brandFile.path)
    //   .resize(375, 252, '!')
    //   .write(think.ROOT_PATH + '/www' + filename, function(err) {
    //     if (err) {
    //       return that.fail('上传失败');
    //     }
    //     return that.success({
    //       name: 'brand_new_pic',
    //       fileUrl: 'http://127.0.0.1:8360' + filename
    //     });
    //   });
  }

  async categoryWapBannerPicAction() {
    const imageFile = this.file('wap_banner_pic');
    if (think.isEmpty(imageFile)) {
      return this.fail('保存失败');
    }
    const that = this;
    const filename = '/static/upload/category/' + think.uuid(32) + '.jpg';

    const is = fs.createReadStream(imageFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
    is.pipe(os);

    return that.success({
      name: 'wap_banner_url',
      fileUrl: 'http://127.0.0.1:8360' + filename
    });
  }

  async topicThumbAction() {
    const imageFile = this.file('scene_pic_url');
    if (think.isEmpty(imageFile)) {
      return this.fail('保存失败');
    }
    const that = this;
    const filename = '/static/upload/topic/' + think.uuid(32) + '.jpg';

    const is = fs.createReadStream(imageFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
    is.pipe(os);

    return that.success({
      name: 'scene_pic_url',
      fileUrl: 'http://127.0.0.1:8360' + filename
    });
  }

  async goodsPicAction() {
    const imageFile = this.file('goods_pic');
    if (think.isEmpty(imageFile)) {
      return this.fail('保存失败');
    }
    const that = this;
    const filename = '/static/upload/goods/' + think.uuid(32) + '.jpg';

    const is = fs.createReadStream(imageFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
    is.pipe(os);

    return that.success({
      name: 'scene_pic_url',
      fileUrl: 'http://127.0.0.1:8360' + filename
    });
  }

  async goodsDescPicAction() {
    const imageFile = this.file('goods_desc_pic');
    if (think.isEmpty(imageFile)) {
      return this.fail('保存失败');
    }
    const that = this;
    const filename = '/static/upload/goods/' + think.uuid(32) + '.jpg';

    const is = fs.createReadStream(imageFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
    is.pipe(os);

    that.body = JSON.stringify({
      errno: 0,
      data: [
        'http://127.0.0.1:8360' + filename
      ]
    });
    // const data = await saveFiles(this.ctx.req);
    //
    // // 返回结果
    // return this.json(data);
  }
};
function objForEach(obj, fn) {
  let key, result;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      result = fn.call(obj, key, obj[key]);
      if (result === false) {
        break;
      }
    }
  }
}
function saveFiles(req) {
  return new Promise((resolve, reject) => {
    const imgLinks = [];
    console.log('我到这里了');

    const form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
      if (err) {
        reject('formidable, form.parse err', err.stack);
      }
      // 存储图片的文件夹
      const storePath = think.ROOT_PATH + '/www/static/upload/goods/';
      if (!fs.existsSync(storePath)) {
        fs.mkdirSync(storePath);
      }

      // 遍历所有上传来的图片
      objForEach(files, (name, file) => {
        // 图片临时位置
        const tempFilePath = file.path;
        // 图片名称和路径
        const fileName = file.name;
        const fullFileName = path.join(storePath, fileName);
        // 将临时文件保存为正式文件
        fs.renameSync(tempFilePath, fullFileName);
        // 存储链接
        imgLinks.push('/upload-files/' + fileName);
      });

      // 返回结果
      resolve({
        errno: 0,
        data: imgLinks
      });
    });
  });
}
