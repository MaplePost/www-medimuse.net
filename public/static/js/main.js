// Remove errors for console.log
(function () {
    var method;
    var noop = function () {};
    var methods = [
      "assert",
      "clear",
      "count",
      "debug",
      "dir",
      "dirxml",
      "error",
      "exception",
      "group",
      "groupCollapsed",
      "groupEnd",
      "info",
      "log",
      "markTimeline",
      "profile",
      "profileEnd",
      "table",
      "time",
      "timeEnd",
      "timeline",
      "timelineEnd",
      "timeStamp",
      "trace",
      "warn",
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});
  
    while (length--) {
      method = methods[length];
  
      // Only stub undefined methods.
      if (!console[method]) {
        console[method] = noop;
      }
    }
  })();
  
  // Scroll tracker
  const debounce = (fn) => {
    let frame;
    return (params) => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
      frame = requestAnimationFrame(() => {
        fn(params);
      });
    };
  };
  
  window.addEventListener("DOMContentLoaded", (event) => {
    // console.log("DOM fully loaded and parsed");
    domReady();
  });
  
  domReady = function () {
    // console.log("DOM fully loaded and parsed - called start");
  
    // Set up and init SmoothScroll on link click
    new SmoothScroll('a[href*="#"]');
  
    /*
    const updateScroll = function () {
      // console.log("Scroll triggered", window.scrollY, window.innerHeight);
      document.documentElement.dataset.scroll = window.scrollY;
    };
    document.addEventListener("scroll", debounce(updateScroll), {
      passive: true,
    });
    updateScroll();
    */
  };