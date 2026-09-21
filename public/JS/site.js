(function () {
  var year = document.getElementById("year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
  }

  document.querySelectorAll(".menu-label").forEach(function (button) {
    button.addEventListener("click", function () {
      var item = button.parentElement;
      var open = item.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(open));
    });
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".site-header")) {
      if (nav) nav.classList.remove("is-open");
      if (toggle) {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      }
    }
  });
})();
