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
  this.dotsWrap = this.sliderContainer.querySelector(".dots_wrapper");

  this.isClicked = false;
  this.initialClickedPoint = 0;
  this.clickReleasePoint = 0;
  this.distanceBetweenClicks = 0;
  this.slideNumber = 0;

  this.slideMovement(this.currentSlide);
  this.createDots();
  this.activeDot(this.currentSlide);
  console.log("this", this, "this.sliderContainer", this.sliderContainer);

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

  /*this.sliderContainer.addEventListener("click", (e) => {
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
        this.slideForward();
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
  this.activeDot(this.currentSlide);
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
  this.activeDot(this.currentSlide);
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
  console.log(e);
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
  console.log(this.slideNumber);
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
    console.log("firstslide");
    this.sliders[this.slideNumber + 1].style.transform = `translateY(${
      (this.distanceBetweenClicks * 100) / e.view.innerHeight + 100
    }%)`;
    /*sliders[slideLength - 1].style.transform = `translateY(${
      (distanceBetweenClicks * 100) / e.view.innerHeight - 100
    }%)`;*/
  } else if (this.slideNumber === this.sliders.length - 1) {
    console.log("lastslide");
    this.sliders[this.slideNumber - 1].style.transform = `translateY(${
      (this.distanceBetweenClicks * 100) / e.view.innerHeight - 100
    }%)`;
    /*sliders[0].style.transform = `translateY(${
      (distanceBetweenClicks * 100) / e.view.innerHeight + 100
    }%)`;*/
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
