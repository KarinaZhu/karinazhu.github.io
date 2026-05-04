document.addEventListener("DOMContentLoaded", () => {
  const projects = [
    {
      index: "01",
      name: "City2Surf",
      discipline: "UI/UX Design · Website",
      desc: "A bold identity system built around geometric precision and kinetic motion. Developed the full brand language including logomark, type system, and animated brand expressions for digital and physical touchpoints.",
      image: "images/City2Surf.png",
    },
    {
      index: "02",
      name: "Harbour",
      discipline: "Brand · Packaging",
      desc: "Coastal-inspired packaging design for a premium lifestyle brand. The identity balances nautical heritage with contemporary minimalism, clean forms, muted sea tones, and tactile material choices that reward close inspection.",
      image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&q=80",
    },
    {
      index: "03",
      name: "Gravity",
      discipline: "Product · Print",
      desc: "Product design and editorial print collateral for a high-performance equipment brand. Focused on communicating technical precision through clean data-forward layouts and a disciplined typographic grid.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    },
    {
      index: "04",
      name: "Hester",
      discipline: "Brand",
      desc: "A refined brand identity for an independent hospitality concept. Rooted in warmth and craft, the visual language draws on warm neutrals, hand-lettered details, and an unhurried editorial sensibility.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
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

  let currentIndex = 0;

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

  window.addEventListener("scroll", updateNavState);
  updateNavState();

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

    projectRow.addEventListener("mouseenter", () => {
      previewImg.src = project.image;
      previewImg.alt = project.name;
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
