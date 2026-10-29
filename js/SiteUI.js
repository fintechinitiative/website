document.addEventListener('DOMContentLoaded', () => {
  const page = location.pathname.split('/').pop() || 'index.html';
  const header = document.querySelector('.topnav');
  if (header) {
    const isLab = page === 'CryptoLab.html';
    // Replace only the navigation structure; retain page content and game controls.
    header.classList.add('site-header');
    header.innerHTML = `<div class="nav-inner"><a href="index.html" class="site-brand" aria-label="FinTech Initiative home"><img src="images/Logo.png" alt="FinTech Initiative logo"></a><button class="nav-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="site-links"><span></span><span></span><span></span></button><nav id="site-links" class="site-links" aria-label="Main navigation"><a href="FinancialLiteracy.html">Financial Literacy</a><a href="DigitalLiteracy.html">Digital Literacy</a><a href="AboutUs.html">About Us</a><a href="CryptoLab.html">Crypto Lab</a><a href="Join.html" class="nav-cta">Volunteer</a></nav></div>`;
    const toggle = header.querySelector('.nav-toggle');
    toggle.addEventListener('click', () => {
      const open = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    header.querySelectorAll('.site-links a').forEach(a => {
      if (a.getAttribute('href') === page) a.setAttribute('aria-current','page');
      a.addEventListener('click',()=> {header.classList.remove('nav-open');toggle.setAttribute('aria-expanded','false');});
    });
    document.addEventListener('keydown', e => {if(e.key==='Escape'){header.classList.remove('nav-open');toggle.setAttribute('aria-expanded','false');}});
  }
  // Native page anchors and the original lessons remain unchanged.
  if (page === 'index.html') {
    const row = document.querySelector('.ourcourses .row');
    const overlays = document.querySelector('.ourcourses .overrow');
    if (row && overlays) {
      const links = [...overlays.querySelectorAll('a[href]')];
      links.forEach((a,i)=>{
        a.classList.add('program-card');
        const photo=document.createElement('img');
        photo.src = i===0 ? 'images/FinLit.jpg' : 'images/DigLit.jpg';
        photo.alt=''; photo.className='program-photo'; photo.loading='lazy';
        a.prepend(photo);
      });
      row.remove();
    }
  }
  // Correct stale per-element sizing without rewriting content.
  document.querySelectorAll('img:not([alt])').forEach(img => img.setAttribute('alt',''));
  const observer = 'IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches
    ? new IntersectionObserver(items=>items.forEach(item=> {if(item.isIntersecting){item.target.classList.add('revealed');observer.unobserve(item.target);}}),{threshold:.08}) : null;
  if(observer) document.querySelectorAll('.ourcourses,.mission,.volunteer,.schools,.bios,.story,.missionimpact,.encase,.crypto-callout,.main,.lesson-layout').forEach(el=>{el.classList.add('reveal-ready');observer.observe(el);});
});
