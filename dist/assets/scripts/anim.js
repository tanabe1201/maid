"use strict";

// horizontalScroll
var horizontalScroll = function horizontalScroll() {
  var triggerSection = document.querySelector(".js-scroll-trigger");
  var listContainer = document.querySelector(".js-list-container");
  var listElement = document.querySelector(".js-list-element");
  var scrollValue = listElement.clientWidth - listContainer.clientWidth;
  gsap.to(listElement, {
    x: -scrollValue,
    ease: "none",
    scrollTrigger: {
      trigger: triggerSection,
      start: "top top",
      end: "+=".concat(scrollValue),
      scrub: true,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  });
};

horizontalScroll();