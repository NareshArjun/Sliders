"use strict";

let sliderContainers = document.querySelectorAll(".sliders_wrap");
let containers = [];
let sliderUpButton, sliderDownButton;

const SliderContainer = function (sliderContainer, currentSlide) {
  this.sliderContainer = sliderContainer;
  this.currentSlide = currentSlide;
  //this.sliders = this.sliderContainer.querySelectorAll(".sliders");
};

SliderContainer.prototype.slideMovement = function (slidePosition) {
  this.sliders = this.sliderContainer.querySelectorAll(".sliders");
  this.sliders.forEach((slider, index) => {
    slider.style.transform = `translateY(${100 * (index - slidePosition)}%)`;
    slider.style.transition = "transform .5s";
    //slider.classList.remove("active");
    //if (index === slidePosition) slider.classList.add("active");
  });
  /*console.log(slidePosition);
  console.log(sliders[slidePosition]);
  sliders[slidePosition].classList.add("active");*/
};

SliderContainer.prototype.slideForward = function () {
  console.log("clicked button");
  //console.log("SF", currentSlide, "slideLength-1", slideLength - 1);
  if (this.currentSlide === this.sliders.length - 1) {
    this.currentSlide = 0;
  } else {
    this.currentSlide++;
  }
  slideMovement(this.currentSlide);
  //activeDot(currentSlide);
  //console.log("SF update", currentSlide);
};

SliderContainer.prototype.slideBackward = function () {
  console.log("clicked button");
  //console.log("SU", currentSlide);
  if (this.currentSlide === 0) {
    this.currentSlide = this.sliders.length - 1;
  } else {
    this.currentSlide--;
  }
  slideMovement(this.currentSlide);
  //activeDot(currentSlide);
  //console.log("SU update", currentSlide);
};

sliderContainers.forEach((sliderContainer, index) => {
  containers[index] = new SliderContainer(sliderContainer, 0);
  //containers[index] = container;
  console.log(containers);
});
/*sliderContainers.forEach((container) => {
  sliderUpButton = container.querySelector(".slider_up_button");
  sliderDownButton = container.querySelector(".slider_down_button");

  sliderDownButton.addEventListener("click", container.slideForward);
  sliderUpButton.addEventListener("click", container.slideBackward);
});*/

sliderUpButton = document.querySelectorAll(".slider_up_button");
sliderDownButton = document.querySelectorAll(".slider_down_button");

sliderUpButton.forEach((upButton) => {
  upButton.addEventListener("click", function (e) {
    console.log(e);
    //let container = e.target.offsetParent.offsetParent;
    this.sliderContainer = e.target.offsetParent.offsetParent;
    //slideBackward(container);
    console.log(this.sliderContainer);
    slideBackward;
  });
});
