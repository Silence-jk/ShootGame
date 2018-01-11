/**
 * 父类对象，存放共同属性
 * @param {*} opts 
 */
function Element(opts) {
  var opts = opts || {};
  this.x = opts.x;
  this.y = opts.y;
  this.width = opts.width;
  this.height = opts.height;
  this.speed = opts.speed;
}

/**
 * 飞机与敌人的共同属性
 * @param {*} params 
 */
Element.prototype = {
  move: function(x, y) {
    this.x = x;
    this.y = y;
  }
}