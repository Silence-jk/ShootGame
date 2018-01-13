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

function getEnemyBoundary(enemies) {
  var minX, maxX;
  enemies.forEach(enemy => {
    if(!minX && !maxX) {
      minX = enemy.x;
      maxX = enemy.x;
    } else {
      if(enemy.x < minX) {
        minX = enemy.x;
      } 
      if(enemy.x > maxX) {
        maxX = enemy.x;
      }
    }
  });
  return {
    minX,
    maxX
  }
}
// 元素
var container = document.getElementById('game');
var totalScore = document.querySelector('.game-failed .score');
var replayStart = document.querySelector('.game-failed .js-replay');
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
    this.enemyDirection = this.opts.enemyDirection;

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
    replayStart.onclick = function() {
      self.play();
    }
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
  end: function(status) {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    this.setStatus(status);
  },
  play: function() {
    this.setStatus('playing');
    this.drawScore();
    this.plane = new Plane({
      x: this.planePosX,
      y: this.planePosY,
      size: this.opts.planeSize,
      speed: this.opts.planeSpeed,
      minX: this.planeMinx,
      maxX: this.planeMaxX
    });
    this.plane.listenEvents();

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
    this.drawScore();
    this.updateEnemies();
    this.draw();

    if (enemies.length === 0) {
      this.end('failed');
      totalScore.innerText = this.score;
      return;
    }

    if(enemies[enemies.length - 1].y >= this.enemyLimitY) {
      this.end('failed');
      totalScore.innerText = this.score;
      return;
    }
    requestAnimFrame(function() {
      self.update();
    });
  },
  updateEnemies: function() {
    var enemies = this.enemies;
    var len = enemies.length;
    var temp = getEnemyBoundary(enemies);
    var down = false;

    if (temp.minX < this.enemyMinX || temp.maxX > this.enemyMaxX) {
      this.enemyDirection = this.enemyDirection === "right" ? "left" : "right";
      down = true;
    }

    while (len--) {
      var enemy = this.enemies[len];
      enemy.translate(this.enemyDirection);
      if(down) {
        enemy.down();
      }
      switch (enemy.status) {
        case 'normal':
          if(this.plane.hasHit(enemy)) {
            enemy.booming();
          }
          break;
        case 'booming':
          this.enemies.splice(len, 1);  
          this.score++;
          break;
      }
    }
  },
  draw: function() {
    this.plane.draw(context);
    this.enemies.forEach((enemy) => {
      enemy.draw(context);
    })
  },
  drawScore: function() {
    context.fillStyle = '#fff';
    context.font = '18px 黑体';
    context.fillText('分数: ' + this.score, 20, 20);
  }
};


// 初始化
GAME.init();
