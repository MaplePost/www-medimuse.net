window.addEventListener("DOMContentLoaded", (event) => {
  domReady();
});

domReady = function () {
  new SmoothScroll('a[href*="#"]');
};