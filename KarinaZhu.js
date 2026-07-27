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
      video: "A3 video.mp4",
      live:"https://your-link.com"
    },

    {
      index: "02",
      name: "City2Surf",
      discipline: "UI/UX Design · Website",
      desc: "City2Surf attracts thousands of participants each year, but large-scale events rarely create meaningful social connections. This project explores how digital interactions can become real-world engagement through a platform that helps runners discover like-minded participants, build communities before race day, and strengthen the event experience.",
      image: "City2Surf.jpg",
      live:"https://www.figma.com/proto/Aj1CnPZFbpNHQB0G7zyW2Y/Interface-Design-Final-Prototype?node-id=0-1&t=e66c6xBprdMVhdn7-1"
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
      video: "video 3.mp4",
      live:"https://your-link.com"
    },
  ];



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
        "Karina Zhu",
        "MIDEA Graduate @ USYD",
        "Product Designer",
        "Digital Marketer",
        "Content Creator",
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
    const stacks = document.querySelectorAll(".stack");
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
  Modal
  ==========================
  */

  const overlay = document.getElementById("modalOverlay");
  const modalVideo = document.getElementById("modalVideo");
  const modalIndex = document.getElementById("modalIndex");
  const modalTag = document.getElementById("modalTag");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalLive = document.getElementById("modalLive");
  const modalClose = document.getElementById("modalClose");
  const modalPrev = document.getElementById("modalPrev");
  const modalNext = document.getElementById("modalNext");

  let currentIndex = 0;

  function renderModal() {
    const project = projects[currentIndex];

    modalVideo.src = project.video;
modalVideo.load();
    modalIndex.textContent = project.index;
    modalTag.textContent = project.discipline;
    modalLive.href = project.live || "#";
    modalTitle.textContent = project.name;
    modalDesc.textContent = project.desc;

    modalPrev.disabled = currentIndex === 0;
    modalNext.disabled = currentIndex === projects.length - 1;
  }

  function openModal(index) {
    currentIndex = index;
    renderModal();
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  function previousProject() {
    if (currentIndex > 0) {
      currentIndex--;
      renderModal();
    }
  }

  function nextProject() {
    if (currentIndex < projects.length - 1) {
      currentIndex++;
      renderModal();
    }
  }

  modalClose?.addEventListener("click", closeModal);
  modalPrev?.addEventListener("click", previousProject);
  modalNext?.addEventListener("click", nextProject);

  overlay?.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("open")) return;

    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") previousProject();
    if (e.key === "ArrowRight") nextProject();
  });


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

    item.addEventListener("click", () => openModal(index));

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
