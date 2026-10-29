let slideIndex = 1;
function plusSlides(n) { showSlides(slideIndex + n); }
function currentSlide(n) { showSlides(n); }
function showSlides(n) {
  const slides = [...document.querySelectorAll('.mySlides')];
  if (!slides.length) return;
  slideIndex = ((n - 1 + slides.length) % slides.length) + 1;
  slides.forEach((slide, i) => {
    const active = i === slideIndex - 1;
    slide.style.display = active ? 'block' : 'none';
    slide.classList.toggle('is-active', active);
    slide.setAttribute('aria-hidden', String(!active));
  });
  document.querySelectorAll('.slide-dot').forEach((dot,i) => {
    dot.classList.toggle('is-active',i===slideIndex-1);
    dot.setAttribute('aria-current', String(i === slideIndex-1));
  });
}
document.addEventListener('DOMContentLoaded', () => {
  showSlides(slideIndex);
  const container = document.querySelector('.slideshow-container');
  if (!container) return;
  const dots = document.createElement('div'); dots.className = 'slideshow-dots';
  container.querySelectorAll('.mySlides').forEach((_, i) => {
    const dot = document.createElement('button'); dot.type='button'; dot.className='slide-dot';
    dot.setAttribute('aria-label', 'Show image '+(i+1));
    dot.addEventListener('click', () => currentSlide(i+1)); dots.append(dot);
  });
  container.append(dots); showSlides(slideIndex);
  let startX=null;
  container.addEventListener('touchstart', e => {startX=e.changedTouches[0].clientX;}, {passive:true});
  container.addEventListener('touchend', e => {if(startX===null)return;const dx=e.changedTouches[0].clientX-startX; if(Math.abs(dx)>50)plusSlides(dx<0?1:-1);startX=null;},{passive:true});
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!reduced.matches) {
    let timer=setInterval(() => plusSlides(1),6500);
    container.addEventListener('mouseenter',()=>clearInterval(timer));
    container.addEventListener('mouseleave',()=>{clearInterval(timer);timer=setInterval(()=>plusSlides(1),6500);});
    document.addEventListener('visibilitychange',()=>{clearInterval(timer);if(!document.hidden)timer=setInterval(()=>plusSlides(1),6500);});
  }
});
