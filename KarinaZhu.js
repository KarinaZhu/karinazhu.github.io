document.addEventListener('DOMContentLoaded', () => {

  // ================= NAV GLASS ON SCROLL =================
  const nav = document.querySelector('.nav');

  window.addEventListener('scroll', () => {
    if (!nav) return;

    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // ================= PROJECT DATA =================
  const projects = [
    {
      index: '01',
      name: 'City2Surf',
      discipline: 'UI/UX Design · Website',
      desc: 'A bold identity system built around geometric precision and kinetic motion.',
      image: 'City2Surf.png'
    },
    {
      index: '02',
      name: 'Harbour',
      discipline: 'Brand · Packaging',
      desc: 'Coastal-inspired packaging design for a premium lifestyle brand.',
      image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&q=80'
    },
    {
      index: '03',
      name: 'Gravity',
      discipline: 'Product · Print',
      desc: 'Editorial print and product system with data-driven layouts.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80'
    },
    {
      index: '04',
      name: 'Hester',
      discipline: 'Brand',
      desc: 'A refined hospitality identity rooted in warmth and craft.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'
    }
  ];

  // ================= ELEMENTS =================
  const overlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');

  const preview = document.getElementById('hoverPreview');
  const previewImg = document.getElementById('hoverPreviewImg');

  let currentIndex = 0;

  // ================= MODAL =================
  function openModal(i) {
    currentIndex = i;
    const p = projects[i];

    modalImg.src = p.image;
    modalTitle.textContent = p.name;
    modalDesc.textContent = p.desc;

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // ================= PROJECT INTERACTIONS =================
  document.querySelectorAll('.project').forEach((el) => {
    const idx = parseInt(el.dataset.project, 10);

    // CLICK → modal
    el.addEventListener('click', () => openModal(idx));

    // HOVER → preview
    el.addEventListener('mouseenter', () => {
      previewImg.src = projects[idx].image;
      preview.classList.add('active');
    });

    el.addEventListener('mouseleave', () => {
      preview.classList.remove('active');
    });

    // FOLLOW CURSOR
    el.addEventListener('mousemove', (e) => {
      const offset = 20;
      const width = 260;
      const height = 170;

      let x = e.clientX + offset;
      let y = e.clientY - height - offset;

      if (x + width > window.innerWidth) {
        x = e.clientX - width - offset;
      }

      if (y < 10) {
        y = e.clientY + offset;
      }

      preview.style.left = x + 'px';
      preview.style.top = y + 'px';
    });
  });

});