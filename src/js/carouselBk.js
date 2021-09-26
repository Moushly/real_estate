const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.carousel__btn--right');
const prevBtn = document.querySelector('.carousel__btn--left');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
};

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
};

const hideShowArrows = (slides, prevBtn, nextBtn, targetDotIndex) => {
  if (targetDotIndex === 0) {
    prevBtn.classList.add('is-hidden');
    nextBtn.classList.remove('is-hidden');
  } else if (targetDotIndex === slides.length - 1) {
    prevBtn.classList.remove('is-hidden');
    nextBtn.classList.add('is-hidden');
  } else {
    prevBtn.classList.remove('is-hidden');
    nextBtn.classList.remove('is-hidden');
  }
};

prevBtn.addEventListener('click', (e) => {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex((slide) => slide === prevSlide);

  // move to prev Slide
  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(slides, prevBtn, nextBtn, prevIndex);
});

nextBtn.addEventListener('click', (e) => {
  console.log('hello');
  console.log(e.target);

  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex((slide) => slide === nextSlide);

  //move to next slide
  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevBtn, nextBtn, nextIndex);
});

slides.forEach(setSlidePosition);

dotsNav.addEventListener('click', (e) => {
  const targetDot = e.target.closest('button');

  if (!targetDot) return;

  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotsNav.querySelector('.current-slide');
  const targetDotIndex = dots.findIndex((dot) => dot === targetDot);

  const targetSlide = slides[targetDotIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrows(slides, prevBtn, nextBtn, targetDotIndex);
});
