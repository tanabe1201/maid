"use strict";

var modalSwiper = new Swiper('.js-modal-slider', {
  slidesPerView: 'auto',
  centeredSlides: true,
  // effect: 'fade',
  navigation: {
    prevEl: '.js-modal--btnPrev',
    nextEl: '.js-modal--btnNext'
  },
  pagination: {
    el: '.js-modal--pagi',
    type: 'fraction',
    renderFraction: function renderFraction(currentClass, totalClass) {
      return 'Image ' + ' <span class="' + currentClass + '"></span>' + ' of ' + '<span class="' + totalClass + '"></span>';
    }
  }
});
$('.js-modal-open').on('click', function () {
  var index = $(this).index();
  modalSwiper.slideTo(index);
  $('.l-modal').fadeIn();
  $('body').addClass('is-lock');
});
$('.js-modal-close').on('click', function () {
  $('.l-modal').fadeOut();
  $('body').removeClass('is-lock');
});
$('.js-modal-close').on('click', function () {
  $('.l-modal').fadeOut();
  $('body').removeClass('is-lock');
});
var swiper03 = new Swiper('.p-chara__slider', {
  // loop: true,
  // grabCursor: true,
  effect: 'slide',
  centeredSlides: true,
  slidesPerView: 1,
  speed: 1000 // navigation: {
  //   nextEl: ".swiper-button-next",
  //   prevEl: ".swiper-button-prev",
  // },

});
swiper03.on('slideChange', function () {
  $body.attr("data-character", swiper03.realIndex + 1);
});
$(".js-chara-tab").on("click", function () {
  $('.p-chara__item--tab').removeClass('is-active');
  $(this).addClass('is-active');
  swiper03.slideTo($(this).attr("data-num"));
});
$(function () {
  //swiper 768以下で起動
  var elmIndexSwiper = document.querySelectorAll('.js-index-slider');
  var elmIndexBtnP = document.querySelectorAll('.js-slider-btnPrev');
  var elmIndexBtnN = document.querySelectorAll('.js-slider-btnNext');
  var swiper;
  $(window).on('load resize', function () {
    var w = $(window).width();

    if (w <= 768) {
      if (swiper) {
        return;
      } else {
        if (elmIndexSwiper.length > 0) {
          for (var i = 0; i < elmIndexSwiper.length; i++) {
            elmIndexSwiper[i].className += i;
            elmIndexBtnP[i].className += i;
            elmIndexBtnN[i].className += i;
            var swiper = new Swiper('.js-index-slider' + i, {
              loop: true,
              slidesPerView: "auto",
              centeredSlides: true,
              initialSlide: 0,
              grabCursor: true,
              navigation: {
                prevEl: '.js-slider-btnPrev' + i,
                nextEl: '.js-slider-btnNext' + i
              }
            });
          }
        }
      }
    } else {
      if (swiper) {
        swiper.destroy();
        swiper = undefined;
      }
    }
  });
});