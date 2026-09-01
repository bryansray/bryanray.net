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
const savedTheme = localStorage.getItem('theme');
if (savedTheme) document.documentElement.dataset.theme = savedTheme;
themeButton?.addEventListener('click', () => { const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = theme; localStorage.setItem('theme', theme); });
