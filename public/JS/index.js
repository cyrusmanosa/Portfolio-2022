(function () {
  var slider = document.getElementById("slider");
  if (!slider) return;

  var track = slider.querySelector("ul");
  var slides = Array.prototype.slice.call(track.children);
  var index = 0;
  var timer = null;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var dots = document.createElement("div");
  dots.className = "slider-dots";
  slides.forEach(function (_, i) {
    var button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", "Show photo " + (i + 1));
    button.addEventListener("click", function () {
      go(i);
      restart();
    });
    dots.appendChild(button);
  });
  slider.appendChild(dots);

  function size() {
    var width = slider.clientWidth;
    slides.forEach(function (slide) {
      slide.style.width = width + "px";
    });
    track.style.transform = "translateX(-" + index * width + "px)";
  }

  function go(next) {
    index = (next + slides.length) % slides.length;
    track.style.transform = "translateX(-" + index * slider.clientWidth + "px)";
    Array.prototype.forEach.call(dots.children, function (dot, i) {
      if (i === index) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  }

  function restart() {
    if (timer) clearInterval(timer);
    if (reduceMotion) return;
    timer = setInterval(function () {
      go(index + 1);
    }, 4500);
  }

  slider.querySelector(".control_next").addEventListener("click", function () {
    go(index + 1);
    restart();
  });

  slider.querySelector(".control_prev").addEventListener("click", function () {
    go(index - 1);
    restart();
  });

  slider.addEventListener("mouseenter", function () {
    if (timer) clearInterval(timer);
  });

  slider.addEventListener("mouseleave", restart);

  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") go(index + 1);
    if (event.key === "ArrowLeft") go(index - 1);
  });

  window.addEventListener("resize", size);
  size();
  go(0);
  restart();
})();
