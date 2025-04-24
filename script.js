// script.js
document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.querySelector(".gallery");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.querySelector(".lightbox-img");
    const closeBtn = document.querySelector(".close");
  
    const images = [
      {
        src: "./imgaes/1.png",
        title: "Sunset Boulevard",
        location: "Los Angeles"
      },
      {
        src: "./imgaes/1.png",
        title: "Urban Calm",
        location: "New York City"
      },
      {
        src: "./imgaes/1.png",
        title: "Mountain Whisper",
        location: "Banff"
      }
    ];
  
    images.forEach((img) => {
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
      pin.innerHTML = '<i class="fas fa-map-pin"></i> ' + img.location;
  
      item.appendChild(image);
      item.appendChild(caption);
      item.appendChild(pin);
  
      item.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightbox.classList.remove("hidden");
      });
  
      gallery.appendChild(item);
    });
  
    closeBtn.addEventListener("click", () => {
      lightbox.classList.add("hidden");
    });
  });
  