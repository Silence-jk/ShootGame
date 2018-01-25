/**
 * 敌人
 * @param {*} opts 
 */
function Enemy(opts) {
  var opts = opts || {};
  //获取父类方法
  Element.call(this, opts);
  this.status = 'normal';
  // this.load();
  this.icon = opts.icon;
  this.boomIcon = opts.boomIcon;
}

resourceHelper.inheritPrototype(Enemy, Element);

/**
 * 敌人向下移动
 */
Enemy.prototype.down = function() {
  this.move(0, this.size);
  return this;
}
/**
 * 敌人左右移动
 */
Enemy.prototype.translate = function(direction) {
  if(direction === 'left') {
    this.move(-this.speed, 0);
  } else {
    this.move(this.speed, 0);
  }
  return this;
}
/**
 * 绘制敌机
 */
Enemy.prototype.draw = function(context) {
  var self = this;
  if(self.icon && self.boomIcon) {
    switch (this.status) {
      case 'normal':
        context.drawImage(self.icon, this.x, this.y, this.size, this.size);
        break;
      case 'booming':
        context.drawImage(self.boomIcon, this.x, this.y, this.size, this.size);
        break;
    }
  } else {
    context.fillRect(this.x, this.y, this.size, this.size);
  }
  return this;
}
Enemy.prototype.booming = function() {
  this.status = 'booming';
}

