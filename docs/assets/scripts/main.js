'use strict';

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var $body = $("body");
$('.js-draw--trigger').on('click', function () {
  $('.js-draw--trigger').toggleClass('is-active');
  $('.js-draw--content').toggleClass('is-active');
  $('.js-draw--bg').toggleClass('is-active'); // $('body').toggleClass('lock');
});
$('a[href^="#"]').on('click', function () {
  var href = $(this).attr('href');
  var position = $(href).offset().top;
  $('html, body').animate({
    'scrollTop': position
  }, 500);
  return false;
});
$(window).scroll(function () {
  if ($(window).scrollTop() > 600) {
    $('.sc-inview').addClass('is-anim');
  } else {
    $('.sc-inview').removeClass('is-anim');
  }
});
$("a[href*='http://']:not([href*='" + location.hostname + "']),[href*='https://']:not([href*='" + location.hostname + "'])").attr('target', '_blank').addClass('blank');
var onLoad = document.getElementsByClassName("onload");
window.addEventListener('load', function () {
  setTimeout(function () {
    for (var i = 0; i < onLoad.length; i++) {
      onLoad[i].classList.add("open");
    }
  }, 600);
  setTimeout(function () {
    document.querySelector("body").classList.toggle("scroll_on");
  }, 800);
});
document.addEventListener('DOMContentLoaded', function () {
  {
    var toggleAccordion = function toggleAccordion() {
      var items = document.querySelectorAll('.js-acc--content');
      var thisItem = this.parentNode;
      items.forEach(function (item) {
        if (thisItem == item) {
          thisItem.classList.toggle('is-active');
          return;
        }

        item.classList.remove('is-active');
      });
    };

    var accSingleTriggers = document.querySelectorAll('.js-acc--trigger');
    accSingleTriggers.forEach(function (trigger) {
      return trigger.addEventListener('click', toggleAccordion);
    });
  }
  {
    var el = document.querySelectorAll('.inview');
    var els = Array.prototype.slice.call(el);

    var cb = function cb(entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // setTimeout(() => {
          entry.target.classList.add('is-anim'); // }, 100);
        } else {}
      });
    };

    var options = {
      root: null,
      rootMargin: '-15% 0px',
      threshold: 0
    };
    var io = new IntersectionObserver(cb, options);
    els.forEach(function (el) {
      return io.observe(el);
    });
  }
  {
    var _el = document.querySelectorAll('.animate-heading');

    var _els = Array.prototype.slice.call(_el);

    var _cb = function _cb(entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('inview'); // setTimeout(() => {
          // }, 600);
        } else {// entry.target.classList.remove('inview');
        }
      });
    };

    var _options = {
      root: null
    };

    var _io = new IntersectionObserver(_cb, _options);

    _els.forEach(function (el) {
      return _io.observe(el);
    });

    var _iterator = _createForOfIteratorHelper(_els),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _el2 = _step.value;

        var chars = _el2.innerHTML.trim().split("");

        _el2.innerHTML = chars.reduce(function (acc, curr) {
          curr = curr.replace(/\s+/, '&nbsp;');
          return "".concat(acc, "<span class=\"char\">").concat(curr, "</span>");
        }, "");
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
});

(function () {
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame;
  var canvas = document.querySelector("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var ctx = canvas.getContext("2d");
  ctx.globalCompositeOperation = "source-over";
  var particles = [];
  var pIndex = 0;
  var x, y, frameId;

  function Dot(x, y, vx, vy, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    particles[pIndex] = this;
    this.id = pIndex;
    pIndex++;
    this.life = 0;
    this.maxlife = 600;
    this.degree = getRandom(0, 360); //開始角度をずらす

    this.size = Math.floor(getRandom(15, 25)); //紙吹雪のサイズに変化をつける
  }

  ;

  Dot.prototype.draw = function (x, y) {
    this.degree += 1;
    this.vx *= 0.99; //重力

    this.vy *= 0.999; //重力

    this.x += this.vx + Math.cos(this.degree * Math.PI / 180); //蛇行

    this.y += this.vy;
    this.width = this.size;
    this.height = Math.cos(this.degree * Math.PI / 45) * this.size; //高さを変化させて、回転させてるっぽくみせる
    //紙吹雪の描写

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.x + this.x / 2, this.y + this.y / 2);
    ctx.lineTo(this.x + this.x / 2 + this.width / 2, this.y + this.y / 2 + this.height);
    ctx.lineTo(this.x + this.x / 2 + this.width + this.width / 2, this.y + this.y / 2 + this.height);
    ctx.lineTo(this.x + this.x / 2 + this.width, this.y + this.y / 2);
    ctx.closePath();
    ctx.fill();
    this.life++; //lifeがなくなったら紙吹雪を削除

    if (this.life >= this.maxlife) {
      delete particles[this.id];
    }
  }; //リサイズ処理


  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    x = canvas.width / 2;
    y = canvas.height / 2;
  });

  function loop() {
    //全画面に色をしく。透過率をあげると残像が強くなる
    ctx.clearRect(0, 0, canvas.width, canvas.height); //紙吹雪の量の調節

    if (frameId % 8 == 0) {
      new Dot(canvas.width * Math.random() - canvas.width + canvas.width / 2 * Math.random(), -canvas.height / 2, getRandom(1, 3), getRandom(2, 4), "#ED1A3D");
      new Dot(canvas.width * Math.random() + canvas.width - canvas.width * Math.random(), -canvas.height / 2, -1 * getRandom(1, 3), getRandom(2, 4), "#BD9F6D");
    }

    for (var i in particles) {
      particles[i].draw();
    }

    frameId = requestAnimationFrame(loop);
  }

  loop();

  function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }
})();