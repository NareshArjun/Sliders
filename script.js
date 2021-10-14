"use strict";

const SliderContainer = function (sliderContainer) {
  this.sliderContainer = sliderContainer;

  this.sliders = this.sliderContainer.querySelectorAll(".sliders");
  this.sliderUpButton = this.sliderContainer.querySelector(".slider_up_button");
  this.sliderDownButton = this.sliderContainer.querySelector(
    ".slider_down_button"
  );
  this.dotsWrap = this.sliderContainer.querySelector(".dots_wrapper");

  this.currentSlide = 0;
  this.isClicked = false;
  this.isMouseLeft = false;
  this.initialClickedPoint = 0;
  this.mouseMovingPoint = 0;
  this.distanceBetweenClicks = 0;
  this.clickedReleasedPoint = 0;
  this.containerHeight = 0;
  this.slideNumber = 0;

  this.slideMovement(this.currentSlide);
  this.createDots();
  this.activeDot(this.currentSlide);

  this.slideForward = this.slideForward.bind(this);
  this.slideBackward = this.slideBackward.bind(this);
  this.wheelMovement = this.wheelMovement.bind(this);
  this.dotsMovement = this.dotsMovement.bind(this);
  this.mouseDown = this.mouseDown.bind(this);
  this.mouseUpWindow = this.mouseUpWindow.bind(this);
  this.mouseUpMovement = this.mouseUpMovement.bind(this);
  this.mouseUp = this.mouseUp.bind(this);
  this.mouseMovement = this.mouseMovement.bind(this);
  this.mouseLeave = this.mouseLeave.bind(this);
  this.mouseEnter = this.mouseEnter.bind(this);

  this.sliderUpButton.addEventListener("click", this.slideBackward);
  this.sliderDownButton.addEventListener("click", this.slideForward);

  this.sliderContainer.addEventListener("wheel", this.wheelMovement);

  this.dotsWrap.addEventListener("click", this.dotsMovement);

  this.sliderContainer.addEventListener("mousedown", this.mouseDown);
  window.addEventListener("mouseup", this.mouseUpWindow);
  this.sliderContainer.addEventListener("mouseup", this.mouseUp);
  this.sliderContainer.addEventListener("mousemove", this.mouseMovement);
  this.sliderContainer.addEventListener("mouseleave", this.mouseLeave);
  this.sliderContainer.addEventListener("mouseenter", this.mouseEnter);
};

SliderContainer.prototype.slideMovement = function (slidePosition) {
  this.sliders.forEach((slider, index) => {
    slider.style.transform = `translateY(${100 * (index - slidePosition)}%)`;
    slider.style.transition = "transform .5s";
    slider.classList.remove("active");
    if (index === slidePosition) slider.classList.add("active");
  });
};

SliderContainer.prototype.slideForward = function () {
  if (this.currentSlide === this.sliders.length - 1) {
    this.currentSlide = 0;
  } else {
    this.currentSlide++;
  }
  this.slideMovement(this.currentSlide);
  this.activeDot(this.currentSlide);
};

SliderContainer.prototype.slideBackward = function () {
  if (this.currentSlide === 0) {
    this.currentSlide = this.sliders.length - 1;
  } else {
    this.currentSlide--;
  }
  this.slideMovement(this.currentSlide);
  this.activeDot(this.currentSlide);
};

SliderContainer.prototype.wheelMovement = function (e) {
  if (
    e.target.classList.contains("active") ||
    e.target.offsetParent.classList.contains("active")
  ) {
    if (e.deltaY > 0) {
      this.slideForward();
    } else if (e.deltaY < 0) {
      this.slideBackward();
    }
  }
};

SliderContainer.prototype.createDots = function () {
  this.sliders.forEach((_slider, index) => {
    this.dotsWrap.insertAdjacentHTML(
      "beforeend",
      `<button class="dots" data-slide="${index}"></button>`
    );
  });
};

SliderContainer.prototype.activeDot = function (slidePosition) {
  this.dotsWrap
    .querySelectorAll(".dots")
    .forEach((dot) => dot.classList.remove("dots_active"));
  this.dotsWrap
    .querySelector(`.dots[data-slide="${slidePosition}"]`)
    .classList.add("dots_active");
};

SliderContainer.prototype.dotsMovement = function (e) {
  if (e.target.classList.contains("dots")) {
    this.currentSlide = +e.target.dataset.slide;
    this.slideMovement(this.currentSlide);
    this.activeDot(this.currentSlide);
  }
};

