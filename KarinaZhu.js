(function initTheme() {
  const stored = localStorage.getItem("theme");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const theme = stored || (prefersLight ? "light" : "dark");

  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  }
})();

document.addEventListener("DOMContentLoaded", () => {

  const projects = [
    {
      index: "01",
      name: "Pilates Circle",
      discipline: "Product Design · Founder Project",
      desc: "A mobile-first Pilates discovery experience designed to make finding, comparing and booking classes feel clearer and more personal.",
      image: "Pilates Circle.jpg",
      live: "pilates-circle.html"
    },
    {
      index: "02",
      name: "ELEMNT.STORE",
      discipline: "E-commerce Redesign · UI/UX",
      desc: "A focused redesign exploration for an independent audio brand, improving product visibility and purchase hierarchy while preserving its bold visual identity.",
      image: "ELEMNT.STORE.jpg",
      live: "elemntstore.html"
    },
    {
      index: "03",
      name: "Crossing without Crossing",
      discipline: "Experience Design · Interactive Installation",
      desc: "A travelling public installation exploring borders, surveillance and the emotional distance created by separation.",
      video: "",
      image: "Crossing without Crossing.jpg",
      live: "crossing-without-crossing.html"
    },
    {
      index: "04",
      name: "City2Surf",
      discipline: "UI/UX Design · Website",
      desc: "Turning race-day participation into real-world connection through starting waves, interests and community discovery.",
      image: "City2Surf.jpg",
      live: "city2surf.html"
    },
  ];



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
        "KARINA ZHU",
        "FOUNDER @ Pilates Circle",
        "MIDEA @ University of Sydney",
        "PRODUCT DESIGNER",
        "DIGITAL MARKETER",
      ],
      typeSpeed: 70,
      backSpeed: 40,
      backDelay: 1500,
      loop: true
    });
  }
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
  Project hover preview
  ==========================
  */

  const preview = document.getElementById("hoverPreview");
  const previewImg = document.getElementById("hoverPreviewImg");

  function movePreview(e) {
    preview.style.left = `${e.clientX + 20}px`;
    preview.style.top = `${e.clientY - 190}px`;
  }

  document.querySelectorAll(".project").forEach((item) => {
  const index = Number(item.dataset.project);
  const project = projects[index];
item.addEventListener("mouseenter", (e) => {
    previewImg.src = project.image;
    preview.classList.add("active");
    movePreview(e);

  });

  item.addEventListener("mousemove", movePreview);

  item.addEventListener("mouseleave", () => {
    preview.classList.remove("active");
  });
});


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



  /*
  ==========================
  Case study image loading
  ==========================
  */
  document.querySelectorAll(".c2s-image-frame img, .c2s-hero-media img").forEach((img) => {
    const frame = img.closest(".c2s-image-frame, .c2s-hero-media");

    const revealImage = () => {
      img.classList.add("is-loaded");
      frame?.classList.add("is-loaded");
    };

    if (img.complete && img.naturalWidth > 0) {
      requestAnimationFrame(revealImage);
    } else {
      img.addEventListener("load", revealImage, { once: true });

      img.addEventListener("error", () => {
        frame?.classList.add("is-loaded");
        const fallback = frame?.querySelector(".c2s-image-fallback");
        if (fallback) fallback.style.display = "grid";
        img.style.display = "none";
      }, { once: true });
    }
  });



  document.querySelectorAll(".csc-static, .case-study-media img").forEach((img) => {
    const show = () => img.classList.add("is-loaded");

    if (img.complete && img.naturalWidth > 0) {
      requestAnimationFrame(show);
    } else {
      img.addEventListener("load", show, { once: true });
    }
  });

});
