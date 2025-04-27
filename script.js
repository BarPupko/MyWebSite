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
      title: "Golden Gate Bridge",
      location: "San Francisco",
      CameraInfo: "200ISO/1O99 ",
    },
    {
      src: "./imgaes/Landscape/CloseRedBridge.jpg",
      title: "A Plane in golden gate",
      location: "San Francisco",
      CameraInfo: "200ISO/1O99 ",
    },
    {
      src: "/imgaes/Landscape/BarCarmit.jpg",
      title: "Golden Bridge Selfie",
      location: "San Francisco",
      CameraInfo: "200ISO/1O99 ",
    },
    // second line

    {
      src: "./imgaes/Landscape/Soldiers (1).jpg",
      title: "Sunset Boulevard",
      location: "Park Shemer",
      CameraInfo: "200ISO/1O99 ",
    },
    {
      src: "./imgaes/Landscape/Soldiers (2).jpg",
      title: "Urban Calm",
      location: "San Francisco",
      CameraInfo: "200ISO/1O99 ",
    },
    {
      src: "./imgaes/Landscape/Soldiers (3).jpg",
      title: "Mountain Whisper",
      location: "Banff",
      CameraInfo: "200ISO/1O99 ",
    },
    // second line
    // {
    //   src: "./imgaes/1.png",
    //   title: "Urban Calm",
    //   location: "New York City",
    // },
    // {
    //   src: "./imgaes/1.png",
    //   title: "Mountain Whisper",
    //   location: "Banff",
    // },
  ];

  // Loop over each image and render it in the gallery
  images.forEach((img, index) => {
    const item = document.createElement("div");
    item.classList.add("gallery-item");

    const image = document.createElement("img");
    image.src = img.src;
    image.alt = img.title;
    const CameraInfo = document.createElement("div");
    CameraInfo.className = "CameraInfo";
    CameraInfo.innerHTML = '<i class="fa-solid fa-camera"></i> ' + "loading";
    console.log("before the function");

    image.onload = () => {
      EXIF.getData(image, function () {
        console.log(image.src);
        console.log("inside a function");
        const make = EXIF.getTag(this, "Make") || "Unknown Make";
        console.log(make);
        const model = EXIF.getTag(this, "Model") || "Unknown Model";
        console.log(model);
        const iso = EXIF.getTag(this, "ISOSpeedRatings") || "Unknown ISO";
        console.log(iso);
        const exposure = EXIF.getTag(this, "ExposureTime");
        console.log(exposure);
        const fNumber = EXIF.getTag(this, "FNumber");
        console.log(fNumber);

        const exposureStr = exposure
          ? `1/${Math.round(1 / exposure)}s`
          : "Unknown Exposure";
        const fNumberStr = fNumber ? `f/${fNumber}` : "Unknown Aperture";

        CameraInfo.innerHTML = `
        ${model}<br>
        ISO ${iso}<br>
        ${fNumberStr}<br>
        ${exposureStr}<br>
      `;
      });
    };
    console.log("after the function");

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
    item.appendChild(CameraInfo);

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

// open the image properties
item.addEventListener("click", () => {
  // Increase view count and store it
  storedViews++;
  localStorage.setItem(viewsKey, storedViews);
  viewCounter.textContent = `👁️ ${storedViews}`;

  // Show image in lightbox
  lightboxImg.src = img.src;
  lightbox.classList.remove("hidden");

  // Clear previous EXIF data
  const lightboxInfo = document.querySelector(".lightbox-info");
  lightboxInfo.innerHTML = "Loading EXIF data...";

  // Create a new Image object to extract EXIF data
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

// accessability
