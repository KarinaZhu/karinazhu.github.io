document.addEventListener("DOMContentLoaded", () => {
  const splineSceneUrl = "https://prod.spline.design/Mz42hrAEZjrkZ3PC/scene.splinecode";
  const projects = [
    {
      index: "01",
      name: "City2Surf",
      discipline: "UI/UX Design · Website",
      desc: "A bold identity system built around geometric precision and kinetic motion. Developed the full brand language including logomark, type system, and animated brand expressions for digital and physical touchpoints.",
      image: "City2Surf.png",
    },
    {
      index: "02",
      name: "Harbour",
      discipline: "Brand · Packaging",
      desc: "Coastal-inspired packaging design for a premium lifestyle brand. The identity balances nautical heritage with contemporary minimalism, clean forms, muted sea tones, and tactile material choices that reward close inspection.",
      image: "Ocean Echoes, City Rhythms.png",
    },
    {
      index: "03",
      name: "Gravity",
      discipline: "Product · Print",
      desc: "Product design and editorial print collateral for a high-performance equipment brand. Focused on communicating technical precision through clean data-forward layouts and a disciplined typographic grid.",
      image: "yasumo.jpg",
    },
    {
      index: "04",
      name: "Hester",
      discipline: "Brand",
      desc: "A refined brand identity for an independent hospitality concept. Rooted in warmth and craft, the visual language draws on warm neutrals, hand-lettered details, and an unhurried editorial sensibility.",
      image: "Cross.jpg",
    },
  ];

  const nav = document.querySelector(".nav");
  const overlay = document.getElementById("modalOverlay");
  const modalClose = document.getElementById("modalClose");
  const modalImg = document.getElementById("modalImg");
  const modalIndex = document.getElementById("modalIndex");
  const modalTag = document.getElementById("modalTag");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalPrev = document.getElementById("modalPrev");
  const modalNext = document.getElementById("modalNext");
  const preview = document.getElementById("hoverPreview");
  const previewImg = document.getElementById("hoverPreviewImg");
  const hero = document.querySelector(".hero");
  const splineViewer = document.querySelector("spline-viewer");
  const copyEmail = document.getElementById("copyEmail");
  const copyEmailText = document.getElementById("copyEmailText");

  let currentIndex = 0;
  let splineHasRendered = false;

  if (splineViewer) {
    splineViewer.setAttribute("url", splineSceneUrl);
  }

  function showSplineViewer() {
    if (splineHasRendered) return;

    splineHasRendered = true;
    hero?.classList.add("spline-ready");
  }

  function removeSplineBadge() {
    const shadowRoot = splineViewer?.shadowRoot;
    if (!shadowRoot) return false;

    const badge = shadowRoot.querySelector(
      "#logo, a[href*='spline.design'], [class*='logo']"
    );
    if (!badge) return false;

    badge.remove();
    return true;
  }

  function watchSplineBadge() {
    if (!splineViewer) return;
    let observer;

    function observeShadowRoot() {
      if (observer || !splineViewer.shadowRoot) return;

      observer = new MutationObserver(removeSplineBadge);
      observer.observe(splineViewer.shadowRoot, { childList: true, subtree: true });
    }

    const attempts = window.setInterval(() => {
      observeShadowRoot();
      if (removeSplineBadge()) {
        window.clearInterval(attempts);
        showSplineViewer();
      }
    }, 250);

    window.setTimeout(() => {
      window.clearInterval(attempts);
      removeSplineBadge();
      showSplineViewer();
    }, 5000);

    splineViewer.addEventListener("load", () => {
      removeSplineBadge();
      window.setTimeout(showSplineViewer, 250);
    });
  }

  function updateNavState() {
    if (!nav) return;
    nav.classList.toggle("scrolled", window.scrollY > 20);
  }

  function renderModal() {
    const project = projects[currentIndex];

    modalImg.src = project.image;
    modalImg.alt = project.name;
    modalIndex.textContent = project.index;
    modalTag.textContent = project.discipline;
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

  function showPreviousProject() {
    if (currentIndex === 0) return;
    currentIndex -= 1;
    renderModal();
  }

  function showNextProject() {
    if (currentIndex === projects.length - 1) return;
    currentIndex += 1;
    renderModal();
  }

  function movePreview(event) {
    const previewWidth = 260;
    const previewHeight = 170;
    const offset = 20;

    let x = event.clientX + offset;
    let y = event.clientY - previewHeight - offset;

    if (x + previewWidth > window.innerWidth - 16) {
      x = event.clientX - previewWidth - offset;
    }

    if (y < 16) {
      y = event.clientY + offset;
    }

    preview.style.left = `${x}px`;
    preview.style.top = `${y}px`;
  }

  async function copyEmailToClipboard() {
    if (!copyEmail || !copyEmailText) return;

    const email = copyEmail.dataset.copy;
    if (!email) return;

    try {
      await navigator.clipboard.writeText(email);
      copyEmailText.textContent = "Copied!";
      window.setTimeout(() => {
        copyEmailText.textContent = email;
      }, 1600);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  window.addEventListener("scroll", updateNavState);
  updateNavState();
  watchSplineBadge();

  copyEmail?.addEventListener("click", copyEmailToClipboard);

  modalClose.addEventListener("click", closeModal);
  modalPrev.addEventListener("click", showPreviousProject);
  modalNext.addEventListener("click", showNextProject);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (!overlay.classList.contains("open")) return;

    if (event.key === "Escape") closeModal();
    if (event.key === "ArrowLeft") showPreviousProject();
    if (event.key === "ArrowRight") showNextProject();
  });

  document.querySelectorAll(".project").forEach((projectRow) => {
    const index = Number.parseInt(projectRow.dataset.project, 10);
    const project = projects[index];

    projectRow.addEventListener("click", () => openModal(index));

    projectRow.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openModal(index);
    });

    projectRow.addEventListener("mouseenter", (event) => {
      previewImg.src = project.image;
      previewImg.alt = project.name;
      movePreview(event);
      preview.classList.add("active");
    });

    projectRow.addEventListener("mouseleave", () => {
      preview.classList.remove("active");
    });

    projectRow.addEventListener("mousemove", movePreview);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    observer.observe(element);
  });
});
