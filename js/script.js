/* ===========================================================
   Textile & Apparels — Main Script
=========================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Loading Screen ---------- */
  const loader = document.getElementById('loading-screen');
  window.addEventListener('load', () => {
    setTimeout(() => loader && loader.classList.add('hidden'), 400);
  });

  /* ---------- Sticky Navbar ---------- */
  const header = document.querySelector('header');
  const onScrollHeader = () => {
    if (window.scrollY > 60) header.classList.add('sticky');
    else header.classList.remove('sticky');
  };
  window.addEventListener('scroll', onScrollHeader);
  onScrollHeader();

  /* ---------- Mobile Menu ---------- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => navLinks.classList.remove('open'))
    );
  }

  /* ---------- Active Menu Highlight ---------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ---------- Scroll Progress Bar ---------- */
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    if (!progressBar) return;
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });

  /* ---------- Back to Top ---------- */
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('show', window.scrollY > 500);
    });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---------- Smooth Scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ---------- Hero Image Slider ---------- */
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dots span');
  if (slides.length) {
    let current = 0;
    const showSlide = (i) => {
      slides.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      slides[i].classList.add('active');
      if (dots[i]) dots[i].classList.add('active');
      current = i;
    };
    dots.forEach((d, i) => d.addEventListener('click', () => showSlide(i)));
    setInterval(() => showSlide((current + 1) % slides.length), 5000);
  }

  /* ---------- Scroll Reveal Animation ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Animated Counters ---------- */
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      let count = 0;
      const step = Math.max(target / 60, 1);
      const tick = () => {
        count += step;
        if (count >= target) {
          el.textContent = target + suffix;
        } else {
          el.textContent = Math.floor(count) + suffix;
          requestAnimationFrame(tick);
        }
      };
      tick();
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  /* ---------- FAQ Accordion ---------- */
  document.querySelectorAll('.acc-item').forEach(item => {
    const question = item.querySelector('.acc-question');
    const answer = item.querySelector('.acc-answer');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.acc-item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.acc-answer').style.maxHeight = null;
        }
      });
      item.classList.toggle('open', !isOpen);
      answer.style.maxHeight = !isOpen ? answer.scrollHeight + 'px' : null;
    });
  });

  /* ---------- Services Search Bar ---------- */
  const searchInput = document.getElementById('service-search');
  const searchBtn = document.getElementById('service-search-btn');
  const cards = document.querySelectorAll('.service-card');
  const runSearch = () => {
    const q = searchInput.value.trim().toLowerCase();
    cards.forEach(card => {
      const name = card.dataset.name ? card.dataset.name.toLowerCase() : card.textContent.toLowerCase();
      card.style.display = name.includes(q) ? '' : 'none';
    });
  };
  if (searchInput) {
    searchInput.addEventListener('input', runSearch);
    if (searchBtn) searchBtn.addEventListener('click', runSearch);
  }

  /* ---------- Gallery Lightbox ---------- */
  const galleryItems = document.querySelectorAll('.gallery-item img');
  const lightbox = document.getElementById('lightbox');
  if (lightbox && galleryItems.length) {
    const lightboxImg = lightbox.querySelector('img');
    let idx = 0;
    const open = (i) => {
      idx = i;
      lightboxImg.src = galleryItems[i].src;
      lightbox.classList.add('active');
    };
    galleryItems.forEach((img, i) => img.parentElement.addEventListener('click', () => open(i)));
    lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.classList.remove('active'));
    lightbox.querySelector('.lb-prev').addEventListener('click', () => open((idx - 1 + galleryItems.length) % galleryItems.length));
    lightbox.querySelector('.lb-next').addEventListener('click', () => open((idx + 1) % galleryItems.length));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('active'); });
  }

  /* ---------- Contact Form Validation ---------- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;
      const fields = {
        name: { el: this.querySelector('#name'), rule: v => v.trim().length >= 2, msg: 'Please enter your full name.' },
        email: { el: this.querySelector('#email'), rule: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: 'Please enter a valid email address.' },
        phone: { el: this.querySelector('#phone'), rule: v => /^[0-9+\-\s]{7,15}$/.test(v), msg: 'Please enter a valid phone number.' },
        subject: { el: this.querySelector('#subject'), rule: v => v.trim().length >= 3, msg: 'Please enter a subject.' },
        message: { el: this.querySelector('#message'), rule: v => v.trim().length >= 10, msg: 'Message should be at least 10 characters.' }
      };
      Object.values(fields).forEach(f => {
        if (!f.el) return;
        const group = f.el.closest('.form-group');
        if (!f.rule(f.el.value)) {
          group.classList.add('invalid');
          valid = false;
        } else {
          group.classList.remove('invalid');
        }
      });

      const statusBox = this.querySelector('.form-status');
      if (!valid) {
        if (statusBox) {
          statusBox.textContent = 'Please fix the highlighted fields before submitting.';
          statusBox.className = 'form-status error';
        }
        return;
      }

      const formData = new FormData(this);
      fetch('./backend/contact.php', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
        .then(res => res.text())
        .then(text => {
          let data;
          try {
            data = JSON.parse(text);
          } catch (err) {
            throw new Error('Invalid server response. Please run this site on a PHP-enabled server.');
          }
          if (statusBox) {
            statusBox.textContent = data.message || 'Message sent successfully!';
            statusBox.className = 'form-status ' + (data.success ? 'success' : 'error');
          }
          if (data.success) this.reset();
        })
        .catch((error) => {
          if (statusBox) {
            statusBox.textContent = error.message || 'Could not send message right now. Please try again later.';
            statusBox.className = 'form-status error';
          }
        });
    });
  }

  /* ---------- Newsletter Form ---------- */
  const newsletterForm = document.querySelector('.newsletter form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      if (input.value.trim()) {
        input.value = '';
        alert('Thanks for subscribing to Textile & Apparels updates!');
      }
    });
  }

});
const scriptURL = 'https://script.google.com/macros/s/AKfycbxnYihMDJqvtgblqtZW33CqPUbtyzxCGEt3zvFxqU9gTMkoCmC7Yu4-02PWhg6pdHKhkQ/exec';
const contactForm = document.querySelector('form');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    
    const formData = {
      name: document.querySelector('input[type="text"]')?.value || '',
      email: document.querySelector('input[type="email"]')?.value || '',
      subject: document.querySelector('input[name="subject"]')?.value || 'Contact Form',
      message: document.querySelector('textarea')?.value || ''
    };

    fetch(scriptURL, { 
      method: 'POST', 
      body: JSON.stringify(formData)
    })
    .then(response => {
       alert('Success! Message Google Sheet me save ho gaya.');
       contactForm.reset();
    })
    .catch(error => alert('Error! Data save nahi ho paya: ' + error.message));
  });
}