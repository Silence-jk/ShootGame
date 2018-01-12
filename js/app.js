// 元素
var container = document.getElementById('game');

//画布
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');


// 判断是否支持 requestAnimationFrame 方法，不支持用 setTimeout 模拟实现 
window.requestAnimFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 30);
  };

function clear() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  plane.draw(context);
}

function refresh() {
  clear();
  draw();
  requestAnimFrame(refresh);
}
/**
 * 整个游戏对象
 */
var GAME = {
  /**
   * 初始化函数,这个函数只执行一次
   * @param  {object} opts 
   * @return {[type]}      [description]
   */
  init: function(opts) {
    this.status = 'start';
    this.bindEvent();
  },
  bindEvent: function() {
    var self = this;
    var playBtn = document.querySelector('.js-play');
    // 开始游戏按钮绑定
    playBtn.onclick = function() {
      self.play();
    };
  },
  update: function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    plane.draw(context);
    
  },
  /**
   * 更新游戏状态，分别有以下几种状态：
   * start  游戏前
   * playing 游戏中
   * failed 游戏失败
   * success 游戏成功
   * all-success 游戏通过
   * stop 游戏暂停（可选）
   */
  setStatus: function(status) {
    this.status = status;
    container.setAttribute("data-status", status);
  },
  play: function() {
    this.setStatus('playing');
    plane.draw(context);
    plane.listenEvents(context);
    refresh(plane);
  }
};


// 初始化
GAME.init();
