// script.js

// Array of image objects
const images = [
  {
    src: "./imgaes/Landscape/FarRedBridge.jpg",
    title: "Golden Gate Bridge",
    location: "San Francisco",
    exactLocation: { x: 37.8199, y: -122.4783 },
    category: "Landscape",
  },
  {
    src: "./imgaes/Landscape/CloseRedBridge.jpg",
    title: "A Plane in golden gate",
    location: "San Francisco",
    exactLocation: { x: 37.8199, y: -122.4783 },
    category: "Landscape",
  },
  {
    src: "/imgaes/Landscape/BarCarmit.jpg",
    title: "Golden Bridge Selfie",
    location: "San Francisco",
    exactLocation: { x: 37.8199, y: -122.4783 },
    category: "people",
  },
  {
    src: "./imgaes/Landscape/Soldiers (1).jpg",
    title: "Army Ranger",
    location: "Park Shemer",
    exactLocation: { x: 32.5674, y: 35.1234 },
    category: "people",
  },
  {
    src: "./imgaes/Landscape/Soldiers (2).jpg",
    title: "Urban Calm",
    location: "San Francisco",
    exactLocation: { x: 37.8199, y: -122.4783 },
    category: "people",
  },
  {
    src: "./imgaes/Landscape/Soldiers (3).jpg",
    title: "Mountain Whisper",
    location: "Banff",
    exactLocation: { x: 51.1784, y: -115.5708 },
    category: "people",
  },
  {
    src: "./imgaes/Architecture/newyork_highline.jpg",
    title: "High Line",
    location: "New York City",
    exactLocation: { x: 40.7480, y: -74.0048 },
    category: "architecture",
  },
  {
    src: "./imgaes/Architecture/edinbrugh.JPG",
    title: "HALL",
    location: "Edinburgh",
    exactLocation: { x: 55.9533, y: -3.1883 },
    category: "architecture",
  },
  {
    src: "./imgaes/Architecture/washington.jpg",
    title: "The Main Library",
    location: "Washington, D.C.",
    exactLocation: { x: 38.9072, y: -77.0369 },
    category: "architecture",
  },
];

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
      document.getElementById("lightbox-location").textContent = img.location; // you can remove this line if we only want inside the map

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

        // Build Google Maps search URL based on location
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          img.location
        )}`;

        // Optional: Static Map Image URL (basic preview thumbnail)
        const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(
          img.location
        )}&zoom=13&size=300x150&maptype=roadmap&markers=color:red%7C${encodeURIComponent(
          img.location
        )}&key=YOUR_GOOGLE_MAPS_API_KEY`;

        document.getElementById("lightbox-exif").innerHTML = `
    <a href="${googleMapsUrl}" target="_blank" style="display: inline-block; margin-bottom: 10px;">
      <img src="${staticMapUrl}" alt="Location Map" style="width: 100%; border-radius: 8px;">
    </a>
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
    } else {
      toggleButton.checked = false;
      toggleButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
});
// Category filtering
document.addEventListener("DOMContentLoaded", () => {
  const categoryButtons = document.querySelectorAll(".category-button");
  const galleryItems = document.querySelectorAll(".gallery-item");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category").toLowerCase();

      galleryItems.forEach((item, index) => {
        const itemCategory = images[index]?.category.toLowerCase();

        if (category === "all" || itemCategory === category) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });

      // Highlight the active button
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });
});

// bubble active button clicked -.333333333//todo redundant code ????
// document.querySelectorAll(".category-button").forEach((button) => {
//   button.addEventListener("click", () => {
//     // Remove 'active' class from all buttons
//     document
//       .querySelectorAll(".category-button")
//       .forEach((btn) => btn.classList.remove("active"));

//     // Add 'active' class to the clicked button
//     button.classList.add("active");

//     // Filter the gallery
//     const selectedCategory = button.getAttribute("data-category");
//     renderGallery(selectedCategory);
//   });
// });
