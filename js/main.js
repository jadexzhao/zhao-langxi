(function () {
  "use strict";

  var root = document.documentElement;
  var themeToggle = document.querySelector(".theme-toggle");
  var themeStatus = document.createElement("p");
  var storedTheme = "";

  try {
    storedTheme = window.localStorage.getItem("zhao-langxi-theme") || "";
  } catch (error) {
    storedTheme = "";
  }

  function setTheme(highContrast) {
    root.dataset.theme = highContrast ? "high-contrast" : "calm";
    if (!themeToggle) return;
    themeToggle.setAttribute("aria-pressed", String(highContrast));
    themeToggle.textContent = highContrast ? "Calm mode" : "High contrast";
    themeStatus.textContent = highContrast ? "High contrast mode on." : "Calm mode on.";
  }

  themeStatus.className = "visually-hidden";
  themeStatus.setAttribute("aria-live", "polite");
  themeStatus.setAttribute("role", "status");
  document.body.appendChild(themeStatus);
  setTheme(storedTheme === "high-contrast");

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var highContrast = root.dataset.theme !== "high-contrast";
      setTheme(highContrast);
      try {
        window.localStorage.setItem("zhao-langxi-theme", highContrast ? "high-contrast" : "calm");
      } catch (error) {
        // The control still works when storage is unavailable.
      }
    });
  }

  var conciergeForm = document.getElementById("concierge-form");
  var sanctuaryState = document.getElementById("sanctuary-state");
  if (conciergeForm && sanctuaryState) {
    conciergeForm.addEventListener("submit", function (event) {
      event.preventDefault();
      sanctuaryState.textContent = "Reflection held in this concept demo. Nothing was sent to an AI service.";
    });
    conciergeForm.addEventListener("reset", function () {
      window.setTimeout(function () {
        sanctuaryState.textContent = "Ready when you are. No microphone required.";
      }, 0);
    });
  }

  var main = document.getElementById("main");
  var skip = document.querySelector(".skip-link");
  if (skip && main) {
    skip.addEventListener("click", function () {
      main.focus({ preventScroll: true });
    });
  }

  var path = window.location.pathname.replace(/\/$/, "") || "/zhao-langxi";
  if (path.endsWith("/index.html")) {
    path = path.replace(/\/index\.html$/, "") || "/zhao-langxi";
  }

  document.querySelectorAll(".site-nav a[href]").forEach(function (link) {
    var href = (link.getAttribute("href") || "").replace(/\/$/, "");
    var match = false;
    if (href === "/zhao-langxi" || href === "/zhao-langxi/") {
      match = path === "/zhao-langxi" || path === "";
    } else if (href.indexOf("web-and-social") !== -1) {
      match = path.indexOf("web-and-social") !== -1;
    } else if (href.indexOf("question") !== -1) {
      match = path.indexOf("question") !== -1;
    } else if (href.indexOf("places") !== -1) {
      match = path.indexOf("places") !== -1;
    } else if (href.indexOf("about") !== -1) {
      match = path.indexOf("about") !== -1;
    }
    if (match) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var nodes = document.querySelectorAll(".reveal");
  if (!nodes.length) return;
  if (reduce || !("IntersectionObserver" in window)) {
    nodes.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );
  nodes.forEach(function (el) { observer.observe(el); });
})();