SliderContainer.prototype.mouseDown = function (e) {
  e.preventDefault();
  this.initialClickedPoint = e.clientY;
  this.isClicked = true;
  this.containerHeight = e.view.innerHeight;
  if (e.target.classList.contains("active")) {
    this.slideNumber = +(
      Array.prototype.indexOf.call(e.target.parentElement.children, e.target) -
      3
    ); // 3 => 2 buttons and 1 dots wrapper
  } else if (e.target.offsetParent.classList.contains("active")) {
    this.slideNumber = +(
      Array.prototype.indexOf.call(
        e.target.offsetParent.parentElement.children,
        e.target.offsetParent
      ) - 3
    ); // 3 => 2 buttons and 1 dots wrapper
  }
};

SliderContainer.prototype.mouseUpWindow = function (e) {
  this.isClicked = false;
};

SliderContainer.prototype.mouseUpMovement = function () {
  if (this.initialClickedPoint > this.clickedReleasedPoint) {
    if (
      this.slideNumber === this.sliders.length - 1 ||
      this.distanceBetweenClicks > -(0.1 * this.containerHeight)
    ) {
      this.slideMovement(this.currentSlide);
      this.activeDot(this.currentSlide);
    } else this.slideForward();
  } else if (this.initialClickedPoint < this.clickedReleasedPoint) {
    if (
      this.slideNumber === 0 ||
      this.distanceBetweenClicks < 0.1 * this.containerHeight
    ) {
      this.slideMovement(this.currentSlide);
      this.activeDot(this.currentSlide);
    } else this.slideBackward();
  }
};

SliderContainer.prototype.mouseUp = function (e) {
  this.clickedReleasedPoint = e.clientY;
  this.mouseUpMovement();
};

SliderContainer.prototype.mouseMovement = function (e) {
  if (!this.isClicked) return;
  e.preventDefault();
  this.mouseMovingPoint = e.clientY;
  this.distanceBetweenClicks = this.mouseMovingPoint - this.initialClickedPoint;
  this.sliders[this.slideNumber].style.transform = `translateY(${
    (this.distanceBetweenClicks * 100) / this.containerHeight
  }%)`;
  if (this.slideNumber === 0) {
    this.sliders[this.slideNumber + 1].style.transform = `translateY(${
      (this.distanceBetweenClicks * 100) / this.containerHeight + 100
    }%)`;
  } else if (this.slideNumber === this.sliders.length - 1) {
    this.sliders[this.slideNumber - 1].style.transform = `translateY(${
      (this.distanceBetweenClicks * 100) / this.containerHeight - 100
    }%)`;
  } else {
    this.sliders[this.slideNumber + 1].style.transform = `translateY(${
      (this.distanceBetweenClicks * 100) / this.containerHeight + 100
    }%)`;
    this.sliders[this.slideNumber - 1].style.transform = `translateY(${
      (this.distanceBetweenClicks * 100) / this.containerHeight - 100
    }%)`;
  }
};

/*SliderContainer.prototype.mouseLeave = function (e) {
  if (!this.isClicked) return;
  e.preventDefault();
  console.log("leave", e);
  console.log(this);
  document.addEventListener("mouseup", () => {
    this.isClicked = false;
    console.log("document", this);
    if (this.initialClickedPoint > this.clickedReleasedPoint) {
      if (
        this.slideNumber === this.sliders.length - 1 ||
        this.distanceBetweenClicks > -(0.1 * this.containerHeight)
      ) {
        this.slideMovement(this.currentSlide);
        this.activeDot(this.currentSlide);
      } else this.slideForward();
    } else if (this.initialClickedPoint < this.clickedReleasedPoint) {
      if (
        this.slideNumber === 0 ||
        this.distanceBetweenClicks < 0.1 * this.containerHeight
      ) {
        this.slideMovement(this.currentSlide);
        this.activeDot(this.currentSlide);
      } else this.slideBackward();
    }
    document.removeEventListener("mouseup", () => {
      this.isClicked = false;
    });
  });
};*/

SliderContainer.prototype.mouseLeave = function (e) {
  if (!this.isClicked) return;
  this.isMouseLeft = true;
  this.clickedReleasedPoint = e.clientY;
  var mouseUpInLeave = mouseUpInLeave.bind(this);
  document.addEventListener("mouseup", mouseUpInLeave);

  function mouseUpInLeave() {
    if (!this.isMouseLeft) return;
    this.mouseUpMovement();
    this.isMouseLeft = false;
    document.removeEventListener("mouseup", mouseUpInLeave);
  }
};

SliderContainer.prototype.mouseEnter = function (e) {
  this.isMouseLeft = false;
};
