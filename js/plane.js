/**
 * Plane 的构造函数
 * @param {*} opts 飞机的坐标，宽高参数 
 */
function Plane(opts) {
  var opts = opts || {};
  Element.call(this, opts);
  this.minX = opts.minX;
  this.maxX = opts.maxX;
  this.bulletSpeed = opts.bulletSpeed || CONFIG.bulletSpeed;
  this.bulletSize = opts.bulletSize || CONFIG.bulletSize;
  this.bullets = [];
  this.load();;
}

resourceHelper.inheritPrototype(Plane, Element);

Plane.prototype.load = function() {
  if(Plane.icon) {return this};
  var image = new Image();;
  image.src = CONFIG.planeIcon;
  image.onload = function() {
    Plane.icon = image;
  }
  return this;
}
/**
 * draw 根据飞机实例绘制出飞机
 * @param {*} context canvas 画布的 context 属性 
 */
Plane.prototype.draw = function(context) {
  this.drawBullets(context);
  if(!Plane.icon) {
    context.fillRect(this.x, this.y, this.size.width, this.size.height);
  } else {
    context.drawImage(Plane.icon, this.x, this.y, this.size.width, this.size.height);
  }
  return this;
}

/**
 * 发射子弹
 */
Plane.prototype.shoot = function() {
  var x = this.x + this.size.width / 2;
  this.bullets.push(new Bullet({
    x: x,
    y: this.y,
    size: this.bulletSize,
    speed: this.bulletSpeed
  }));
  return this;
}

/**
 * 绘制子弹
 */
Plane.prototype.drawBullets = function(context) {
  var bullets = this.bullets;
  var len = bullets.length;
  while(len--) {
    var bullet = bullets[len];
    bullet.fly();
    if(bullet.y <= 0) {
      bullets.splice(len, 1);
    }
    bullet.draw(context);
  }
}

/**
 * Plane 的移动函数
 * @param {*} direction 移动方向 
 */
Plane.prototype.translate = function(direction) {
  var distance;
  switch (direction) {
    case 'left':
      distance = this.x < this.minX ? 0 : -this.speed;
      break;
    case 'right':
      distance = this.x > this.maxX ? 0 : this.speed;
  }
  this.move(distance, 0);
  return this;
}

/**
 * 监听键盘事件
 */
Plane.prototype.listenEvents = function() {
  var self = this;
  document.onkeydown = function(e) {
    //获取被按下的键值，兼容写法
    var key = e.keyCode || e.which || e.charCode;
    switch (key) {
      //按下空格或上键发射子弹
      case 38:
      case 32:
        //发射子弹  
        self.shoot();
        break;
      //按下左键  
      case 37:
        self.translate('left');
        break;
      //按下右键
      case 39:
        self.translate('right');
        break;  
      default:
        console.log('direction is not match');
        break;
    }
  }
}

/**
 * 判断子弹是否射中敌人
 * @param {*} enemy 
 */
Plane.prototype.hasHit = function(enemy) {
  var bullets = this.bullets;
  for(var i = bullets.length -1; i >= 0; i--) {
    var bullet = bullets[i];
    var x = bullet.x >= enemy.x && bullet.x <= (enemy.x + enemy.size);
    var y = bullet.y >= enemy.y && bullet.y <= (enemy.y + enemy.size);
    if(x && y) {
      this.bullets.splice(i, 1);
      return true;
    }
  }
  return false;
}