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
    const angle = Math.floor(Math.random() * 9) - 5; // -10° to +10°
    img.dataset.angle = `${angle}deg`;
    img.style.setProperty("--angle", `${angle}deg`);
  });
}



function next() {
  index = (index + 1) % images.length; // Wraps back to 0
  showImage(index);
}

function prev() {
  index = (index - 1 + images.length) % images.length; // Wraps to last image if index < 0
  showImage(index);
}


// Only apply on mobile
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
    visitBtn.target = "_blank"; // Open in new tab
    visitBtn.rel = "noopener noreferrer"; // Prevent security risks
  });
});

popupClose.addEventListener("click", () => {
  popup.classList.add("hidden");
});


popupClose.addEventListener("click", () => {
  popup.classList.add("hidden");
  popupImg.src = "";
  popupTitle.textContent = "";
});
