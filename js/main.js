document.getElementById('year').textContent = new Date().getFullYear();

// Typographic style: enlarge the initial letter of each important word
// (skips short connector words) inside elements marked .cap-initials.
const CAP_SKIP_WORDS = new Set([
  'de', 'da', 'do', 'das', 'dos', 'e', 'a', 'o', 'as', 'os',
  'em', 'com', 'para', 'no', 'na', 'nos', 'nas', 'ao', 'aos', 'à', 'às',
]);

function applyCapInitials(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  let node;
  while ((node = walker.nextNode())) {
    if (node.nodeValue.trim()) textNodes.push(node);
  }

  textNodes.forEach((textNode) => {
    const frag = document.createDocumentFragment();
    const parts = textNode.nodeValue.split(/(\s+)/);

    parts.forEach((part) => {
      if (part === '' || /^\s+$/.test(part)) {
        frag.appendChild(document.createTextNode(part));
        return;
      }
      const bareWord = part.replace(/[^a-zà-úçãõ]/gi, '').toLowerCase();
      if (!bareWord || CAP_SKIP_WORDS.has(bareWord)) {
        frag.appendChild(document.createTextNode(part));
        return;
      }
      const span = document.createElement('span');
      span.className = 'cap-initial';
      span.textContent = part.charAt(0);
      frag.appendChild(span);
      frag.appendChild(document.createTextNode(part.slice(1)));
    });

    textNode.parentNode.replaceChild(frag, textNode);
  });
}

document.querySelectorAll('.cap-initials').forEach(applyCapInitials);

// Header goes from transparent (over the hero) to solid once scrolled
const siteHeader = document.querySelector('.site-header');
function updateHeaderState() {
  siteHeader.classList.toggle('is-scrolled', window.scrollY > 60);
}
updateHeaderState();
window.addEventListener('scroll', updateHeaderState, { passive: true });

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Contact form (client-side only — hook up to your backend/email service)
// Guarded because not every page includes the contact form.
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

if (form && status) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      status.textContent = 'Preencha os campos obrigatórios.';
      return;
    }
    status.textContent = 'Mensagem pronta para envio — conecte este formulário ao seu serviço de e-mail (ex: Formspree, EmailJS) ou backend.';
    form.reset();
  });
}
