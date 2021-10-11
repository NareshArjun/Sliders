"use strict";

let sliderContainers = document.querySelectorAll(".sliders_wrap");

sliderContainers.forEach((sliderContainer) => {
  new SliderContainer(sliderContainer, 0);
});
