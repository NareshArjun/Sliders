"use strict";

let sliderContainers = document.querySelectorAll(".sliders_wrap");

const SliderContainer = function (sliderContainer, currentSlide) {
  this.sliderContainer = sliderContainer;
  this.currentSlide = currentSlide;

  this.sliders = this.sliderContainer.querySelectorAll(".sliders");
  this.sliderUpButton = this.sliderContainer.querySelector(".slider_up_button");
  this.sliderDownButton = this.sliderContainer.querySelector(
    ".slider_down_button"
  );
  this.dotsWrap = this.sliderContainer.querySelector(".dots_wrapper");

  this.isClicked = false;
  this.initialClickedPoint = 0;
  this.clickReleasePoint = 0;
  this.distanceBetweenClicks = 0;
  this.slideNumber = 0;

  this.slideMovement(this.currentSlide);
  this.createDots();
  this.activeDot(this.currentSlide);

  this.slideForward = this.slideForward.bind(this);
  this.slideBackward = this.slideBackward.bind(this);
  this.wheelMovement = this.wheelMovement.bind(this);
  this.dotsMovement = this.dotsMovement.bind(this);
  this.mouseDownMovement = this.mouseDownMovement.bind(this);
  this.mouseUpMovement = this.mouseUpMovement.bind(this);
  this.mouseUpWindowMovement = this.mouseUpWindowMovement.bind(this);
  this.mouseMoveMovement = this.mouseMoveMovement.bind(this);

  this.sliderUpButton.addEventListener("click", this.slideBackward);
  this.sliderDownButton.addEventListener("click", this.slideForward);

  this.sliderContainer.addEventListener("wheel", this.wheelMovement);

  this.dotsWrap.addEventListener("click", this.dotsMovement);

  this.sliderContainer.addEventListener("mousedown", this.mouseDownMovement);
  this.sliderContainer.addEventListener("mouseup", this.mouseUpMovement);
  window.addEventListener("mouseup", this.mouseUpWindowMovement);
  this.sliderContainer.addEventListener("mousemove", this.mouseMoveMovement);
};

SliderContainer.prototype.slideMovement = function (slidePosition) {
  this.sliders.forEach((slider, index) => {
    slider.style.transform = `translateY(${100 * (index - slidePosition)}%)`;
    slider.style.transition = "transform .5s";
    slider.classList.remove("active");
    if (index === slidePosition) slider.classList.add("active");
  });
};

SliderContainer.prototype.slideForward = function (e) {
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

SliderContainer.prototype.mouseDownMovement = function (e) {
  this.initialClickedPoint = e.clientY;
  this.isClicked = true;
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

SliderContainer.prototype.mouseUpMovement = function (e) {
  if (this.initialClickedPoint > e.clientY) {
    if (this.slideNumber === this.sliders.length - 1) {
      this.slideMovement(this.currentSlide);
      this.activeDot(this.currentSlide);
    } else this.slideForward();
  } else if (this.initialClickedPoint < e.clientY) {
    if (this.slideNumber === 0) {
      this.slideMovement(this.currentSlide);
      this.activeDot(this.currentSlide);
    } else this.slideBackward();
  }
};

SliderContainer.prototype.mouseUpWindowMovement = function () {
  this.isClicked = false;
};

SliderContainer.prototype.mouseMoveMovement = function (e) {
  if (!this.isClicked) return;
  e.preventDefault();
  this.clickReleasePoint = e.clientY;
  this.distanceBetweenClicks =
    this.clickReleasePoint - this.initialClickedPoint;
  this.sliders[this.slideNumber].style.transform = `translateY(${
    (this.distanceBetweenClicks * 100) / e.view.innerHeight
  }%)`;
  if (this.slideNumber === 0) {
    this.sliders[this.slideNumber + 1].style.transform = `translateY(${
      (this.distanceBetweenClicks * 100) / e.view.innerHeight + 100
    }%)`;
  } else if (this.slideNumber === this.sliders.length - 1) {
    this.sliders[this.slideNumber - 1].style.transform = `translateY(${
      (this.distanceBetweenClicks * 100) / e.view.innerHeight - 100
    }%)`;
  } else {
    this.sliders[this.slideNumber + 1].style.transform = `translateY(${
      (this.distanceBetweenClicks * 100) / e.view.innerHeight + 100
    }%)`;
    this.sliders[this.slideNumber - 1].style.transform = `translateY(${
      (this.distanceBetweenClicks * 100) / e.view.innerHeight - 100
    }%)`;
  }
};

sliderContainers.forEach((sliderContainer, index) => {
  new SliderContainer(sliderContainer, 0);
});
