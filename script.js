"use strict";

(function () {
  var sliders = document.querySelectorAll(".sliders");
  var slidersWrap = document.querySelector(".sliders_wrap");

  //Next and previous slide

  var sliderUpButton = document.querySelector(".slider_up_button");
  var sliderDownButton = document.querySelector(".slider_down_button");

  var currentSlide = 0;
  var slideLength = sliders.length;

  /*sliders.forEach(
    (slider, index) => (slider.style.transform = `translateY(${100 * index}%)`)
  );*/

  //NextSlide
  sliderDownButton.addEventListener("click", function () {
    if (currentSlide === slideLength - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    sliders.forEach(
      (slider, index) =>
        (slider.style.transform = `translateY(${
          100 * (index - currentSlide)
        }%)`)
    );
  });

  /*window.addEventListener("scroll", function () {
    console.log(window.scrollY);
  });
  console.log(sliders);*/

  /*sliders.forEach((slider, index, sliders) => {
    var nextCoord = sliders[index].getBoundingClientRect();
    window.addEventListener("scroll", function () {
      console.log(window.scrollY, nextCoord);
      window.scrollTo({
        left: nextCoord.left,
        top: nextCoord.top,
        behavior: "smooth",
      });
    });
  });*/

  /*for (var i = 0; i < sliders.length; i++) {
    (function () {
      var nextSlideCoord = sliders[i].getBoundingClientRect();
      window.addEventListener("scroll", function () {
        console.log(window.scrollY, nextSlideCoord);
        window.scrollTo(nextSlideCoord.left, nextSlideCoord.top);
      });
    })(i);
  }*/
})();
