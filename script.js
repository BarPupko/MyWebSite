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
      category: "Landscape",
    },
    {
      src: "./imgaes/Landscape/CloseRedBridge.jpg",
      title: "A Plane in golden gate",
      location: "San Francisco",
      category: "Landscape",
    },
    {
      src: "/imgaes/Landscape/BarCarmit.jpg",
      title: "Golden Bridge Selfie",
      location: "San Francisco",
      category: "Landscape",
    },
    // second line

    {
      src: "./imgaes/Landscape/Soldiers (1).jpg",
      title: "Sunset Boulevard",
      location: "Park Shemer",
      category: "Landscape",
    },
    {
      src: "./imgaes/Landscape/Soldiers (2).jpg",
      title: "Urban Calm",
      location: "San Francisco",
      category: "Landscape",
    },
    {
      src: "./imgaes/Landscape/Soldiers (3).jpg",
      title: "Mountain Whisper",
      location: "Banff",
      category: "Landscape",
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
    CameraInfo.innerHTML =
      '<i class="fa-solid fa-camera"></i> ' + "Click for Camera Info";
    console.log("before the function");

    item.addEventListener("click", () => {
      storedViews++;
      localStorage.setItem(viewsKey, storedViews);
      viewCounter.textContent = `👁️ ${storedViews}`;

      lightboxImg.src = img.src;
      document.getElementById("lightbox-title").textContent = img.title;
      document.getElementById("lightbox-location").textContent = img.location;

      // Extract EXIF data
      EXIF.getData(image, function () {
        const make = EXIF.getTag(this, "Make") || "Unknown Make";
        const model = EXIF.getTag(this, "Model") || "Unknown Model";
        const iso = EXIF.getTag(this, "ISOSpeedRatings") || "Unknown ISO";
        const exposure = EXIF.getTag(this, "ExposureTime");
        const fNumber = EXIF.getTag(this, "FNumber");

        const exposureStr = exposure
          ? `1/${Math.round(1 / exposure)}s`
          : "Unknown Exposure";
        const fNumberStr = fNumber ? `f/${fNumber}` : "Unknown Aperture";

        document.getElementById("lightbox-exif").innerHTML = `
      <p><strong>Camera:</strong> ${make} ${model}</p>
      <p><strong>ISO:</strong> ${iso}</p>
      <p><strong>Aperture:</strong> ${fNumberStr}</p>
      <p><strong>Shutter Speed:</strong> ${exposureStr}</p>
    `;
      });

      lightbox.classList.remove("hidden");
    });
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

// progress bar
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

// accessability
nl_pos = "tr";
nl_color = "yellow";
nl_dir = "./nagishli_v3.0_beta_rev170120200211/nagishli_v3_beta/";
nl_lang = "he";

// Dark Theme
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("theme") || "light";
  
  document.documentElement.setAttribute("data-theme", currentTheme);

  toggleButton.addEventListener("click", () => {
    const theme = document.documentElement.getAttribute("data-theme");
    const newTheme = theme === "light" ? "dark" : "light";
    if (newTheme === "light") {
      toggleButton.checked = true;
      toggleButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }else{
      toggleButton.checked = false;
      toggleButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
});


//bubbles
