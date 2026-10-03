(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const preference = matchMedia('(prefers-color-scheme: dark)');
  let saved = null;
  try { saved = localStorage.getItem('aaron-theme'); } catch (_) {}
  function applyTheme(theme) {
    root.dataset.theme = theme;
    const label = theme === 'dark' ? 'Light theme' : 'Dark theme';
    toggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    toggle.querySelector('.theme-label').textContent = label;
  }
  applyTheme(saved || (preference.matches ? 'dark' : 'light'));
  toggle.addEventListener('click', () => {
    saved = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(saved);
    try { localStorage.setItem('aaron-theme', saved); } catch (_) {}
  });
  preference.addEventListener('change', e => { if (!saved) applyTheme(e.matches ? 'dark' : 'light'); });

  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false');
  }));
  const sections = [...document.querySelectorAll('main > section[id]')];
  function updateNav() {
    let active = sections[0].id;
    for (const s of sections) { if (s.getBoundingClientRect().top <= 180) active = s.id; }
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 20) active = 'contact';
    nav.querySelectorAll('a').forEach(a => {
      const selected = a.hash === `#${active}`;
      a.classList.toggle('active', selected);
      if (selected) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
    });
  }
  let ticking = false;
  addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(() => { updateNav(); ticking = false; }); ticking = true; } }, { passive: true });
  updateNav();

  const papers = [...document.querySelectorAll('.publication')];
  const controls = document.querySelector('.publication-controls');
  const topic = document.getElementById('topic-filter');
  let firstOnly = false;
  function filterPapers() {
    let count = 0;
    papers.forEach(p => {
      p.hidden = (firstOnly && p.dataset.first !== 'true') || (topic.value !== 'all' && p.dataset.topic !== topic.value);
      if (!p.hidden) count++;
    });
    document.getElementById('publication-count').textContent = `${count} ${count === 1 ? 'work' : 'works'}`;
    document.getElementById('no-results').hidden = count !== 0;
  }
  controls.hidden = false;
  controls.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
    firstOnly = button.dataset.filter === 'first';
    controls.querySelectorAll('button').forEach(b => {
      const selected = b === button;
      b.classList.toggle('selected', selected); b.setAttribute('aria-pressed', String(selected));
    }); filterPapers();
  }));
  topic.addEventListener('change', filterPapers);
  function revealLinkedPaper() {
    const target = document.getElementById(location.hash.slice(1));
    if (target?.classList.contains('publication') && target.hidden) {
      firstOnly = false; topic.value = 'all';
      controls.querySelectorAll('button').forEach(b => {
        const selected = b.dataset.filter === 'all'; b.classList.toggle('selected', selected); b.setAttribute('aria-pressed', String(selected));
      }); filterPapers(); target.scrollIntoView();
    }
  }
  addEventListener('hashchange', revealLinkedPaper); revealLinkedPaper();

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
  dialog.addEventListener('click', e => {
    if (e.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
    }
  });
  dialog.addEventListener('close', () => { if (opener) opener.focus({ preventScroll: true }); });
})();
