"use strict";

(function () {
  var sliders = document.querySelectorAll(".sliders");
  var currentSlide = 0;
  var slideLength = sliders.length;

  var dotsWrap = document.querySelector(".dots_wrapper");
  var sliderUpButton = document.querySelector(".slider_up_button");
  var sliderDownButton = document.querySelector(".slider_down_button");

  function slideMovement(slidePosition) {
    sliders.forEach((slider, index) => {
      slider.style.transform = `translateY(${100 * (index - slidePosition)}%)`;
    });
  }

  function slideForward() {
    if (currentSlide === slideLength - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    slideMovement(currentSlide);
    activeDot(currentSlide);
  }

  function slideBackward() {
    if (currentSlide === 0) {
      currentSlide = slideLength - 1;
    } else {
      currentSlide--;
    }
    slideMovement(currentSlide);
    activeDot(currentSlide);
  }

  function createDots() {
    sliders.forEach((slider, index) => {
      dotsWrap.insertAdjacentHTML(
        "beforeend",
        `<button class="dots" data-slide="${index}"></button>`
      );
    });
  }

  function activeDot(slidePosition) {
    document
      .querySelectorAll(".dots")
      .forEach((dot) => dot.classList.remove("dots_active"));
    document
      .querySelector(`.dots[data-slide="${slidePosition}"]`)
      .classList.add("dots_active");
  }

  //Assigning initial positions
  slideMovement(currentSlide);
  createDots();
  activeDot(currentSlide);

  //Movement using Buttons
  sliderDownButton.addEventListener("click", slideForward);
  sliderUpButton.addEventListener("click", slideBackward);

  //Movement using Scrolling
  for (var i = 0; i < slideLength; i++) {
    (function (i) {
      sliders[i].addEventListener("wheel", function (e) {
        if (e.deltaY > 0) {
          slideForward();
        } else if (e.deltaY < 0) {
          slideBackward();
        }
      });
    })(i);
  }

  //Movement using Dots
  dotsWrap.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots")) {
      var slideIndex = e.target.dataset.slide;
      slideMovement(slideIndex);
      activeDot(slideIndex);
    }
  });

  /*for (var i = 0; i < slideLength; i++) {
    window.addEventListener("scroll", function (e) {
      console.log(window.scrollX, window.scrollY, e);
    });
  }*/

  /*for (var i = 0; i < sliders.length; i++) {
    (function (i) {
      if (i === 0) {
        var nextSlideCoord = sliders[i + 1].getBoundingClientRect();
        var PreviousSlideCoord =
          sliders[sliders.length - 1].getBoundingClientRect();
      }
      window.addEventListener("scroll", function () {
        console.log(window.scrollY, nextSlideCoord, PreviousSlideCoord);
        window.scrollTo({
          left: nextSlideCoord.left,
          top: nextSlideCoord.top,
          behavior: "smooth",
        });
      });
    })(i);
  }*/

  /*for (var i = 0; i < slideLength; i++) {
    (function (i) {
      sliders[i].addEventListener("wheel", function (e) {
        console.log(i, sliders[i]);
        if (i === 0) {
          if (e.deltaY > 0) {
            var slideCoordinates = sliders[i + 1].getBoundingClientRect();
          } else if (e.deltaY < 0) {
            var slideCoordinates =
              sliders[sliders.length - 1].getBoundingClientRect();
          }
          console.log(
            i,
            slideCoordinates,
            sliders[i],
            window.scrollX,
            window.scrollY,
            slideCoordinates.left,
            slideCoordinates.top
          );
        }
        window.scrollTo({
          left: slideCoordinates.left,
          top: slideCoordinates.top,
        });
      });
    })(i);
  }*/

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
