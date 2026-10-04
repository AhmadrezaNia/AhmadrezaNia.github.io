(() => {
  'use strict';
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const preference = matchMedia('(prefers-color-scheme: dark)');
  let saved = null;
  try { saved = localStorage.getItem('aaron-theme'); } catch (_) {}
  function applyTheme(theme) {
    root.dataset.theme = theme;
    const next = theme === 'dark' ? 'light' : 'dark';
    themeButton.setAttribute('aria-label', `Switch to ${next} theme`);
    themeButton.querySelector('.theme-label').textContent = `${next === 'dark' ? 'Dark' : 'Light'} theme`;
  }
  applyTheme(saved || (preference.matches ? 'dark' : 'light'));
  themeButton.addEventListener('click', () => {
    saved = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(saved);
    try { localStorage.setItem('aaron-theme', saved); } catch (_) {}
  });
  preference.addEventListener('change', event => { if (!saved) applyTheme(event.matches ? 'dark' : 'light'); });

  const sidebar = document.querySelector('.sidebar');
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  function closeMenu() {
    nav.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false');
  }
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    nav.classList.toggle('is-open', open); menu.setAttribute('aria-expanded', String(open));
  });
  sidebar.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); }
  });
  const navLinks = [...nav.querySelectorAll('a')];
  navLinks.forEach(link => link.addEventListener('click', closeMenu));
  const sections = [...document.querySelectorAll('main > section[id]')];
  function updateNav() {
    let active = 'overview';
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= 140) active = section.id;
    }
    if (innerHeight + scrollY >= root.scrollHeight - 20) {
      // At the bottom, short sections can share a viewport. Honor the visible link destination.
      const destination = sections.find(section => location.hash === `#${section.id}`);
      const top = destination?.getBoundingClientRect().top;
      active = top >= 0 && top < innerHeight ? destination.id : 'connect';
    }
    navLinks.forEach(link => {
      const selected = link.hash === `#${active}`;
      link.classList.toggle('active', selected);
      if (selected) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    });
  }
  let ticking = false;
  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { updateNav(); ticking = false; });
  }
  addEventListener('scroll', requestUpdate, {passive: true});
  addEventListener('resize', requestUpdate, {passive: true});
  updateNav();

  const papers = [...document.querySelectorAll('.publication')];
  const controls = document.querySelector('.publication-controls');
  const topic = document.getElementById('topic-filter');
  let firstOnly = false;
  function updateFilterButtons() {
    controls.querySelectorAll('button').forEach(button => {
      const selected = (button.dataset.filter === 'first') === firstOnly;
      button.classList.toggle('selected', selected); button.setAttribute('aria-pressed', String(selected));
    });
  }
  function filterPapers() {
    let count = 0;
    papers.forEach(paper => {
      paper.hidden = (firstOnly && paper.dataset.first !== 'true') || (topic.value !== 'all' && paper.dataset.topic !== topic.value);
      if (!paper.hidden) count++;
    });
    document.querySelectorAll('.publication-year').forEach(group => {
      group.hidden = ![...group.querySelectorAll('.publication')].some(paper => !paper.hidden);
    });
    document.getElementById('publication-count').textContent = `${count} ${count === 1 ? 'work' : 'works'}`;
    document.getElementById('no-results').hidden = count !== 0;
    requestUpdate();
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
      target.scrollIntoView({behavior: 'instant'});
    }
    requestUpdate();
  }
  addEventListener('hashchange', revealLinkedPaper); revealLinkedPaper();
  // Preserve bookmarks when section names change.
  const legacyAnchors = {recognition: 'awards', service: 'awards', contact: 'connect'};
  const legacyTarget = legacyAnchors[location.hash.slice(1)];
  if (legacyTarget) document.getElementById(legacyTarget).scrollIntoView({behavior: 'instant'});

  const dialog = document.getElementById('figure-dialog');
  let opener = null;
  document.querySelectorAll('[data-figure], [data-portrait]').forEach(button => button.addEventListener('click', () => {
    opener = button;
    const portrait = Boolean(button.dataset.portrait);
    const image = document.getElementById('expanded-figure');
    image.src = button.dataset.portrait || button.dataset.figure;
    image.alt = button.querySelector('img').alt;
    document.getElementById('figure-caption').textContent = portrait ? 'Aaron Nia' : button.dataset.caption;
    document.getElementById('dialog-kind').textContent = portrait ? 'Portrait' : 'Research figure';
    dialog.classList.toggle('portrait-dialog', portrait);
    root.classList.add('image-dialog-open');
    dialog.showModal();
  }));
  document.getElementById('close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    root.classList.remove('image-dialog-open');
    opener?.focus({preventScroll: true});
  });
})();
