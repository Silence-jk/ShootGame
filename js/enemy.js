/**
 * 敌人
 * @param {*} opts 
 */
function Enemy(opts) {
  //获取父类方法
  Element.call(this, opts);
  this.status = 'normal';
  this.image = image;
}

resourceHelper.inheritPrototype(Enemy, Element);

Enemy.prototype.down = function() {
  this.move();
}