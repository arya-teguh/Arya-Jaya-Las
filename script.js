// Mobile menu toggle
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Portfolio filter
const filterBtns = document.querySelectorAll('.filter-btn');
const items = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const f = btn.dataset.filter;
    items.forEach(item => {
      if(f === 'all' || item.dataset.cat === f){
        item.classList.remove('hide');
      } else {
        item.classList.add('hide');
      }
    });
  });
});

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-a').style.maxHeight = null;
    });
    
    if(!isOpen){
      item.classList.add('open');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
});
/* ==========================================================================
   ===== TAMBAHAN ANIMASI (scroll reveal, header scroll, counter) =====
   Tidak mengubah konten/struktur, hanya menambahkan class & efek visual.
   ========================================================================== */

// Header berubah saat di-scroll
const siteHeader = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    siteHeader.classList.add('scrolled');
  } else {
    siteHeader.classList.remove('scrolled');
  }
});

// Tandai elemen-elemen yang akan muncul dengan animasi saat di-scroll
const revealSelectors = [
  '.section-head',
  '.feature',
  '.service-card',
  '.process-item',
  '.portfolio-item',
  '.testi-card',
  '.faq-item',
  '.contact-info',
  '.map-frame',
  '.cta h2',
  '.cta p',
  '.cta .btn'
];

const revealElements = document.querySelectorAll(revealSelectors.join(','));
revealElements.forEach((el, i) => {
  el.classList.add('reveal');
  // efek bertahap (stagger) berdasarkan urutan dalam satu grup
  const group = el.parentElement ? Array.from(el.parentElement.children) : [];
  const idx = group.indexOf(el);
  const delay = Math.min((idx >= 0 ? idx : 0) * 0.08, 0.4);
  el.style.transitionDelay = `${delay}s`;
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// Animasi hitung naik untuk angka di hero-stats
const statEls = document.querySelectorAll('.hero-stats strong');
const animateCount = (el) => {
  const text = el.textContent.trim();
  const match = text.match(/\d+/);
  if (!match) return; // skip jika tidak ada angka (mis. "6 Bln" tetap dianimasikan di bawah)
  const target = parseInt(match[0], 10);
  const suffix = text.replace(match[0], '');
  const duration = 1200;
  const start = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(target * eased);
    el.textContent = current + suffix;
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = text;
    }
  };
  requestAnimationFrame(step);
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      statEls.forEach(el => animateCount(el));
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.4 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);
