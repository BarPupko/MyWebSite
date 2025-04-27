// script.js

document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector(".gallery");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const closeBtn = document.querySelector(".close");

  // Keys to track each image separately in localStorage
  const imageKeys = [
    "img1",
    "img2",
    "img3",
    "img4",
    "img5",
    "img6",
    "img7",
    "img8",
    "img9",
  ];

  // Array of image objects
  const images = [
    {
      src: "./imgaes/Landscape/FarRedBridge.jpg",
      title: "Sunset Boulevard",
      location: "San Francisco",
    },
    {
      src: "./imgaes/Landscape/CloseRedBridge.jpg",
      title: "Urban Calm",
      location: "San Francisco",
    },
    {
      src: "/imgaes/Landscape/BarCarmit.jpg",
      title: "Mountain Whisper",
      location: "Banff",
    },
    {
      src: "./imgaes/Landscape/FarRedBridge.jpg",
      title: "Sunset Boulevard",
      location: "San Francisco",
    },
    {
      src: "./imgaes/Landscape/CloseRedBridge.jpg",
      title: "Urban Calm",
      location: "San Francisco",
    },
    {
      src: "/imgaes/Landscape/BarCarmit.jpg",
      title: "Mountain Whisper",
      location: "Banff",
    },
    { src: "./imgaes/1.png", title: "Urban Calm", location: "New York City" },
    { src: "./imgaes/1.png", title: "Mountain Whisper", location: "Banff" },
  ];

  // Loop over each image and render it in the gallery
  images.forEach((img, index) => {
    const item = document.createElement("div");
    item.classList.add("gallery-item");

    const image = document.createElement("img");
    image.src = img.src;
    image.alt = img.title;

    const caption = document.createElement("div");
    caption.className = "caption";
    caption.textContent = img.title;

    const pin = document.createElement("div");
    pin.className = "pin";
    pin.innerHTML = '<i class="fa-solid fa-location-dot"></i> ' + img.location;

    const viewsKey = imageKeys[index];
    let storedViews = parseInt(localStorage.getItem(viewsKey)) || 0;

    const viewCounter = document.createElement("div");
    viewCounter.className = "views";
    viewCounter.textContent = `👁️ ${storedViews}`;

    // Append all elements to the image block
    item.appendChild(image);
    item.appendChild(caption);
    item.appendChild(pin);
    item.appendChild(viewCounter);

    // When image is clicked
    item.addEventListener("click", () => {
      // Increase view count and store it
      storedViews++;
      localStorage.setItem(viewsKey, storedViews);
      viewCounter.textContent = `👁️ ${storedViews}`;

      // Show image in lightbox
      lightboxImg.src = img.src;
      lightbox.classList.remove("hidden");
    });

    // Add the item to the gallery
    gallery.appendChild(item);
  });

  // Close lightbox by clicking the "X"
  closeBtn.addEventListener("click", () => {
    lightbox.classList.add("hidden");
  });

  // Close lightbox by clicking the background (but not the image itself)
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.add("hidden");
    }
  });
});

(function () {
  const slides = document.querySelectorAll(".slider .slide");
  const prevBtn = document.querySelector(".nav-prev");
  const nextBtn = document.querySelector(".nav-next");
  const progressBar = document.querySelector(".progress-bar");
  let currentIndex = 0;
  const slideCount = slides.length;
  const intervalTime = 6000; // 6 seconds
  let timer;

  function resetProgress() {
    progressBar.style.transition = "none";
    progressBar.style.width = "0";
    // Force reflow
    progressBar.offsetWidth;
    progressBar.style.transition = `width ${intervalTime}ms linear`;
    progressBar.style.width = "100%";
  }

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
    resetProgress();
  }

  function goTo(index) {
    clearInterval(timer);
    currentIndex = (index + slideCount) % slideCount;
    showSlide(currentIndex);
    startTimer();
  }

  function nextSlide() {
    goTo(currentIndex + 1);
  }
  function prevSlide() {
    goTo(currentIndex - 1);
  }

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  function startTimer() {
    resetProgress();
    timer = setInterval(nextSlide, intervalTime);
  }

  // Initialize
  showSlide(currentIndex);
  startTimer();
})();
