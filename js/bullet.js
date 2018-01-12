var Bullet = function(opts) {
  this.opts = opts || {};
  Element.call(this, opts);
}

resourceHelper.inheritPrototype(Bullet, Element);

Bullet.prototype.fly = function() {
  this.move(0, -this.speed);
  return this;
}
Bullet.prototype.draw = function(context) {
  context.beginPath();
  context.strokeStyle = '#fff';
  context.moveTo(this.x, this.y);
  context.lineTo(this.x, this.y - this.size);
  context.closePath();
  context.stroke();
  return this;
}