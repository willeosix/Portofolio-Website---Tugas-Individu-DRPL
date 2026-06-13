/* ============================================
   MAIN.JS — Christian Wilfredo Portfolio
   Handles: Panel transitions, scroll reveals,
   slide navigation, and icon initialization
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Detect which page we're on
  const isLanding = document.getElementById('landingContainer');
  const isProjects = document.querySelector('.projects-page');
  const isLife = document.querySelector('.life-page');

  if (isLanding) initLanding();
  if (isProjects) initScrollReveal();
  if (isLife) initScrollReveal();
});

/* ============================================
   LANDING PAGE — Panel Click Transitions
   ============================================ */

function initLanding() {
  const panels = document.querySelectorAll('.panel');
  const overlay = document.getElementById('transitionOverlay');

  panels.forEach(panel => {
    panel.addEventListener('click', () => {
      const target = panel.dataset.target;
      const isIT = panel.classList.contains('panel-it');
      const sibling = isIT
        ? document.querySelector('.panel-life')
        : document.querySelector('.panel-it');

      // Add expanding/shrinking classes
      panel.classList.add('expanding');
      sibling.classList.add('shrinking');

      // Prepare overlay color
      overlay.classList.add(isIT ? 'navy-bg' : 'burgundy-bg');

      // After panel animation, fade in overlay and navigate
      setTimeout(() => {
        overlay.classList.add('active');
      }, 400);

      setTimeout(() => {
        window.location.href = target;
      }, 800);
    });
  });
}

/* ============================================
   SCROLL REVEAL — Intersection Observer
   ============================================ */

function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .project-card, .journey-card, .tennis-text, .tennis-image');

  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}
