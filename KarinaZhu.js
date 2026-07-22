(function initTheme() {
  const stored = localStorage.getItem("theme");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const theme = stored || (prefersLight ? "light" : "dark");

  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  }
})();

document.addEventListener("DOMContentLoaded", () => {

  /*
  ==========================
  Loader
  ==========================
  */

  const loader = document.getElementById("loader");
  const loaderText = document.querySelector(".loader-text");
  const hero = document.querySelector(".hero");

  const loadingMessages = [
    "Welcome to Karina Zhu's design world.",
    "Crafting meaningful experiences.",
    "Designing beyond pixels.",
    "Turning ideas into interactions.",
    "Creating with purpose.",
    "Almost there..."
  ];

  let loadingIndex = 0;

  function rotateLoadingText() {
    if (!loaderText) return;

    loaderText.style.opacity = 0;

    setTimeout(() => {
      loaderText.textContent = loadingMessages[loadingIndex];
      loaderText.style.opacity = 1;
      loadingIndex = (loadingIndex + 1) % loadingMessages.length;
    }, 300);
  }

  rotateLoadingText();

  const loadingInterval = setInterval(rotateLoadingText, 1500);

  const MIN_LOADING_TIME = 2200;
  const startTime = Date.now();

  function finishLoading() {
    clearInterval(loadingInterval);

    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, MIN_LOADING_TIME - elapsed);

    setTimeout(() => {
      loader?.classList.add("hidden");
      hero?.classList.add("hero-ready");
    }, remaining);
  }

  if (document.readyState === "complete") {
    finishLoading();
  } else {
    window.addEventListener("load", finishLoading);
  }

  setTimeout(finishLoading, 4000);


  /*
  ==========================
  Theme toggle
  ==========================
  */

  const themeToggle = document.getElementById("themeToggle");

  function setPressedState() {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    themeToggle?.setAttribute("aria-pressed", String(isLight));
    themeToggle?.setAttribute(
      "aria-label",
      isLight ? "Switch to dark mode" : "Switch to light mode"
    );
  }

  setPressedState();

  themeToggle?.addEventListener("click", () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";

    if (isLight) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }

    setPressedState();
  });


  /*
  ==========================
  Rotating identity text (Typed.js)
  ==========================
  */

  if (window.Typed && document.querySelector(".rn-text")) {
    new Typed(".rn-text", {
      strings: [
        "Creative",
        "Product Designer",
        "Matcha Lover",
        "Photographer"
      ],
      typeSpeed: 70,
      backSpeed: 40,
      backDelay: 1500,
      loop: true
    });
  }


  /*
  ==========================
  Archive stacks
  ==========================
  */

  function initStacks() {
    const stacks = document.querySelectorAll(".stack[data-stack]");
    const drawer = document.getElementById("stack-drawer");

    if (!stacks.length || !drawer) return;

    function closeDrawer() {
      drawer.classList.remove("open");
      drawer.innerHTML = "";
    }

    function openDrawer(stack) {
      const label = stack.querySelector(".stack-label")?.textContent ?? "";
      const images = Array.from(
        stack.querySelectorAll(".stack-layer img, .stack-cover img")
      ).map((img) => img.getAttribute("src"));

      const items = images
        .map(
          (src) =>
            `<div class="stack-drawer__item"><img src="${src}" alt="" loading="lazy"></div>`
        )
        .join("");

      drawer.innerHTML = `
        <h3 class="stack-drawer__heading">${label}</h3>
        <div class="stack-drawer__grid">${items}</div>
      `;

      drawer.classList.add("open");
    }

    function toggleStack(stack) {
      const isOpen = stack.getAttribute("aria-pressed") === "true";

      stacks.forEach((s) => s.setAttribute("aria-pressed", "false"));

      if (isOpen) {
        closeDrawer();
        return;
      }

      stack.setAttribute("aria-pressed", "true");
      openDrawer(stack);
    }

    stacks.forEach((stack) => {
      stack.addEventListener("click", () => toggleStack(stack));

      stack.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleStack(stack);
        }
      });
    });
  }

  initStacks();


  /*
  ==========================
  Hero tile hover popup
  ==========================
  */

  const heroTilePopup = document.getElementById("heroTilePopup");
  const heroTilePopupText = document.getElementById("heroTilePopupText");

  function moveHeroPopup(e) {
    if (!heroTilePopup) return;

    const offset = 18;
    const rect = heroTilePopup.getBoundingClientRect();
    let left = e.clientX + offset;
    let top = e.clientY + offset;

    if (left + rect.width > window.innerWidth - 12) {
      left = e.clientX - rect.width - offset;
    }

    if (top + rect.height > window.innerHeight - 12) {
      top = e.clientY - rect.height - offset;
    }

    heroTilePopup.style.left = `${left}px`;
    heroTilePopup.style.top = `${top}px`;
  }

  document.querySelectorAll(".hero-tile").forEach((tile) => {
    tile.addEventListener("mouseenter", (e) => {
      const caption = tile.dataset.caption?.trim();

      heroTilePopupText.textContent = caption || "default";
      heroTilePopup?.classList.add("active");
      moveHeroPopup(e);
    });

    tile.addEventListener("mousemove", moveHeroPopup);

    tile.addEventListener("mouseleave", () => {
      heroTilePopup?.classList.remove("active");
    });
  });


  /*
  ==========================
  Navigation
  ==========================
  */

  const nav = document.querySelector(".nav");

  function updateNavState() {
    nav?.classList.toggle("scrolled", window.scrollY > 20);
  }

  window.addEventListener("scroll", updateNavState);
  updateNavState();


  /*
  ==========================
  Copy Email
  ==========================
  */

  const copyEmail = document.getElementById("copyEmail");
  const copyEmailText = document.getElementById("copyEmailText");

  copyEmail?.addEventListener("click", async () => {
    const email = copyEmail.dataset.copy;

    await navigator.clipboard.writeText(email);

    copyEmailText.textContent = "Copied!";

    setTimeout(() => {
      copyEmailText.textContent = email;
    }, 1600);
  });


  /*
  ==========================
  Reveal Animation
  ==========================
  */

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal").forEach((el) => {
    observer.observe(el);
  });

});
