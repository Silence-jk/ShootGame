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
// 元素
var container = document.getElementById('game');
//画布
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var canvasWidth = canvas.clientWidth;
var canvasHeight = canvas.clientHeight;

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
    var opts = Object.assign({}, opts, CONFIG);
    this.opts = opts;
    this.planeWidth = opts.planeSize.width;
    this.planeHeight = opts.planeSize.height;
    this.padding = opts.canvasPadding;

    //enemy active area
    this.enemyLimitY = canvasHeight - this.padding - this.planeHeight;
    this.enemyMinX = this.padding;
    this.enemyMaxX = canvasWidth - this.padding - opts.enemySize;

    //plane active area   
    this.planeMinX = this.padding;
    this.planeMaxX = canvasWidth - this.padding - this.planeWidth; 
    //plane init position
    this.planePosX = canvasWidth / 2 - this.planeWidth;
    this.planePosY = this.enemyLimitY;

    //score area
    this.score = 0;

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
    this.enemies = [];
    var enemyTotal = this.opts.numPerLine;
    var enemySpeed = this.opts.enemySpeed;
    var enemySize = this.opts.enemySize;
    var enemyGap = this.opts.enemyGap;
    var padding = this.opts.canvasPadding;
    for(var i = 0; i < enemyTotal; i++) {
      var enemy = new Enemy({
        x: padding + (enemySize + enemyGap)*i,
        y: padding,
        size: enemySize,
        speed: enemySpeed
      });
      this.enemies.push(enemy);
    }

    
    this.update();
  },
  update: function() {
    var self = this;
    var enemies = this.enemies;
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    plane.draw(context);
    plane.listenEvents();
    var len = this.enemies.length;
    var lastEnemyX = enemies[len-1].x;
    var firstEnemyX = enemies[0].x;
    var direction;
    if(lastEnemyX >= this.enemyMaxX || firstEnemyX <= this.enemyMinX) {
      direction = direction === "right" ? "left" : "right";
    }
    console.log(lastEnemyX + ' ' + firstEnemyX);
    console.log('-----------------')
    console.log(this.enemyMaxX + ' ' + this.enemyMinX);
    while (len--) {
      this.enemies[len].draw(context);
      this.enemies[len].translate(direction);
    }

    requestAnimFrame(function() {
      self.update();
    });
  }
};


// 初始化
GAME.init();
