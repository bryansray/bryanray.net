const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.primary-menu');
const dropdownButton = document.querySelector('.nav-dropdown > button');
const themeButton = document.querySelector('.theme-toggle');
menuButton?.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') === 'true'; menuButton.setAttribute('aria-expanded', String(!open)); menu?.classList.toggle('is-open', !open); });
dropdownButton?.addEventListener('click', () => { const open = dropdownButton.getAttribute('aria-expanded') === 'true'; dropdownButton.setAttribute('aria-expanded', String(!open)); });
const closeMenu = () => { menuButton?.setAttribute('aria-expanded', 'false'); menu?.classList.remove('is-open'); };
const closeDropdown = () => dropdownButton?.setAttribute('aria-expanded', 'false');
document.addEventListener('click', (event) => { if (!event.target.closest('.nav-dropdown')) closeDropdown(); if (!event.target.closest('.navigation')) closeMenu(); });
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (dropdownButton?.getAttribute('aria-expanded') === 'true') { closeDropdown(); dropdownButton.focus(); return; }
  if (menuButton?.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); }
});
// The theme itself is applied by the inline script in baseof.html; this only flips it.
themeButton?.addEventListener('click', () => { const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = theme; try { localStorage.setItem('theme', theme); } catch (e) {} });

// Copy buttons for code blocks. The button lives in a wrapper rather than inside the
// <pre>, so it stays put when a long line scrolls and never lands in the copied text.
document.querySelectorAll('.article-body pre').forEach((pre) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'code-block';
  pre.parentNode.insertBefore(wrapper, pre);
  wrapper.appendChild(pre);

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'copy-button';
  button.textContent = 'Copy';
  button.addEventListener('click', () => {
    navigator.clipboard.writeText(pre.innerText).then(
      () => { button.textContent = 'Copied'; },
      () => { button.textContent = 'Press ⌘C'; }
    ).finally(() => setTimeout(() => { button.textContent = 'Copy'; }, 2000));
  });
  wrapper.appendChild(button);
});
