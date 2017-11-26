module.exports = class extends think.Logic {
  indexAction() {
    this.allowMethods = 'get';
  }

  storeAction() {
    this.allowMethods = 'post';
  }
};
