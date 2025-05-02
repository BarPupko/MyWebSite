// Array of image objects
const images = [
  {
    src: "./imgaes/SaveTheDate/Image1.jpeg",
    title: "Board with numbers",
    location: "Park Ha Amaqim",
    exactLocation: { x: 32.72370464226655, y: 35.11077493651688 },
    category: ["people", "SaveTheDate"],
  },
  {
    src: "./imgaes/SaveTheDate/Image2.jpeg",
    title: "Board with numbers",
    location: "Park Ha Amaqim",
    exactLocation: { x: 32.72370464226655, y: 35.11077493651688 },
    category: ["people", "SaveTheDate"],
  },
  {
    src: "./imgaes/SaveTheDate/Image3.jpeg",
    title: "Board with numbers",
    location: "Park Ha Amaqim",
    exactLocation: { x: 32.72370464226655, y: 35.11077493651688 },
    category: ["people", "SaveTheDate"],
  },
  {
    src: "./imgaes/Landscape/FarRedBridge.jpg",
    title: "Golden Gate Bridge",
    location: "San Francisco",
    exactLocation: { x: 37.81999562350799, y: -122.47855980317016 },
    category: "Landscape",
  },
  {
    src: "./imgaes/Landscape/CloseRedBridge.jpg",
    title: "A Plane in golden gate",
    location: "San Francisco",
    exactLocation: { x: 37.81999562350799, y: -122.47855980317016 },
    category: "Landscape",
  },
  {
    src: "/imgaes/Landscape/BarCarmit.jpg",
    title: "Golden Bridge Selfie",
    location: "San Francisco",
    exactLocation: { x: 32.72370464226655, y: 35.11077493651688 },
    category: ["people", "Landscape"],
  },
  {
    src: "./imgaes/Landscape/Soldiers (1).jpg",
    title: "Army Ranger",
    location: "Park Ha Amaqim",
    exactLocation: { x: 32.72370464226655, y: 35.11077493651688 },
    category: ["people", "animals"],
  },
  {
    src: "./imgaes/Landscape/Soldiers (2).jpg",
    title: "Testing Gear",
    location: "Park Ha Amaqim",
    exactLocation: { x: 32.72370464226655, y: 35.11077493651688 },
    category: ["Save The Date", "people"],
  },
  {
    src: "./imgaes/Landscape/Soldiers (3).jpg",
    title: "Soldier and it best buddy",
    location: "Park Ha Amaqim",
    exactLocation: { x: 32.72370464226655, y: 35.11077493651688 },
    category: ["people", "animals"],
  },
  {
    src: "./imgaes/Architecture/newyork_highline.jpg",
    title: "Zahara Hadid's Highline",
    location: "New York City",
    exactLocation: { x: 40.751195524475605, y: -74.00277159936631 },
    category: "architecture",
  },
  {
    src: "./imgaes/Architecture/edinbrugh.JPG",
    title: "The Lowry Theatre",
    location: "Edinburgh",
    exactLocation: { x: 53.470964667327905, y: -2.296001431344286 },
    category: "architecture",
  },
  {
    src: "./imgaes/Architecture/washington.jpg",
    title: "The Main Library",
    location: "Washington, D.C.",
    exactLocation: { x: 38.89243280246961, y: -77.00444342366481 },
    category: "architecture",
  },
  {
    src: "./imgaes/Sunset/sunset1.jpg",
    title: "Season of the Sea",
    location: "Kiryat Yam",
    exactLocation: { x: 32.84290262805934, y: 35.05803377995393 },
    category: "sunset",
  },
  {
    src: "./imgaes/Sunset/sunset2.jpg",
    title: "Season of the Sea",
    location: "Kiryat Yam",
    exactLocation: { x: 32.84290262805934, y: 35.05803377995393 },
    category: "sunset",
  },
  {
    src: "./imgaes/Sunset/sunset3.jpg",
    title: "Season of the Sea",
    location: "Haifa",
    exactLocation: { x: 32.84290262805934, y: 35.05803377995393 },
    category: "sunset",
  },
  {
    src: "./imgaes/Portrait/Carmit_sanfran.jpg",
    title: "Season of the Sea",
    location: "San Francisco",
    exactLocation: { x: 32.84290262805934, y: 35.05803377995393 },
    category: "Portrait",
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

      //deal with horizontal and vertical images
      const isPortrait = lightboxImg.naturalHeight > lightboxImg.naturalWidth;
      lightboxImg.classList.toggle("portrait", isPortrait);

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
        // Extract location data
        // Extract coordinates from exactLocation
        const lat = img.exactLocation.x;
        const lng = img.exactLocation.y;
        const locationIQKey = "pk.069fe51b456f904e1abfc7ab645dd9bd";

        // Static map image using LocationIQ
        const staticMapUrl = `https://maps.locationiq.com/v3/staticmap?key=${locationIQKey}&center=${lat},${lng}&zoom=13&size=300x150&markers=icon:small-red-cutout|${lat},${lng}`;

        // Optional: clickable Google Maps link
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

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
      const selectedCategory = button
        .getAttribute("data-category")
        .toLowerCase();

      galleryItems.forEach((item, index) => {
        const img = images[index];

        if (!img) {
          item.style.display = "none";
          return;
        }

        let itemCategories = img.category;

        // Ensure itemCategories is always an array
        if (!Array.isArray(itemCategories)) {
          itemCategories = [itemCategories];
        }

        // Lowercase all categories for comparison
        const lowerCaseCategories = itemCategories.map((cat) =>
          cat.toLowerCase()
        );

        if (
          selectedCategory === "all" ||
          lowerCaseCategories.includes(selectedCategory)
        ) {
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
