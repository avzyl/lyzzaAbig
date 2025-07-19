// carousel setup
const container = document.querySelector(".carousel-container");
const images = container.querySelectorAll("img");
let index = 0;

function showImage(i) {
  images.forEach((img, idx) => {
    const isActive = idx === i;
    img.classList.toggle("active", isActive);
    img.style.zIndex = isActive ? "10" : "1";
    img.style.setProperty("--angle", isActive ? "0deg" : img.dataset.angle || "0deg");
  });
}

function randomRotate() {
  images.forEach(img => {
    const angle = Math.floor(Math.random() * 9) - 5; // -5° to +4°
    img.dataset.angle = `${angle}deg`;
    img.style.setProperty("--angle", `${angle}deg`);
  });
}

function next() {
  index = (index + 1) % images.length;
  showImage(index);
}

function prev() {
  index = (index - 1 + images.length) % images.length;
  showImage(index);
}

// mobile
function setupMobileCarousel() {
  if (window.innerWidth <= 768) {
    randomRotate();
    showImage(index);
  } else {
    images.forEach(img => img.classList.remove("active"));
  }
}

window.addEventListener("resize", setupMobileCarousel);
window.addEventListener("load", setupMobileCarousel);

// carousel pop-up
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupTitle = document.getElementById("popup-title");
const popupClose = document.getElementById("popup-close");
const visitBtn = document.querySelector(".visit-btn");

images.forEach(img => {
  img.addEventListener("click", () => {
    popup.classList.remove("hidden");
    popupImg.src = img.src;
    popupTitle.textContent = img.dataset.title || "No title available";
    visitBtn.href = img.dataset.link || "#";
    visitBtn.target = "_blank";
    visitBtn.rel = "noopener noreferrer";
  });
});

popupClose.addEventListener("click", () => {
  popup.classList.add("hidden");
  popupImg.src = "";
  popupTitle.textContent = "";
});

// popupMe
const popupMe = document.getElementById("popupMe");
const popupMyImg = document.getElementById("popupMe-img");
const myImg = document.querySelector(".myImg");

myImg.addEventListener("click", () => {
  popupMe.classList.remove("hidden");
  popupMyImg.src = myImg.src;
});

popupMe.addEventListener("click", (event) => {
  if (event.target === popupMe) {
    popupMe.classList.add("hidden");
    popupMyImg.src = "";
  }
});
