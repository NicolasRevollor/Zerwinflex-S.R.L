/* ============================================
   ZERWINFLEX S.R.L. — JavaScript principal
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAV: resaltar link activo al hacer scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));


  /* ── ANIMACIÓN DE ENTRADA al hacer scroll (fade-up) ── */
  const animTargets = document.querySelectorAll(
    '.product-card, .feature-card, .spec-row, .contact-card, .stat-item'
  );

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        // Al terminar la transición limpiamos inline styles para que el hover funcione
        el.addEventListener('transitionend', () => {
          el.style.cssText = '';
        }, { once: true });
        fadeObserver.unobserve(el);
      }
    });
  }, { threshold: 0.1 });

  animTargets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
    fadeObserver.observe(el);
  });


  /* ── NAV: link activo estilo ── */
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      .nav-links a.active {
        color: var(--zw-blue);
        font-weight: 600;
      }
    </style>
  `);


  /* ── LIGHTBOX + EFECTO LUPA ── */
  const overlay    = document.getElementById('lb-overlay');
  const lbImg      = document.getElementById('lb-img');
  const lbLens     = document.getElementById('lb-lens');
  const lbWrap     = document.getElementById('lb-img-wrap');
  const lbCaption  = document.getElementById('lb-caption');
  const lbCloseBtn = document.getElementById('lb-close');

  const ZOOM      = 3;    // nivel de ampliación
  const LENS_SIZE = 180;  // px — debe coincidir con el CSS

  function openLightbox(src, alt, name) {
    lbImg.src = src;
    lbImg.alt = alt;
    lbCaption.textContent = name;
    overlay.classList.add('lb-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('lb-open');
    lbLens.style.display = 'none';
    document.body.style.overflow = '';
    setTimeout(() => { lbImg.src = ''; }, 300);
  }

  /* ── SLIDER de imágenes ── */
  document.querySelectorAll('[data-slider]').forEach(card => {
    const imgs = card.querySelectorAll('.slider-img');
    let current = 0;

    function goTo(idx) {
      imgs[current].classList.remove('active');
      current = (idx + imgs.length) % imgs.length;
      imgs[current].classList.add('active');
    }

    card.querySelector('.slider-prev')?.addEventListener('click', e => {
      e.stopPropagation();
      goTo(current - 1);
    });

    card.querySelector('.slider-next')?.addEventListener('click', e => {
      e.stopPropagation();
      goTo(current + 1);
    });
  });

  // Abrir al hacer clic en cualquier product-card
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
      const bg   = card.querySelector('.slider-img.active') || card.querySelector('.product-bg');
      const name = card.querySelector('.product-name')?.textContent?.trim() || '';
      if (bg) openLightbox(bg.src, bg.alt, name);
    });
  });

  // Cerrar
  lbCloseBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  // Efecto lupa — mover cursor sobre la imagen
  lbWrap.addEventListener('mousemove', e => {
    const rect = lbImg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
      lbLens.style.display = 'none';
      return;
    }

    lbLens.style.display = 'block';

    // Posición de la lupa centrada en el cursor (relativo al wrapper)
    const wrapRect = lbWrap.getBoundingClientRect();
    lbLens.style.left = (e.clientX - wrapRect.left) + 'px';
    lbLens.style.top  = (e.clientY - wrapRect.top)  + 'px';

    // Calcular zoom del fondo
    const bgW = rect.width  * ZOOM;
    const bgH = rect.height * ZOOM;
    const bgX = -(x * ZOOM - LENS_SIZE / 2);
    const bgY = -(y * ZOOM - LENS_SIZE / 2);

    lbLens.style.backgroundImage    = `url('${lbImg.src}')`;
    lbLens.style.backgroundSize     = `${bgW}px ${bgH}px`;
    lbLens.style.backgroundPosition = `${bgX}px ${bgY}px`;
  });

  lbWrap.addEventListener('mouseleave', () => {
    lbLens.style.display = 'none';
  });


  /* ── THEME TOGGLE con View Transitions ── */
  const themeBtn  = document.getElementById('theme-toggle');
  const iconMoon  = document.getElementById('icon-moon');
  const iconSun   = document.getElementById('icon-sun');

  // Cargar tema guardado
  const savedTheme = localStorage.getItem('zw-theme');
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
    iconMoon.style.display = 'none';
    iconSun.style.display  = 'block';
  }

  function applyTheme(isDark) {
    document.documentElement.classList.toggle('dark', isDark);
    iconMoon.style.display = isDark ? 'none'  : 'block';
    iconSun.style.display  = isDark ? 'block' : 'none';
    localStorage.setItem('zw-theme', isDark ? 'dark' : 'light');
  }

  themeBtn.addEventListener('click', () => {
    const isDark   = !document.documentElement.classList.contains('dark');
    const rect     = themeBtn.getBoundingClientRect();
    const cx       = rect.left + rect.width  / 2;
    const cy       = rect.top  + rect.height / 2;
    const maxR     = Math.hypot(
      Math.max(cx, window.innerWidth  - cx),
      Math.max(cy, window.innerHeight - cy)
    );

    // Si el navegador soporta View Transitions
    if (typeof document.startViewTransition === 'function') {
      const root = document.documentElement;
      root.dataset.themeVt = 'active';
      root.style.setProperty('--vt-duration', '500ms');

      const transition = document.startViewTransition(() => {
        applyTheme(isDark);
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          { clipPath: [
              `circle(0px at ${cx}px ${cy}px)`,
              `circle(${maxR}px at ${cx}px ${cy}px)`
            ]
          },
          {
            duration: 500,
            easing: 'ease-in-out',
            pseudoElement: '::view-transition-new(root)'
          }
        );
      });

      transition.finished.finally(() => {
        delete root.dataset.themeVt;
        root.style.removeProperty('--vt-duration');
      });

    } else {
      // Fallback sin animación para navegadores sin soporte
      applyTheme(isDark);
    }
  });

});
