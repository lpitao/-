;(function ($, window, document, undefined) {
  var Carousel = function (elem, options) {
    this.defaults = {curDisplay: 0, autoPlay: false, interval: 3000};
    this.opts = $.extend({}, this.defaults, options);

    var self = this;
    this.$carousel = elem;
    this.$aImg = this.$carousel.find('img');
    this.$prev = $('#gundong .prev');
    this.$next = $('#gundong .next');

    this.imgLen = this.$aImg.length;
    this.curDisplay = this.opts.curDisplay;
    this.autoPlay = this.opts.autoPlay;
    this.viewWidth = $(window).width() / 2;
    this.b_switch = true;
    this.iNow = this.opts.curDisplay;
    this.timer = null;
    this.interval = this.opts.interval;
    // 生成小点点
    var htmlNav = "<ul style='display:none;'>";
    for (var i = 0; i < this.imgLen; i++) {
      if(this.curDisplay == i){
        htmlNav += "<li class=on><a>"+ i +"</a></li>";
      }else {
        htmlNav += "<li><a>"+ i +"</a></li>";
      }
    }
    htmlNav += "</ul>";
    this.$carousel.parent().append('<div id=bannerNav>'+ htmlNav +'</div>');
    this.$aNav = this.$carousel.siblings('#bannerNav').find('ul li');
  };

  var outerWidth = parseInt($(window).width());
  var middleWidth = 1920;
  var _height = 472;
  var _slideHeight = 472;

  Carousel.prototype = {
    play: function () {
      if (this.autoPlay) {
        if (this.iNow === this.imgLen - 1) {
          this.iNow = 0;
        } else {
          this.iNow ++;
        }

        this.movingNext(this.iNow);
      }
    },

    movingPrev: function (index) {
      this.curDisplay = index;

      this.initalCarousel();
    },

    movingNext: function (index) {
      this.curDisplay = index;

      this.initalCarousel();
    },

    initalCarousel: function () {
      var self = this;
      var half_imgLen = Math.floor(this.imgLen / 2);
      var leftNum, rightNum;

      var k = 0;
      for (var i = 0; i < half_imgLen; i++) {
        leftNum = this.curDisplay - i - 1;
        if(k == 0){
          this.$aImg.eq(leftNum).css({
            'z-index':10,
          }).animate({
            marginTop: -200 + 'px',
            marginLeft:400 + 'px'
          }, 300);

          rightNum = this.curDisplay + i + 1;
          if (rightNum > this.imgLen - 1) rightNum -= this.imgLen;
          this.$aImg.eq(rightNum).css({
            'z-index':20,
          }).animate({
            marginTop: -100 + 'px',
            marginLeft:200 + 'px'
          }, 0);
          k++;
        }else {
          this.$aImg.eq(leftNum).animate({
            marginTop: 0,
            marginLeft:0
          }, 0);

          rightNum = this.curDisplay + i + 1;
          if (rightNum > this.imgLen - 1) rightNum -= this.imgLen;
          this.$aImg.eq(rightNum).css({
            'z-index':50,
          });
        }
        this.$aImg.removeClass('on');
        this.$aNav.removeClass('on');
      }
      this.$aImg.eq(this.curDisplay).css({
        'z-index':50,
      }).animate({
        marginTop: 0,
        marginLeft:0
      }, 500);
      this.$aNav.eq(this.curDisplay).addClass('on');
      self.b_switch = true;
    },

    inital: function () {
      var self = this;

      this.initalCarousel();

      this.$prev.on('click', function (ev) {
        if (self.b_switch) {
          if(self.iNow-1 < 0){
            self.iNow=2;
          } else {
            self.iNow--;
          }
          self.b_switch = false;
          var index = self.iNow;
          self.movingPrev(index);
        }
      }).hover(function () {
        clearInterval(self.timer);
      }, function () {
        self.timer = setInterval(function () {
          self.play();
        }, self.interval);
      });
      this.$next.on('click', function (ev) {
        if (self.b_switch) {
          if(self.iNow+1 > 2){
            self.iNow=0;
          } else {
            self.iNow++;
          }
          self.b_switch = false;
          var index = self.iNow;
          self.movingNext(index);
        }
      }).hover(function () {
        clearInterval(self.timer);
      }, function () {
        self.timer = setInterval(function () {
          self.play();
        }, self.interval);
      });

      this.$aImg.on('click', function (ev) {
        if (self.b_switch && !$(this).hasClass('on')) {
          self.iNow = $(this).index();
          self.b_switch = false;

          var direction = self.viewWidth < ev.clientX ? 'next' : 'prev';
          var index = $(this).index();

          if (direction === 'next') {
            self.movingNext(index);
          } else {
            self.movingPrev(index);
          }
        }
      }).hover(function () {
        clearInterval(self.timer);
      }, function () {
        self.timer = setInterval(function () {
          self.play();
        }, self.interval);
      });
      this.$aNav.on('click', function(ev){
        if (self.b_switch && !$(this).hasClass('on')) {
          self.iNow = $(this).index();
          self.b_switch = false;

          var direction = self.viewWidth < ev.clientX ? 'next' : 'prev';
          var index = $(this).index();

          if (direction === 'next') {
            self.movingNext(index);
          } else {
            self.movingPrev(index);
          }
        }
      }).hover(function () {
        clearInterval(self.timer);
      }, function () {
        self.timer = setInterval(function () {
          self.play();
        }, self.interval);
      });

      this.timer = setInterval(function () {
        self.play();
      }, this.interval);

      this.$carousel.on('selectstart', function () {
        return false;
      });
    },

    constructor: Carousel
  };

  $.fn.carousel = function (options) {
    var carousel = new Carousel(this, options);

    return carousel.inital();
  };

})(jQuery, window, document, undefined);