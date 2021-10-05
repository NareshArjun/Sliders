"use strict";

let sliderContainers = document.querySelectorAll(".sliders_wrap");
let containers = [];
//let sliders;
//let sliderUpButton, sliderDownButton;

const SliderContainer = function (sliderContainer, currentSlide) {
  this.sliderContainer = sliderContainer;
  this.currentSlide = currentSlide;
  this.sliders = this.sliderContainer.querySelectorAll(".sliders");
  this.sliderUpButton = this.sliderContainer.querySelector(".slider_up_button");
  this.sliderDownButton = this.sliderContainer.querySelector(
    ".slider_down_button"
  );
  this.dotsWrap = this.sliderContainer.querySelector("dots_wrapper");

  this.slideMovement(this.currentSlide);
  console.log("this", this);

  this.slideForward = this.slideForward.bind(this);
  this.slideBackward = this.slideBackward.bind(this);
  this.wheelMovement = this.wheelMovement.bind(this);

  this.sliderUpButton.addEventListener("click", this.slideBackward);
  this.sliderDownButton.addEventListener("click", this.slideForward);

  this.sliderContainer.addEventListener("wheel", this.wheelMovement);

  /*this.sliderContainer.addEventListener("click", function (e) {
    console.log(e.target.offsetParent);
    console.log("this", this);
    console.log(this.slideForward);

    if (e.target.offsetParent.classList.contains("movement_button")) {
      console.log("clicked");
      if (e.target.offsetParent.classList.contains("slider_up_button")) {
        //this.slideBackward;
      } else if (
        e.target.offsetParent.classList.contains("slider_down_button")
      ) {
        console.log("clicked");
        this.slideForward;
        //this.slideForward.bind(this);
        //this.sliderContainer.slideForward() = this.sliderContainer.slideForward.bind(this);
      }
    }
  });*/

  /*this.handleEvent = function (e) {
    /*switch (e.type) {
      case "click":
    if (e.target.offsetParent.classList.contains("movement_button")) {
      console.log("clicked");
      if (e.target.offsetParent.classList.contains("slider_up_button")) {
        this.slideBackward();
      } else if (
        e.target.offsetParent.classList.contains("slider_down_button")
      ) {
        console.log("clicked");
        this.slideForward();
        //this.slideForward.bind(this);
        //this.sliderContainer.slideForward() = this.sliderContainer.slideForward.bind(this);
      }
    }
    //break;
    //}
  };
  this.sliderContainer.addEventListener("click", this);*/
  //this.sliderContainer.removeEventListener("click", this);
};

SliderContainer.prototype.slideMovement = function (slidePosition) {
  //sliders = this.sliderContainer.querySelectorAll(".sliders");
  this.sliders.forEach((slider, index) => {
    slider.style.transform = `translateY(${100 * (index - slidePosition)}%)`;
    slider.style.transition = "transform .5s";
    slider.classList.remove("active");
    if (index === slidePosition) slider.classList.add("active");
  });
  /*console.log(slidePosition);
  console.log(sliders[slidePosition]);
  sliders[slidePosition].classList.add("active");*/
};

SliderContainer.prototype.slideForward = function (e) {
  console.log("clicked button");
  //console.log("SF", currentSlide, "slideLength-1", slideLength - 1);
  if (this.currentSlide === this.sliders.length - 1) {
    this.currentSlide = 0;
  } else {
    this.currentSlide++;
  }
  this.slideMovement(this.currentSlide);
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
  this.slideMovement(this.currentSlide);
  //activeDot(currentSlide);
  //console.log("SU update", currentSlide);
};

SliderContainer.prototype.wheelMovement = function (e) {
  console.log(e);
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
  this.dotsWrap.forEach((dot) => dot.classList.remove("dots_active"));
  document
    .querySelector(`.dots[data-slide="${slidePosition}"]`)
    .classList.add("dots_active");
};
SliderContainer.prototype.dotsMovement = function () {};

sliderContainers.forEach((sliderContainer, index) => {
  containers[index] = new SliderContainer(sliderContainer, 0);
  //containers[index] = container;
  console.log(containers);
  /*sliderContainer.addEventListener("click", function (e) {
    console.log(e.target.offsetParent);
    if (e.target.offsetParent.classList.contains("movement_button")) {
      console.log("clicked");
    }
  });*/
});
/*sliderContainers.forEach((container) => {
  sliderUpButton = container.querySelector(".slider_up_button");
  sliderDownButton = container.querySelector(".slider_down_button");

  sliderDownButton.addEventListener("click", container.slideForward);
  sliderUpButton.addEventListener("click", container.slideBackward);
});*/

/*sliderUpButton = document.querySelectorAll(".slider_up_button");
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
});*/

/*this.sliderContainer.addEventListener("click", function (e) {
  console.log(e);
  if (e.target.classList.contains("movement_button")) {
    console.log("clicked");
  }
});*/
