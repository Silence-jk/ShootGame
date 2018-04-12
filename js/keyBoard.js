/**
 * 优化键盘事件，消除飞机移动时射击卡顿
 */
var KeyBoard = function() {
  document.onkeydown = this.keydown.bind(this);
  document.onkeyup = this.keyup.bind(this);
}
KeyBoard.prototype = {
  pressedLeft: false,
  pressedRight: false,
  pressedUp: false,
  pressedSpace: false,
  heldLeft: false,
  heldRight: false,
  keydown: function(e) {
    var key = e.keyCode;
    switch (key) {
      case 32:
        this.pressedSpace = true;
        break;
      case 37:
        this.pressedLeft = true;
        this.heldLeft = true;
        this.pressedRight = false;
        this.heldRight = false;
        break;
      case 38:
        this.pressedUp = true;
        break;
      case 39:
        this.pressedLeft = false;
        this.heldLeft = false;
        this.pressedRight = true;
        this.heldRight = true;
        break;    
      default:
        console.log('the key not match function');
        break;
    }
  },
  keyup: function(e) {
    var key = e.keyCode;
    switch (key) {
      case 32:
        this.pressedSpace = false;
        break;
      case 37:
        this.heldLeft = false;
        this.pressedLeft = false;
      case 38:
        this.pressedUp = false;
        break;
      case 39:
        this.heldRight = false;
        this.pressedRight = false;
        break
    }
  }
}
