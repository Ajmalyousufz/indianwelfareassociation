let startX, startY, isScrolling, resetTimeout;


const carousel = document.querySelector('.owl-carousel');

carousel.addEventListener('touchstart', function (e) {
  console.log('Touch Stated');
  startX = e.touches[0].pageX;
  startY = e.touches[0].pageY;
  isScrolling = undefined;  // Reset scrolling direction

  clearTimeout(resetTimeout);
});

carousel.addEventListener('touchmove', function (e) {
  console.log('Touch move');
  const dx = e.touches[0].pageX - startX;
  const dy = e.touches[0].pageY - startY;

  // Determine if scrolling is mostly vertical or horizontal
  if (isScrolling === undefined) {
    console.log('scrolling');
    isScrolling = Math.abs(dy) > Math.abs(dx);
  }

  if (isScrolling) {

    console.log('vertical scrolling');
    // If scrolling is vertical, let the page scroll
    //e.stopPropagation();
    carousel.style.pointerEvents = 'none';

    resetTimeout = setTimeout(function () {
      console.log('reset scrolling');
      carousel.style.pointerEvents = 'auto';
    }, 2000);

  } else {
    carousel.style.pointerEvents = 'auto';
  }
});