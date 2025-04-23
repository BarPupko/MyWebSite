(function() {
    const slides = document.querySelectorAll('.slider .slide');
    const prevBtn = document.querySelector('.nav-prev');
    const nextBtn = document.querySelector('.nav-next');
    const progressBar = document.querySelector('.progress-bar');
    let currentIndex = 0;
    const slideCount = slides.length;
    const intervalTime = 6000; // 6 seconds
    let timer;

    function resetProgress() {
      progressBar.style.transition = 'none';
      progressBar.style.width = '0';
      // Force reflow
      progressBar.offsetWidth;
      progressBar.style.transition = `width ${intervalTime}ms linear`;
      progressBar.style.width = '100%';
    }

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
      resetProgress();
    }

    function goTo(index) {
      clearInterval(timer);
      currentIndex = (index + slideCount) % slideCount;
      showSlide(currentIndex);
      startTimer();
    }

    function nextSlide() { goTo(currentIndex + 1); }
    function prevSlide() { goTo(currentIndex - 1); }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    function startTimer() {
      resetProgress();
      timer = setInterval(nextSlide, intervalTime);
    }

    // Initialize
    showSlide(currentIndex);
    startTimer();
  })();