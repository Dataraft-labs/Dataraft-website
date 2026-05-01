// ============ DataRaft Labs - Shared JS ============
document.addEventListener('DOMContentLoaded', () => {

  /* ── Mobile nav toggle ── */
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');

  if (toggle && links) {
    const openIcon  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>`;
    const closeIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>`;

    const openNav = () => {
      links.classList.add('open');
      toggle.innerHTML = closeIcon;
      document.body.style.overflow = 'hidden';
    };
    const closeNav = () => {
      links.classList.remove('open');
      toggle.innerHTML = openIcon;
      document.body.style.overflow = '';
    };

    toggle.addEventListener('click', () => {
      links.classList.contains('open') ? closeNav() : openNav();
    });

    links.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

    document.addEventListener('click', (e) => {
      if (links.classList.contains('open') &&
          !links.contains(e.target) &&
          !toggle.contains(e.target)) {
        closeNav();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && links.classList.contains('open')) closeNav();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeNav();
    });
  }

  /* ── Active nav link highlight ── */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ── Scroll reveal ── */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  /* ── Tech stack tabs ── */
  const tabs = document.querySelectorAll('.tech-tab');
  const pillsContainer = document.querySelector('.tech-pills');
  if (tabs.length && pillsContainer) {
    const techData = {
      cloud:    ['Amazon Web Services','Microsoft Azure','Google Cloud Platform'],
      frontend: ['React.js','Angular','Next.js','Vue.js','TypeScript'],
      backend:  ['Java (Spring Boot)','Node.js','Python','.NET Core','Go'],
      mobile:   ['React Native','Flutter','iOS (Swift)','Android (Kotlin)'],
      data:     ['Snowflake','Databricks','Apache Spark','Kafka','TensorFlow','PyTorch'],
      devops:   ['Docker','Kubernetes','Terraform','Jenkins','GitHub Actions','Azure DevOps']
    };
    const render = (key) => {
      pillsContainer.innerHTML = (techData[key] || [])
        .map(t => `<div class="tech-pill">${t}</div>`).join('');
    };
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        render(tab.dataset.tab);
      });
    });
    const active = document.querySelector('.tech-tab.active') || tabs[0];
    active.classList.add('active');
    render(active.dataset.tab);
  }

  /* ── Products category tabs ── */
  const prodBtns = document.querySelectorAll('.products-nav-btn');
  const prodCats = document.querySelectorAll('.product-category');
  if (prodBtns.length && prodCats.length) {
    prodBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        prodBtns.forEach(b => b.classList.remove('active'));
        prodCats.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        const target = document.getElementById('cat-' + btn.dataset.cat);
        if (target) target.classList.add('active');
      });
    });
  }

  /* ── Contact form ── */
  const form = document.querySelector('#contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const success = document.querySelector('.form-success');
      if (success) {
        success.classList.add('show');
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      form.reset();
      setTimeout(() => success && success.classList.remove('show'), 6000);
    });
  }
});
