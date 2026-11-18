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
      desc: "A Pilates discovery and recommendation platform helping people find classes that fit their goals, level and location — while giving studios a more relevant path to new clients.",
      image: "Pilates Circle.jpg",
      live: "pilates-circle.html"
    },
    {
      index: "02",
      name: "Crossing without Crossing",
      discipline: "Experience Design · Interactive Installation",
      desc: "A travelling public installation exploring borders, surveillance and the emotional distance created by separation — using fog, touch and live connection to make the person on the other side briefly visible again.",
      video: "",
      image: "Crossing without Crossing.jpg",
      live: "crossing-without-crossing.html"
    },
    {
      index: "03",
      name: "City2Surf",
      discipline: "UI/UX Design · Website",
      desc: "Turning race-day participation into real-world connection through starting waves, interests and community discovery.",
      image: "City2Surf.jpg",
      live: "https://www.figma.com/proto/Aj1CnPZFbpNHQB0G7zyW2Y/Interface-Design-Final-Prototype?node-id=19-17718&p=f&viewport=-134%2C-930%2C0.06&t=klb0oBT9Qfg6wygb-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=19%3A17691&page-id=0%3A1"
    },
    {
      index: "04",
      name: "Yasumo",
      discipline: "Product Design · Software Interfaces",
      desc: "Exploring how an AI companion can help young professionals manage stress, communicate emotions safely and create healthier workplace habits without disrupting existing cultural norms.",
      image: "Yasumo.jpg",
      live: "yasumo.html"
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
