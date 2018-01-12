/**
 * 父类对象，存放共同属性
 * @param {*} opts 
 */
function Element(opts) {
  var opts = opts || {};
  this.x = opts.x;
  this.y = opts.y;
  this.size = opts.size;
  this.speed = opts.speed;
}

/**
 * 飞机与敌人的共同属性
 * @param {*} params 
 */
Element.prototype = {
  move: function(x, y) {
    var a = x || 0;
    var b = y || 0; 
    this.x += a;
    this.y += b;
  },
  draw: function() {
    
  }
}