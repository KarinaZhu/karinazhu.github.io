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
      name: "Crossing without Crossing",
      discipline: "Experience Design · Interactive Installation",
      desc: "A border begins as a line on a map, becomes a wall, and eventually becomes a story people inherit about who belongs and who does not. This project reframes the role of design. Not as a tool to remove borders, but as a way to momentarily disrupt the emotional distance they create and reveal the humanity that still exists on the other side.",
      // NOTE: replace with the real Vimeo numeric ID for this project (not a local filename).
      // e.g. video: "123456789"
      video: "",
      image: "Crossing without Crossing.jpg",
      live:"https://your-link.com"
    },

    {
      index: "02",
      name: "City2Surf",
      discipline: "UI/UX Design · Website",
      desc: "City2Surf attracts thousands of participants each year, but large-scale events rarely create meaningful social connections. This project explores how digital interactions can become real-world engagement through a platform that helps runners discover like-minded participants, build communities before race day, and strengthen the event experience.",
      image: "City2Surf.jpg",
      live:"https://www.figma.com/proto/Aj1CnPZFbpNHQB0G7zyW2Y/Interface-Design-Final-Prototype?node-id=19-17718&p=f&viewport=-134%2C-930%2C0.06&t=klb0oBT9Qfg6wygb-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=19%3A17691&page-id=0%3A1"
    },
    {
      index: "03",
      name: "Yasumo",
      discipline: "Product Design · Software Interfaces",
      desc: "Japanese workplaces are often designed to maximise productivity rather than wellbeing. This project explores how an AI companion can help young professionals manage stress, communicate emotions safely, and create healthier workplace habits without disrupting existing cultural norms.",
      image: "Yasumo.jpg",
      live:"https://your-link.com"
    },
    {
      index: "04",
      name: "The Underwater Metropolis of 2100",
      discipline: "3D Modeling · Game Design",
      desc: "This project explores how computational design can move beyond architecture to create interactive worlds. Using Grasshopper-based parametric modelling, marine biology, and speculative fiction, it develops a living underwater city where every structure contributes to environmental storytelling and gameplay.",
      // This is the Vimeo ID that was previously hardcoded into the iframe in index.html.
      video: "1213190724",
      image: "The Underwater Metropolis.jpg",
      live:"https://your-link.com"
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

});
