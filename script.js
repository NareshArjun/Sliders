"use strict";

(function () {
  var sliderWrap = document.querySelector(".sliders_wrap");
  var sliders = document.querySelectorAll(".sliders");
  var currentSlide = 0,
    initialClickedPoint = 0,
    clickReleasePoint = 0,
    distanceBetweenClicks = 0,
    dataSlideNumber = 0;
  var slideLength = sliders.length;
  var isClicked = false;

  var dotsWrap = document.querySelector(".dots_wrapper");
  var sliderUpButton = document.querySelector(".slider_up_button");
  var sliderDownButton = document.querySelector(".slider_down_button");

  function slideDataAssign() {
    sliders.forEach((slider, index) => {
      slider.dataset["slideNumber"] = index;
    });
  }

  function slideMovement(slidePosition) {
    sliders.forEach((slider, index) => {
      slider.style.transform = `translateY(${100 * (index - slidePosition)}%)`;
      slider.style.transition = "transform .5s";
      slider.classList.remove("active");
      //if (index === slidePosition)
    });
    sliders[slidePosition].classList.add("active");
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
    sliders[slidePosition].classList.add("active");
  }

  //Assigning initial positions
  slideDataAssign();
  slideMovement(currentSlide);
  createDots();
  activeDot(currentSlide);

  //Movement using Buttons
  sliderDownButton.addEventListener("click", slideForward);
  sliderUpButton.addEventListener("click", slideBackward);

  //Movement using Scrolling
  sliderWrap.addEventListener("wheel", function (e) {
    if (
      e.target.classList.contains("active") ||
      e.target.offsetParent.classList.contains("active")
    ) {
      if (e.deltaY > 0) {
        slideForward();
      } else if (e.deltaY < 0) {
        slideBackward();
      }
    }
  });

  //Movement using Click and Drag
  sliderWrap.addEventListener("mousedown", function (e) {
    initialClickedPoint = e.clientY;
    isClicked = true;

    if (e.target.classList.contains("active")) {
      dataSlideNumber = e.target.dataset["slideNumber"];
    } else if (e.target.offsetParent.classList.contains("active")) {
      dataSlideNumber = e.target.offsetParent.dataset["slideNumber"];
    }
    //sliders[dataSlideNumber].style.cursor = "grabbing";
  });
  sliderWrap.addEventListener("mouseup", function (e) {
    sliders.forEach((slider) => {
      slider.style.cursor = "auto";
    });
    //sliders[dataSlideNumber].style.cursor = "grab";
    if (initialClickedPoint > e.clientY) {
      slideForward();
    } else if (initialClickedPoint < e.clientY) {
      slideBackward();
    }
  });
  window.addEventListener("mouseup", function () {
    isClicked = false;
  });
  sliderWrap.addEventListener("mousemove", function (e) {
    if (!isClicked) return;
    e.preventDefault();
    clickReleasePoint = e.clientY;
    distanceBetweenClicks = clickReleasePoint - initialClickedPoint;
    console.log(dataSlideNumber, slideLength);
    sliders[dataSlideNumber].style.transform = `translateY(${
      (distanceBetweenClicks * 100) / e.view.innerHeight
    }%)`;
    if (+dataSlideNumber === 0) {
      console.log("firstslide");
      sliders[+dataSlideNumber + 1].style.transform = `translateY(${
        (distanceBetweenClicks * 100) / e.view.innerHeight + 100
      }%)`;
      /*sliders[slideLength - 1].style.transform = `translateY(${
        (distanceBetweenClicks * 100) / e.view.innerHeight - 100
      }%)`;*/
    } else if (+dataSlideNumber === +slideLength - 1) {
      console.log("lastslide");
      sliders[dataSlideNumber - 1].style.transform = `translateY(${
        (distanceBetweenClicks * 100) / e.view.innerHeight - 100
      }%)`;
      /*sliders[0].style.transform = `translateY(${
        (distanceBetweenClicks * 100) / e.view.innerHeight + 100
      }%)`;*/
    } else {
      sliders[+dataSlideNumber + 1].style.transform = `translateY(${
        (distanceBetweenClicks * 100) / e.view.innerHeight + 100
      }%)`;
      sliders[dataSlideNumber - 1].style.transform = `translateY(${
        (distanceBetweenClicks * 100) / e.view.innerHeight - 100
      }%)`;
    }
  });

  //Movement using Dots
  dotsWrap.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots")) {
      var slideIndex = e.target.dataset.slide;
      slideMovement(slideIndex);
      activeDot(slideIndex);
    }
  });

  //Movement using Click and Drag
  /*for (var i = 0; i < slideLength; i++) {
    (function (i) {
      sliders[i].addEventListener("mousedown", function (e) {
        initialClickedPoint = e.clientY;
        isClicked = true;
        sliders[i].style.cursor = "grabbing";
        console.log("mousedown");
      });
      sliders[i].addEventListener("mouseup", function (e) {
        sliders[i].style.cursor = "grab";
        //clickReleasePoint = e.clientY;
        console.log("mouseup");
        console.log(initialClickedPoint, e.clientY);
        if (initialClickedPoint > e.clientY) {
          slideForward();
        } else if (initialClickedPoint < e.clientY) {
          slideBackward();
        }
      });
      window.addEventListener("mouseup", function () {
        isClicked = false;
        console.log("window.mouseup");
      });
      sliders[i].addEventListener("mousemove", function (e) {
        if (!isClicked) return;
        console.log("mousemove", sliders[i].getBoundingClientRect(), e.clientY);
        e.preventDefault();
        clickReleasePoint = e.clientY;
        distanceBetweenClicks = clickReleasePoint - initialClickedPoint;

        if (initialClickedPoint > clickReleasePoint) {
          sliders[i].style.transform = `translateY(${
            (distanceBetweenClicks * 100) / e.view.innerHeight
          }%)`;
          sliders[i + 1].style.transform = `translateY(${
            (distanceBetweenClicks * 100) / e.view.innerHeight + 100
          }%)`;
          sliders[i - 1].style.transform = `translateY(${
            (distanceBetweenClicks * 100) / e.view.innerHeight - 100
          }%)`;
        } else if (initialClickedPoint < clickReleasePoint) {
          sliders[i].style.transform = `translateY(${
            (distanceBetweenClicks * 100) / e.view.innerHeight
          }%)`;
          sliders[i - 1].style.transform = `translateY(${
            (distanceBetweenClicks * 100) / e.view.innerHeight - 100
          }%)`;
          sliders[i + 1].style.transform = `translateY(${
            (distanceBetweenClicks * 100) / e.view.innerHeight + 100
          }%)`;
        }
      });
    })(i);
  }*/

  //Movement using Scrolling
  /*for (var i = 0; i < slideLength; i++) {
    (function (i) {
      sliders[i].addEventListener("wheel", function (e) {
        console.log(e, e.CAPTURING_PHASE);
        if (e.deltaY > 0) {
          slideForward();
        } else if (e.deltaY < 0) {
          slideBackward();
        }
      });
    })(i);
  }*/

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
