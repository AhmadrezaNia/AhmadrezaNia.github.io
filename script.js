(() => {
  'use strict';
  const root = document.documentElement;
  const themeButtons = [...document.querySelectorAll('.theme-toggle')];
  const preference = matchMedia('(prefers-color-scheme: dark)');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let saved = null;
  try { saved = localStorage.getItem('aaron-theme'); } catch (_) {}
  function applyTheme(theme) {
    root.dataset.theme = theme;
    const next = theme === 'dark' ? 'light' : 'dark';
    themeButtons.forEach(button => {
      button.setAttribute('aria-label', `Switch to ${next} theme`);
      button.querySelector('.theme-label').textContent = `${next === 'dark' ? 'Dark' : 'Light'} theme`;
    });
  }
  applyTheme(saved || (preference.matches ? 'dark' : 'light'));
  themeButtons.forEach(button => button.addEventListener('click', () => {
    saved = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(saved);
    try { localStorage.setItem('aaron-theme', saved); } catch (_) {}
  }));
  preference.addEventListener('change', e => { if (!saved) applyTheme(e.matches ? 'dark' : 'light'); });

  const header = document.querySelector('.profile-header');
  const shell = document.querySelector('.site-shell');
  const sidebar = document.querySelector('.sidebar');
  const photo = document.getElementById('moving-portrait');
  const sourceSlot = document.querySelector('.hero-portrait-slot');
  const destinationSlot = document.querySelector('.sidebar-portrait-slot');
  const desktop = matchMedia('(min-width: 821px)');
  let geometry = null;
  function placePhoto(parent) {
    if (photo.parentElement === parent) return;
    const focused = document.activeElement === photo;
    parent.append(photo);
    if (focused) photo.focus({preventScroll: true});
  }
  function measureProfile() {
    root.classList.toggle('portrait-docking', desktop.matches);
    if (!desktop.matches) {
      placePhoto(sourceSlot); photo.removeAttribute('style'); sidebar.removeAttribute('style');
      root.classList.remove('portrait-is-docked'); sidebar.classList.remove('is-visible');
      sidebar.inert = false; geometry = null; return;
    }
    const shellBox = shell.getBoundingClientRect();
    const shellStyle = getComputedStyle(shell);
    sidebar.style.left = `${shellBox.left + parseFloat(shellStyle.paddingLeft)}px`;
    const start = sourceSlot.getBoundingClientRect();
    const end = destinationSlot.getBoundingClientRect();
    const side = sidebar.getBoundingClientRect();
    geometry = {
      startX: start.left, startY: start.top + scrollY, startSize: start.width,
      endX: end.left, endY: parseFloat(getComputedStyle(sidebar).top) + end.top - side.top,
      endSize: end.width, origin: header.getBoundingClientRect().top + scrollY,
      distance: Math.max(200, header.getBoundingClientRect().height - 165)
    };
    updateProfile();
  }
  function updateProfile() {
    if (!geometry) return;
    const g = geometry;
    const raw = Math.max(0, Math.min(1, (scrollY - g.origin) / g.distance));
    const p = reduceMotion.matches ? (raw === 1 ? 1 : 0) : raw;
    sidebar.classList.toggle('is-visible', p > .96);
    sidebar.inert = p <= .96;
    if (p === 1) {
      placePhoto(destinationSlot); root.classList.add('portrait-is-docked'); photo.removeAttribute('style');
      return;
    }
    placePhoto(sourceSlot); root.classList.remove('portrait-is-docked');
    const xProgress = 1 - Math.pow(1 - p, 3);
    const yProgress = Math.pow(p, .58);
    const startY = g.startY - Math.min(scrollY, g.origin);
    const x = g.startX + (g.endX - g.startX) * xProgress;
    const y = startY + (g.endY - startY) * yProgress;
    const size = g.startSize + (g.endSize - g.startSize) * p;
    photo.style.transform = `translate3d(${x}px,${y}px,0) scale(${size / g.startSize})`;
    photo.style.borderRadius = `${50 - 36 * p}%`;
    // Reduced-motion visitors get a static header portrait until it docks.
    if (reduceMotion.matches) photo.style.transform = `translate3d(${g.startX}px,${g.startY - scrollY}px,0)`;
  }

  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open);
  });
  const navLinks = [...nav.querySelectorAll('a')];
  function closeMenu() {
    nav.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false');
  }
  navLinks.forEach(a => a.addEventListener('click', closeMenu));
  sidebar.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      closeMenu(); menu.focus();
    }
  });
  const sections = [...document.querySelectorAll('main > section[id]')];
  function updateNav() {
    let active = 'overview';
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= (desktop.matches ? 175 : 110)) active = section.id === 'about' ? 'overview' : section.id;
    }
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 20) active = 'contact';
    navLinks.forEach(a => {
      const selected = a.hash === `#${active}`;
      a.classList.toggle('active', selected);
      if (selected) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
    });
  }
  let ticking = false;
  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { updateProfile(); updateNav(); ticking = false; });
  }
  addEventListener('scroll', requestUpdate, {passive: true});
  addEventListener('resize', measureProfile, {passive: true});
  desktop.addEventListener('change', measureProfile);
  reduceMotion.addEventListener('change', requestUpdate);
  measureProfile(); updateNav();
  document.fonts?.ready.then(measureProfile);
  addEventListener('load', () => {
    measureProfile();
    if (location.hash === '#overview') requestAnimationFrame(() => header.scrollIntoView({behavior: 'instant'}));
  }, {once: true});

  const papers = [...document.querySelectorAll('.publication')];
  const controls = document.querySelector('.publication-controls');
  const topic = document.getElementById('topic-filter');
  let firstOnly = false;
  function updateFilterButtons() {
    controls.querySelectorAll('button').forEach(b => {
      const selected = (b.dataset.filter === 'first') === firstOnly;
      b.classList.toggle('selected', selected); b.setAttribute('aria-pressed', String(selected));
    });
  }
  function filterPapers() {
    let count = 0;
    papers.forEach(p => {
      p.hidden = (firstOnly && p.dataset.first !== 'true') || (topic.value !== 'all' && p.dataset.topic !== topic.value);
      if (!p.hidden) count++;
    });
    document.querySelectorAll('.publication-year').forEach(group => {
      group.hidden = ![...group.querySelectorAll('.publication')].some(p => !p.hidden);
    });
    document.getElementById('publication-count').textContent = `${count} ${count === 1 ? 'work' : 'works'}`;
    document.getElementById('no-results').hidden = count !== 0;
    requestAnimationFrame(() => { updateNav(); });
  }
  controls.hidden = false;
  controls.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
    firstOnly = button.dataset.filter === 'first'; updateFilterButtons(); filterPapers();
  }));
  topic.addEventListener('change', filterPapers);
  function revealLinkedPaper() {
    let fragment = location.hash.slice(1);
    try { fragment = decodeURIComponent(fragment); } catch (_) {}
    const target = document.getElementById(fragment);
    if (target?.classList.contains('publication') && target.hidden) {
      firstOnly = false; topic.value = 'all'; updateFilterButtons(); filterPapers();
      target.scrollIntoView({behavior: reduceMotion.matches ? 'instant' : 'smooth'});
    }
    requestUpdate();
  }
  addEventListener('hashchange', revealLinkedPaper); revealLinkedPaper();
  // Keep bookmarks to the first site's combined service section working.
  if (location.hash === '#service') document.getElementById('recognition').scrollIntoView({behavior: 'instant'});

  const dialog = document.getElementById('figure-dialog');
  let opener = null;
  document.querySelectorAll('[data-figure]').forEach(button => button.addEventListener('click', () => {
    opener = button;
    const image = document.getElementById('expanded-figure');
    image.src = button.dataset.figure; image.alt = button.querySelector('img').alt;
    document.getElementById('figure-caption').textContent = button.dataset.caption;
    dialog.showModal();
  }));
  document.getElementById('close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => opener?.focus({preventScroll: true}));

})();
