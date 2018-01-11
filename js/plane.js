/**
 * Plane 的构造函数
 * @param {*} opts 飞机的坐标，宽高参数 
 */
function Plane(opts) {
  Element.call(this, opts);
}

resourceHelper.inheritPrototype(Plane, Element);
/**
 * draw 根据飞机实例绘制出飞机
 * @param {*} context canvas 画布的 context 属性 
 */
Plane.prototype.draw = function(context) {
  var image = new Image();
  image.src = './img/plane.png';
  image.onload = function() {
    context.drawImage(image, this.x, this.y, this.width, this.height);
  }
  // context.fillRect(this.x, this.y, this.width, this.height);
}
/**
 * Plane 的移动函数
 * @param {*} direction 移动方向 
 * @param {*} num 移动步数
 */
Plane.prototype.move = function(direction, num) {
  var nums = num || 10;
  switch (direction) {
    case 'left':
      this.x -= nums;
      break;
    case 'right':
      this.x += nums;
  }
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
      case 8:
        //发射子弹  
        break;
      //按下左键  
      case 37:
        self.move('left');
        break;
      //按下右键
      case 39:
        self.move('right');
        break;  
      default:
        console.log('direction is not match');
        break;
    }
  }
}