/* Ciro Sandes — melhorias progressivas, sem scripts de terceiros.
 * Conteúdo, links e acordeões nativos funcionam sem JavaScript.
 * O formulário prepara um e-mail; nunca simula um envio.
 */
(() => {
  'use strict';
  const root = document.documentElement;
  const body = document.body;
  root.classList.add('js-enabled');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobileViewport = window.matchMedia('(max-width: 900px)');
  let userPaused = false;
  let motionEnabled = !reducedMotion.matches;

  document.querySelectorAll('[data-year]').forEach(element => {
    element.textContent = String(new Date().getFullYear());
  });

  // Uma atualização por quadro em eventos de scroll, sem loop permanente.
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.reading-progress');
  let scrollQueued = false;
  function updateScroll() {
    const y = Math.max(0, window.scrollY);
    header?.classList.toggle('is-scrolled', y > 80);
    const distance = root.scrollHeight - window.innerHeight;
    if (progress) {
      progress.style.transform = `scaleX(${distance > 0 ? Math.min(1, y / distance) : 0})`;
    }
    scrollQueued = false;
  }
  function queueScroll() {
    if (!scrollQueued) {
      scrollQueued = true;
      requestAnimationFrame(updateScroll);
    }
  }
  window.addEventListener('scroll', queueScroll, { passive: true });
  window.addEventListener('resize', queueScroll, { passive: true });
  window.addEventListener('pageshow', queueScroll);
  updateScroll();

  // Menu móvel: Tab, Escape, foco e limpeza do estado ao ampliar a janela.
  const menu = document.getElementById('main-nav');
  const toggle = document.getElementById('nav-toggle');
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');
  function setMenu(open, returnFocus = false) {
    if (!menu || !toggle) return;
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    body.classList.toggle('nav-open', open);
    if (main) main.inert = open;
    if (footer) footer.inert = open;
    if (open) menu.querySelector('a')?.focus();
    else if (returnFocus) toggle.focus();
  }
  toggle?.addEventListener('click', () => {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true', true);
  });
  menu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
  });
  document.addEventListener('click', event => {
    if (menu?.classList.contains('open') && !header?.contains(event.target)) {
      setMenu(false, true);
    }
  });
  document.addEventListener('keydown', event => {
    if (!menu?.classList.contains('open')) return;
    if (event.key === 'Escape') {
      setMenu(false, true);
      return;
    }
    if (event.key !== 'Tab') return;
    const elements = [...menu.querySelectorAll('a'), toggle];
    const first = elements[0];
    const last = elements[elements.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
  mobileViewport.addEventListener('change', event => {
    if (!event.matches) setMenu(false);
  });

  // Só prepara animação em elementos fora da primeira tela.
  let revealObserver;
  if ('IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });
    if (motionEnabled) {
      document.querySelectorAll('[data-reveal]').forEach(element => {
        if (element.getBoundingClientRect().top > window.innerHeight - 30) {
          element.classList.add('will-reveal');
          revealObserver.observe(element);
        }
      });
    }
  }

  // Acordeão com altura medida. A semântica nativa de details é preservada.
  const accordions = [...document.querySelectorAll('.practice-item')];
  const activeAnimations = new Map();
  function animateDetails(details, open) {
    activeAnimations.get(details)?.cancel();
    const start = details.getBoundingClientRect().height;
    const summary = details.querySelector('summary');
    if (open) details.open = true;
    if (!motionEnabled || !details.animate) {
      details.open = open;
      details.style.height = '';
      activeAnimations.delete(details);
      queueScroll();
      return;
    }
    const end = open ? details.scrollHeight + 1 : summary.getBoundingClientRect().height + 1;
    const animation = details.animate({ height: [`${start}px`, `${end}px`] }, {
      duration: 360,
      easing: 'cubic-bezier(.22,1,.36,1)'
    });
    activeAnimations.set(details, animation);
    animation.onfinish = () => {
      details.open = open;
      details.style.height = '';
      activeAnimations.delete(details);
      queueScroll();
    };
    animation.oncancel = () => { details.style.height = ''; };
  }
  accordions.forEach(details => {
    details.querySelector('summary')?.addEventListener('click', event => {
      event.preventDefault();
      // Evita conflito de estado em cliques sucessivos durante a transição.
      if (activeAnimations.has(details)) return;
      const open = !details.open;
      if (open) {
        accordions.forEach(other => {
          if (other !== details && other.open) animateDetails(other, false);
        });
      }
      animateDetails(details, open);
    });
  });

  const motionButton = document.querySelector('[data-motion-toggle]');
  function syncMotion() {
    motionEnabled = !reducedMotion.matches && !userPaused;
    root.classList.toggle('motion-ready', motionEnabled);
    root.classList.toggle('motion-paused', !motionEnabled);
    if (!motionEnabled) {
      document.querySelectorAll('.will-reveal').forEach(element => element.classList.add('is-visible'));
      activeAnimations.forEach(animation => animation.finish());
    }
    if (!motionButton) return;
    motionButton.setAttribute('aria-pressed', String(!motionEnabled));
    motionButton.setAttribute('aria-label', reducedMotion.matches
      ? 'Movimento reduzido pelo dispositivo'
      : (motionEnabled ? 'Pausar animações' : 'Ativar animações'));
    motionButton.querySelector('[data-motion-label]').textContent = reducedMotion.matches
      ? 'Movimento reduzido'
      : (motionEnabled ? 'Pausar movimento' : 'Ativar movimento');
    motionButton.querySelector('.motion-icon').textContent = motionEnabled ? 'Ⅱ' : '▷';
    motionButton.disabled = reducedMotion.matches;
  }
  motionButton?.addEventListener('click', () => {
    userPaused = !userPaused;
    syncMotion();
  });
  reducedMotion.addEventListener('change', syncMotion);
  syncMotion();

  // Deslocamento sutil apenas com ponteiro preciso. Suspende fora da tela.
  const hero = document.querySelector('.hero');
  const art = document.querySelector('[data-parallax]');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (hero && art) {
    hero.addEventListener('pointermove', event => {
      if (!motionEnabled || !finePointer.matches) return;
      const rect = hero.getBoundingClientRect();
      art.style.setProperty('--art-x', `${((event.clientX - rect.left) / rect.width - 0.5) * 12}px`);
      art.style.setProperty('--art-y', `${((event.clientY - rect.top) / rect.height - 0.5) * 8}px`);
    }, { passive: true });
    hero.addEventListener('pointerleave', () => {
      art.style.setProperty('--art-x', '0px');
      art.style.setProperty('--art-y', '0px');
    }, { passive: true });
    if ('IntersectionObserver' in window) {
      const heroObserver = new IntersectionObserver(entries => {
        root.classList.toggle('hero-offscreen', !entries[0].isIntersecting);
      });
      heroObserver.observe(hero);
    }
    document.addEventListener('visibilitychange', () => {
      root.classList.toggle('page-is-hidden', document.hidden);
    });
  }

  // Sem backend, cookies ou armazenamento: preparar, revisar e enviar no e-mail.
  const form = document.getElementById('contact-form');
  if (form) {
    const subject = form.elements.assunto;
    const message = form.elements.mensagem;
    const count = document.getElementById('message-count');
    const status = document.getElementById('form-status');
    const copy = document.getElementById('copy-message');
    const selected = new URLSearchParams(window.location.search).get('assunto');
    if ([...subject.options].some(option => option.value === selected)) subject.value = selected;
    const updateCount = () => { if (count) count.textContent = String(message.value.length); };
    message.addEventListener('input', updateCount);
    updateCount();

    // Campos apenas com espaços não constituem nome ou mensagem válidos.
    const requiredText = [form.elements.nome, message];
    const validateText = () => requiredText.forEach(input => {
      input.setCustomValidity(input.value.trim() ? '' : 'Preencha este campo.');
    });
    requiredText.forEach(input => input.addEventListener('input', validateText));

    function prepareMessage() {
      const data = new FormData(form);
      const topic = subject.selectedOptions[0].textContent;
      const text = [
        'Olá, gostaria de entrar em contato com o escritório.', '',
        `Nome: ${String(data.get('nome')).trim()}`,
        `E-mail: ${String(data.get('email')).trim()}`,
        ...(String(data.get('telefone')).trim() ? [`Telefone: ${String(data.get('telefone')).trim()}`] : []),
        `Assunto: ${topic}`, '', String(data.get('mensagem')).trim()
      ].join('\n');
      return { subject: `Contato pelo site — ${topic}`, text };
    }
    form.addEventListener('invalid', () => { form.classList.add('was-validated'); }, true);
    form.addEventListener('submit', event => {
      event.preventDefault();
      form.classList.add('was-validated');
      validateText();
      if (!form.reportValidity()) return;
      const prepared = prepareMessage();
      status.textContent = 'Revise e confirme o envio no seu aplicativo de e-mail. Se ele não abrir, copie a mensagem e envie para aciso63@gmail.com.';
      copy.hidden = false;
      // O navegador abre o cliente de e-mail. Nenhum envio é feito aqui.
      window.location.href = `mailto:aciso63@gmail.com?subject=${encodeURIComponent(prepared.subject)}&body=${encodeURIComponent(prepared.text)}`;
    });
    form.querySelector('button[type="submit"]').disabled = false;
    copy?.addEventListener('click', async () => {
      validateText();
      if (!form.reportValidity()) return;
      const prepared = prepareMessage();
      const text = `${prepared.subject}\n\n${prepared.text}`;
      let copied = false;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
          copied = true;
        }
      } catch { /* Página local ou permissão negada: usa seleção de texto. */ }
      if (!copied) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.setAttribute('aria-label', 'Mensagem preparada para copiar');
        form.appendChild(textarea);
        textarea.select();
        try { copied = document.execCommand('copy'); } catch { copied = false; }
        if (copied) {
          textarea.remove();
          copy.focus();
        } else {
          status.textContent = 'Selecione e copie o texto no campo abaixo. O destino é aciso63@gmail.com.';
          textarea.focus();
          textarea.select();
          copy.hidden = true;
          return;
        }
      }
      status.textContent = 'Mensagem copiada. Cole no seu e-mail e envie para aciso63@gmail.com. O site não realizou nenhum envio.';
    });
  }
})();
