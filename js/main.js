/**
 * YASH GOYAL - PROFESSIONAL PORTFOLIO SCRIPTS
 * Pure Vanilla JavaScript (ES6+)
 * Modules: Navigation, Scrollspy, Animations, Modals, Forms & Toasts
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. DYNAMIC CURRENT YEAR IN FOOTER
  // --------------------------------------------------------------------------
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 2. STICKY HEADER SCROLL STATE
  // --------------------------------------------------------------------------
  const header = document.querySelector('.site-header');
  const handleHeaderScroll = () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // --------------------------------------------------------------------------
  // 3. RESPONSIVE MOBILE NAVIGATION DRAWER
  // --------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const toggleMobileMenu = (forceClose = false) => {
    const isOpen = forceClose ? false : !mobileDrawer?.classList.contains('open');

    if (isOpen) {
      hamburgerBtn?.classList.add('open');
      hamburgerBtn?.setAttribute('aria-expanded', 'true');
      mobileDrawer?.classList.add('open');
      mobileOverlay?.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      hamburgerBtn?.classList.remove('open');
      hamburgerBtn?.setAttribute('aria-expanded', 'false');
      mobileDrawer?.classList.remove('open');
      mobileOverlay?.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  hamburgerBtn?.addEventListener('click', () => toggleMobileMenu());
  mobileOverlay?.addEventListener('click', () => toggleMobileMenu(true));

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => toggleMobileMenu(true));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer?.classList.contains('open')) {
      toggleMobileMenu(true);
    }
  });

  // --------------------------------------------------------------------------
  // 4. ACTIVE SECTION HIGHLIGHTING (SCROLLSPY)
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link[href^="#"]');

  const updateActiveNavLink = () => {
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Desktop
        desktopNavLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });

        // Mobile
        mobileNavLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  // --------------------------------------------------------------------------
  // 5. BACK TO TOP BUTTON
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top');

  const handleBackToTopVisibility = () => {
    if (window.scrollY > 400) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // --------------------------------------------------------------------------
  // 6. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-fade-up');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback if browser lacks IntersectionObserver
    revealElements.forEach((el) => el.classList.add('active'));
  }

  // --------------------------------------------------------------------------
  // 7. TOAST NOTIFICATION UTILITY
  // --------------------------------------------------------------------------
  const showToast = (message, icon = '✓') => {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-msg">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px)';
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  };

  // --------------------------------------------------------------------------
  // 8. ONE-CLICK EMAIL COPY HELPER
  // --------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailPlaceholderText = document.getElementById('contact-email-val')?.textContent?.trim() || 'your.email@example.com';

  copyEmailBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(emailPlaceholderText);
      showToast(`Email copied: ${emailPlaceholderText}`, '📋');
    } catch {
      // Fallback
      showToast(`Email: ${emailPlaceholderText}`, '✉️');
    }
  });

  // --------------------------------------------------------------------------
  // 9. CONTACT FORM SUBMISSION (FRONTEND-ONLY HANDLER)
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');

    const name = nameInput?.value.trim();
    const email = emailInput?.value.trim();
    const subject = subjectInput?.value.trim();
    const message = messageInput?.value.trim();

    if (!name || !email || !subject || !message) {
      showToast('Please fill out all required fields.', '⚠️');
      return;
    }

    // Basic email format check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showToast('Please enter a valid email address.', '⚠️');
      return;
    }

    // Simulate successful submission for frontend demo
    showToast(`Thank you, ${name}! Your message has been sent (Demo Mode).`, '🚀');
    contactForm.reset();

    // Log helpful instructions for user in browser console
    console.info(
      '%c[Portfolio Contact Form Guide]%c\nTo connect this form to your real inbox:\n1. Register free at https://formspree.io\n2. Set form action to https://formspree.io/f/YOUR_FORM_ID with method="POST"\n3. Or configure EmailJS with your Public Key.',
      'color: #06B6D4; font-weight: bold; font-size: 14px;',
      'color: #94A3B8;'
    );
  });

  // --------------------------------------------------------------------------
  // 10. MODAL DIALOGS (RESUME VIEWER & GUESS NUMBER GAME DEMO)
  // --------------------------------------------------------------------------
  const setupModal = (triggerId, modalId) => {
    const trigger = document.getElementById(triggerId);
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const closeBtn = modal.querySelector('.modal-close-btn');

    const openModal = () => {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    };

    trigger?.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });

    closeBtn?.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    });
  };

  setupModal('view-resume-btn', 'resume-modal');
  setupModal('hero-view-resume-btn', 'resume-modal');
  setupModal('guess-game-demo-btn', 'guess-game-modal');

  // --------------------------------------------------------------------------
  // 11. INTERACTIVE "GUESS THE NUMBER" MINI-DEMO (Recruiter Interactive Delight)
  // --------------------------------------------------------------------------
  let secretNumber = Math.floor(Math.random() * 100) + 1;
  let attempts = 0;

  const guessInput = document.getElementById('demo-guess-input');
  const guessSubmitBtn = document.getElementById('demo-guess-btn');
  const guessResetBtn = document.getElementById('demo-reset-btn');
  const guessLog = document.getElementById('demo-game-log');

  const addLog = (text, type = 'normal') => {
    if (!guessLog) return;
    const p = document.createElement('p');
    p.textContent = text;
    if (type === 'success') p.style.color = '#10B981';
    else if (type === 'warning') p.style.color = '#F59E0B';
    else if (type === 'error') p.style.color = '#EF4444';
    else p.style.color = '#38BDF8';
    guessLog.appendChild(p);
    guessLog.scrollTop = guessLog.scrollHeight;
  };

  const checkGuess = () => {
    if (!guessInput) return;
    const val = parseInt(guessInput.value, 10);
    if (isNaN(val) || val < 1 || val > 100) {
      addLog('⚠️ Please enter a number between 1 and 100.', 'warning');
      return;
    }

    attempts++;
    if (val === secretNumber) {
      addLog(`🎉 Correct! You guessed ${secretNumber} in ${attempts} attempts!`, 'success');
      guessSubmitBtn.disabled = true;
      guessInput.disabled = true;
    } else if (val < secretNumber) {
      addLog(`📉 Too Low! Guess higher than ${val} (Attempt ${attempts})`, 'normal');
    } else {
      addLog(`📈 Too High! Guess lower than ${val} (Attempt ${attempts})`, 'normal');
    }

    guessInput.value = '';
    guessInput.focus();
  };

  guessSubmitBtn?.addEventListener('click', checkGuess);
  guessInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') checkGuess();
  });

  guessResetBtn?.addEventListener('click', () => {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    if (guessLog) guessLog.innerHTML = '<p style="color:#64748B;">Game reset. Guess a number between 1 and 100:</p>';
    if (guessSubmitBtn) guessSubmitBtn.disabled = false;
    if (guessInput) {
      guessInput.disabled = false;
      guessInput.value = '';
      guessInput.focus();
    }
  });
});
