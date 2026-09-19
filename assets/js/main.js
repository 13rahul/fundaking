
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Logic
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav-overlay');
  
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
      mobileToggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        mobileToggle.classList.remove('active');
      });
    });
  }

  // Update Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.innerText = new Date().getFullYear();

  const header = document.querySelector('header.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Reveal on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Custom Cursor
  const cursor = document.getElementById('cursor');
  if (cursor) {
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
  }

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Particle Background
  const canvas = document.getElementById('bgCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h;
    let particles = [];
    
    const init = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const count = Math.round((w * h) / 70000); // Density
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.5 + 0.1
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        
        // Wrap around
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        ctx.fillStyle = `rgba(0, 225, 255, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(draw);
    };

    window.addEventListener('resize', init);
    init();
    draw();
  }

  // Case study listing filters
  const csGrid = document.querySelector('[data-cs-grid]');
  const csFilters = document.querySelector('[data-cs-filters]');
  if (csGrid && csFilters) {
    const cards = csGrid.querySelectorAll('[data-cs-card]');
    const empty = document.querySelector('[data-cs-empty]');
    const buttons = csFilters.querySelectorAll('.cs-filter');

    const applyTag = (tag) => {
      const safeTag = tag || 'all';
      buttons.forEach((btn) => {
        const on = btn.dataset.tag === safeTag;
        btn.classList.toggle('is-active', on);
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      let shown = 0;
      cards.forEach((card) => {
        const tags = (card.dataset.tags || '').split(/\s+/).filter(Boolean);
        const match = safeTag === 'all' || tags.includes(safeTag);
        card.hidden = !match;
        if (match) shown += 1;
      });
      csGrid.classList.toggle('cs-grid--sparse', shown > 0 && shown < 3);
      if (empty) empty.hidden = shown > 0;
      const url = new URL(window.location.href);
      if (safeTag === 'all') url.searchParams.delete('tag');
      else url.searchParams.set('tag', safeTag);
      history.replaceState({}, '', url);
    };

    csFilters.addEventListener('click', (e) => {
      const btn = e.target.closest('.cs-filter');
      if (!btn) return;
      applyTag(btn.dataset.tag);
    });

    const allowed = ['all', ...Array.from(buttons).map((b) => b.dataset.tag)];
    const initial = new URLSearchParams(window.location.search).get('tag');
    applyTag(allowed.includes(initial) ? initial : 'all');
  }

  // Mobile Submenu Toggle
  const mobileDropdowns = document.querySelectorAll('.mobile-dropdown-title');
  mobileDropdowns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Toggle the next sibling (the content)
        const content = btn.nextElementSibling;
        if (content && content.classList.contains('mobile-dropdown-content')) {
            content.classList.toggle('active');
            // Rotate the arrow icon if present
            const icon = btn.querySelector('i');
            if(icon) {
                 icon.style.transform = content.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
                 icon.style.transition = 'transform 0.3s ease';
            }
        }
    });
  });
});
