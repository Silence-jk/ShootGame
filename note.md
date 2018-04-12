# plane game conclusion

项目中碰到的一些问题
- 在image.onload 事件中绘制图片时，发现设置的位置，宽高都不起作用，图片一直处在左上角；原因：没用改变 this 的指向，此时 this 指向的是 image，并非当前函数
- 图片一直绘制不出来；原因: 在每次刷新重绘 canvas 画布时，都使用了 new Image()，导致每次绘制都会新加载图片，解决方法
  - One: 图片加载的方法单独写出来并当作构造函数的属性
  - Two: 在全局写一个加载所有图片的资源类，在游戏初始化前就加载图片
- 敌人一移动到右边边界就会直接落到底部；原因：将敌人的移动方向赋值给了局部变量，每次更新界面都会去全局读取，导致即使到边界也不会向左，一直在右边触发边界值，下落
- 飞机在移动中射击子弹会卡顿；解决方法：重写键盘事件
- canvas 的30内边距，刚开始通过 box-szing 和 padding 来设置发现无效，后来发现其实有没有 padding 无所谓，只需在绘制时加上这内边距就可

做完这个项目，学到了不少东西：
- 用 config.js 文件来配置一些属性
- 熟练的掌握的继承的最佳实践
- Object.assign() 可以将多个属性放在一个对象中
- 键盘事件的卡顿优化
- 使用更好的动画 
```js
window.requestAnimFrame =
window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.oRequestAnimationFrame ||
window.msRequestAnimationFrame ||
function(callback) {
window.setTimeout(callback, 1000 / 30);
};
```
