/**
 * 资源管理器
 */

 var resourceHelper = {
   /**
    * 加载图像
    */
    imageLoader: function(src, callback) {
      var image = new Image();
      //加载完成
      image.addEventListener('load', callback);
      image.addEventListener('error', function() {
        console.log('image error');
      });
      image.src = src;
      return image;
    },
    /**
     * 根据图片名称返回图片对象
     */
    getImage: function(imageName) {
      return this.resources.images[imageName];
    },
    inheritPrototype: function(child, parent) {
      var proto = parent.prototype;
      proto.constructor = child;
      child.prototype = proto;
    }
 }