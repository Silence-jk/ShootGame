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
    /**
     * 
     */
    load: function(resources, callback) {
      var images = resources.images;
      var total = images.length;
      var finish = 0;
      //保存加载后的图片
      this.resources = {
        images: {}
      };
      var self = this;

      //遍历加载图片
      for(var i = 0; i< images.length; i++) {
        var name = images[i].name;
        var src = images[i].src;
        self.resources.images[name] = self.imageLoader(src, function() {
          //加载完成
          finish++;
          if(finish === total) {
            //图片全部加载完
            callback(self.resources);
          }
        })
      }
    },
    /**
     * 继承最佳实践
     */
    inheritPrototype: function(child, parent) {
      var proto = Object.create(parent.prototype);
      proto.constructor = child;
      child.prototype = proto;
    }
 }