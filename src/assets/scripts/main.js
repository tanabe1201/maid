'use strict';

var $body = $("body");

$('.js-draw--trigger').on('click', function () {
  $('.js-draw--trigger').toggleClass('is-active');
  $('.js-draw--content').toggleClass('is-active');
  $('.js-draw--bg').toggleClass('is-active');
  // $('body').toggleClass('lock');
})

$('a[href^="#"]').on('click', function () {
  const href = $(this).attr('href');
  const position = $(href).offset().top;
  $('html, body').animate({
    'scrollTop': position
  }, 500);
  return false;
})

$(window).scroll(function () {
  if ($(window).scrollTop() > 600) {
    $('.sc-inview').addClass('is-anim');
  } else {
    $('.sc-inview').removeClass('is-anim');
  }
})

$("a[href*='http://']:not([href*='" + location.hostname + "']),[href*='https://']:not([href*='" + location.hostname + "'])").attr('target', '_blank').addClass('blank');

const onLoad = document.getElementsByClassName("onload");

window.addEventListener('load', function(){
  setTimeout(function(){
    for(let i =0; i< onLoad.length; i++){
      onLoad[i].classList.add("open");
    }
  },600);
  setTimeout(function(){
    document.querySelector("body").classList.toggle("scroll_on");
  },800);
});  


document.addEventListener('DOMContentLoaded', function () {

  {
    const accSingleTriggers = document.querySelectorAll('.js-acc--trigger');

    accSingleTriggers.forEach(trigger => trigger.addEventListener('click', toggleAccordion));

    function toggleAccordion() {
      const items = document.querySelectorAll('.js-acc--content');
      const thisItem = this.parentNode;

      items.forEach(item => {
        if (thisItem == item) {
          thisItem.classList.toggle('is-active');
          return;
        }
        item.classList.remove('is-active');
      });
    }
  }

  {
    const el = document.querySelectorAll('.inview');
    const els = Array.prototype.slice.call(el);

    const cb = function (entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // setTimeout(() => {
          entry.target.classList.add('is-anim');
          // }, 100);
        } else {}
      });
    }

    const options = {
      root: null,
      rootMargin: '-15% 0px',
      threshold: 0
    };
    const io = new IntersectionObserver(cb, options);
    els.forEach(el => io.observe(el));
  }

  {
    const el = document.querySelectorAll('.animate-heading');
    const els = Array.prototype.slice.call(el);

    const cb = function (entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {

          entry.target.classList.add('inview');
          // setTimeout(() => {
          // }, 600);
        } else {
          // entry.target.classList.remove('inview');
        }
      });
    }

    const options = {
      root: null,
    };

    const io = new IntersectionObserver(cb, options);
    els.forEach(el => io.observe(el));

    for (let el of els) {
      const chars = el.innerHTML.trim().split("");

      el.innerHTML = chars.reduce((acc, curr) => {
        curr = curr.replace(/\s+/, '&nbsp;');
        return `${acc}<span class="char">${curr}</span>`;
      }, "");
    }
  }
});

(function(){

  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame;

  var canvas = document.querySelector("canvas");
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight;
  var ctx = canvas.getContext("2d");
  ctx.globalCompositeOperation = "source-over";
  var particles = [];
  var pIndex = 0;
  var x, y, frameId;

  function Dot(x,y,vx,vy,color){
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
    this.degree = getRandom(0,360);//開始角度をずらす
    this.size = Math.floor(getRandom(15,25));//紙吹雪のサイズに変化をつける
  };

  Dot.prototype.draw = function(x, y){

    this.degree += 1;
    this.vx *= 0.99;//重力
    this.vy *= 0.999;//重力
    this.x += this.vx+Math.cos(this.degree*Math.PI/180);//蛇行
    this.y += this.vy;
    this.width = this.size;
    this.height = Math.cos(this.degree*Math.PI/45)*this.size;//高さを変化させて、回転させてるっぽくみせる
    //紙吹雪の描写
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.x+this.x/2, this.y+this.y/2);
    ctx.lineTo(this.x+this.x/2+this.width/2, this.y+this.y/2+this.height);
    ctx.lineTo(this.x+this.x/2+this.width+this.width/2, this.y+this.y/2+this.height);
    ctx.lineTo(this.x+this.x/2+this.width, this.y+this.y/2);
    ctx.closePath();
    ctx.fill();
    this.life++;
    //lifeがなくなったら紙吹雪を削除
    if(this.life >= this.maxlife){
      delete particles[this.id];
    }
  }
//リサイズ処理
  window.addEventListener("resize", function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    x = canvas.width / 2;
    y = canvas.height / 2;
  });

  function loop(){
    //全画面に色をしく。透過率をあげると残像が強くなる
    ctx.clearRect(0,0, canvas.width, canvas.height);
    //紙吹雪の量の調節
    if(frameId % 8 == 0) {
        new Dot(canvas.width*Math.random()-canvas.width+canvas.width/2*Math.random(), -canvas.height/2, getRandom(1, 3),  getRandom(2, 4),"#ED1A3D");
        new Dot(canvas.width*Math.random()+canvas.width-canvas.width*Math.random(), -canvas.height/2,  -1 * getRandom(1, 3),  getRandom(2, 4),"#BD9F6D");
    }
    for(var i in particles){
      particles[i].draw();
    }
    frameId = requestAnimationFrame(loop);
  }

  loop();

  function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }

})();


