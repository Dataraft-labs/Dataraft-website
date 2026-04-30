// ============ DataRaft - Shared JS ============
document.addEventListener('DOMContentLoaded', () => {

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  // Highlight active nav link
  const path = window.location.pathname.split('/').pop() || 'index';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index')) {
      a.classList.add('active');
    }
  });

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  // Tech tabs (home + tech page)
  const tabs = document.querySelectorAll('.tech-tab');
  const pillsContainer = document.querySelector('.tech-pills');
  if (tabs.length && pillsContainer) {
    const techData = {
      cloud: ['Amazon Web Services','Microsoft Azure','Google Cloud Platform'],
      frontend: ['React.js','Angular','Next.js','Vue.js','TypeScript'],
      backend: ['Java (Spring Boot)','Node.js','Python','.NET Core','Go'],
      mobile: ['React Native','Flutter','iOS (Swift)','Android (Kotlin)'],
      data: ['Snowflake','Databricks','Apache Spark','Kafka','TensorFlow','PyTorch'],
      devops: ['Docker','Kubernetes','Terraform','Jenkins','GitHub Actions','Azure DevOps']
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
    // initial
    const active = document.querySelector('.tech-tab.active') || tabs[0];
    active.classList.add('active');
    render(active.dataset.tab);
  }

  // Contact form
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
