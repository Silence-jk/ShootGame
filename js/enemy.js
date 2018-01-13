/**
 * 敌人
 * @param {*} opts 
 */
function Enemy(opts) {
  var opts = opts || {};
  //获取父类方法
  Element.call(this, opts);
  this.status = 'normal';
  this.load();
}

resourceHelper.inheritPrototype(Enemy, Element);

/**
 * 加载敌人图片
 */
Enemy.prototype.load = function() {
  if(Enemy.icon) {return this;}
  var enemyIcon = new Image();
  enemyIcon.src = CONFIG.enemyIcon;
  enemyIcon.onload = function() {
    Enemy.icon = enemyIcon;
  }

  var enemyBoomIcon = new Image();
  enemyBoomIcon.src = CONFIG.enemyBoomIcon;
  enemyBoomIcon.onload = function() {
    Enemy.boomIcon = enemyBoomIcon;
  }
  return this;
}
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
  if(Enemy.icon && Enemy.boomIcon) {
    switch (this.status) {
      case 'normal':
        context.drawImage(Enemy.icon, this.x, this.y, this.size, this.size);
        break;
      case 'booming':
        context.drawImage(Enemy.boomIcon, this.x, this.y, this.size, this.size);
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

