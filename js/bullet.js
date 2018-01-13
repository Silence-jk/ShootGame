/**
 * 子弹的构造函数
 * @param {*} opts  子弹的属性 
 */
var Bullet = function(opts) {
  this.opts = opts || {};
  Element.call(this, opts);
}

resourceHelper.inheritPrototype(Bullet, Element);

/**
 * 子弹移动
 */
Bullet.prototype.fly = function() {
  this.move(0, -this.speed);
  return this;
}
/**
 * 绘制子弹轨迹
 * @param {*} context 
 */
Bullet.prototype.draw = function(context) {
  context.beginPath();
  context.strokeStyle = '#fff';
  context.moveTo(this.x, this.y);
  context.lineTo(this.x, this.y - this.size);
  context.closePath();
  context.stroke();
  return this;
}