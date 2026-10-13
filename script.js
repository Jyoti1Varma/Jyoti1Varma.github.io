/* No packages, build tools, or external services are needed. */
(() => {
  'use strict';

  const root = document.documentElement;
  const body = document.body;
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const motionButton = document.querySelector('.motion-toggle');
  let userPaused = false;

  try { userPaused = localStorage.getItem('jyoti-motion-paused') === 'true'; } catch (_) { /* Storage is optional. */ }

  function applyMotionPreference() {
    const paused = userPaused || motionPreference.matches;
    root.classList.toggle('motion-paused', paused);
    motionButton.setAttribute('aria-pressed', String(paused));
    motionButton.textContent = motionPreference.matches ? 'Reduced motion enabled' : paused ? 'Enable motion ▷' : 'Pause motion Ⅱ';
    motionButton.disabled = motionPreference.matches;
    motionButton.title = motionPreference.matches ? 'Following your device’s reduced-motion preference.' : 'Pause or resume decorative animations.';
    if (paused) document.querySelectorAll('.reveal').forEach(element => element.classList.add('is-visible'));
  }

  motionButton.addEventListener('click', () => {
    userPaused = !userPaused;
    try { localStorage.setItem('jyoti-motion-paused', String(userPaused)); } catch (_) { /* Private browsing can disable storage. */ }
    applyMotionPreference();
  });
  motionPreference.addEventListener('change', applyMotionPreference);
  applyMotionPreference();

  // Reveal content once. Nothing is hidden unless observation is available.
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

    // Animated diagrams run only while their section is on screen.
    const sceneObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle('scene-active', entry.isIntersecting));
    }, { threshold: 0.05 });
    document.querySelectorAll('.project-art, .hobby-stage').forEach(element => sceneObserver.observe(element));
  } else {
    document.querySelectorAll('.reveal').forEach(element => element.classList.add('is-visible'));
  }

  // Mobile navigation, including keyboard dismissal.
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#main-nav');
  function setMenu(open, restoreFocus = false) {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    navigation.classList.toggle('is-open', open);
    if (restoreFocus) menuButton.focus();
  }
  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') setMenu(false, true);
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) setMenu(false);
  });
  document.addEventListener('focusin', event => {
    if (!event.target.closest('.site-header')) setMenu(false);
  });

  // A reading indicator and an active navigation link. Scroll itself is native.
  const progress = document.querySelector('.reading-progress');
  const header = document.querySelector('.site-header');
  const navLinks = [...navigation.querySelectorAll('a[href^="#"]')];
  const navSections = navLinks.map(link => document.querySelector(link.getAttribute('href')));
  let scrollQueued = false;
  function updateScroll() {
    const distance = root.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0})`;
    header.classList.toggle('is-scrolled', window.scrollY > 15);
    let current = -1;
    navSections.forEach((section, index) => {
      if (section.getBoundingClientRect().top <= window.innerHeight * 0.42) current = index;
    });
    navLinks.forEach((link, index) => {
      if (index === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scrollQueued = false;
  }
  function queueScrollUpdate() {
    if (!scrollQueued) {
      scrollQueued = true;
      requestAnimationFrame(updateScroll);
    }
  }
  window.addEventListener('scroll', queueScrollUpdate, { passive: true });
  window.addEventListener('resize', queueScrollUpdate, { passive: true });
  window.addEventListener('load', queueScrollUpdate);

  // All five interest panels remain in the HTML for search engines and no-JS use.
  const hobbyButtons = [...document.querySelectorAll('[data-hobby]')];
  const hobbyPanels = [...document.querySelectorAll('.hobby-panel')];
  function selectHobby(name, animate = true) {
    hobbyButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.hobby === name)));
    hobbyPanels.forEach(panel => {
      const active = panel.id === `hobby-${name}`;
      panel.hidden = !active;
      panel.classList.remove('is-entering');
      if (active && animate) panel.classList.add('is-entering');
    });
    queueScrollUpdate();
  }
  hobbyButtons.forEach((button, index) => {
    button.addEventListener('click', () => selectHobby(button.dataset.hobby));
    button.addEventListener('keydown', event => {
      let nextIndex;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % hobbyButtons.length;
      if (event.key === 'ArrowLeft') nextIndex = (index - 1 + hobbyButtons.length) % hobbyButtons.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = hobbyButtons.length - 1;
      if (nextIndex !== undefined) {
        event.preventDefault();
        hobbyButtons[nextIndex].focus();
        selectHobby(hobbyButtons[nextIndex].dataset.hobby);
      }
    });
  });
  selectHobby('science', false);

  // A small amount of depth on pointer devices; touch users keep a still frame.
  const portraitArea = document.querySelector('.hero-visual');
  const portraitFrame = document.querySelector('.portrait-frame');
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    portraitArea.addEventListener('pointermove', event => {
      if (root.classList.contains('motion-paused')) return;
      const rect = portraitArea.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      portraitFrame.style.transform = `perspective(900px) rotate(2deg) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
    });
    portraitArea.addEventListener('pointerleave', () => { portraitFrame.style.transform = ''; });
  }

  const copyButton = document.querySelector('.copy-email');
  const copyStatus = document.querySelector('.copy-status');
  copyButton.addEventListener('click', async () => {
    const email = 'jyotijv.varma@gmail.com';
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const field = document.createElement('textarea');
        field.value = email;
        field.setAttribute('readonly', '');
        field.style.cssText = 'position:fixed;left:-9999px;top:0;';
        body.append(field);
        field.select();
        const copied = document.execCommand('copy');
        field.remove();
        copyButton.focus();
        if (!copied) throw new Error('Clipboard unavailable');
      }
      copyStatus.textContent = 'Email address copied.';
    } catch (_) {
      copyStatus.textContent = 'Please select and copy the email address above.';
    }
  });

  document.querySelectorAll('details').forEach(details => details.addEventListener('toggle', queueScrollUpdate));
  document.querySelector('#year').textContent = String(new Date().getFullYear());
  body.classList.add('js');
  updateScroll();
})();
