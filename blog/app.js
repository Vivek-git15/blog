const topicButtons = [...document.querySelectorAll('.topic-chip')];
const storyCards = [...document.querySelectorAll('.story-card')];
const searchInput = document.querySelector('#story-search');
const emptyState = document.querySelector('#empty-state');
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
let activeTopic = 'all';

function filterStories() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  storyCards.forEach((card) => {
    const categoryMatches = activeTopic === 'all' || card.dataset.category === activeTopic;
    const searchMatches = !query || card.dataset.search.includes(query);
    const visible = categoryMatches && searchMatches;
    card.hidden = !visible;
    if (visible) visibleCount += 1;
  });

  emptyState.hidden = visibleCount > 0;
}

topicButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeTopic = button.dataset.filter;
    topicButtons.forEach((item) => item.classList.toggle('is-active', item === button));
    filterStories();
  });
});

searchInput.addEventListener('input', filterStories);

document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    searchInput.focus();
  }
  if (event.key === 'Escape') searchInput.blur();
});

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('is-open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  });
});

document.querySelector('#newsletter-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const emailInput = document.querySelector('#email');
  const message = document.querySelector('#form-message');
  if (!emailInput.reportValidity()) return;
  message.textContent = 'You’re on the list. See you Sunday!';
  message.classList.add('is-success');
  emailInput.value = '';
});

document.querySelector('#load-more').addEventListener('click', (event) => {
  document.querySelectorAll('.story-card.is-extra').forEach((card) => {
    card.style.display = '';
  });
  event.currentTarget.textContent = 'You’re all caught up ✳';
  event.currentTarget.disabled = true;
  filterStories();
});