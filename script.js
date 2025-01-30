// Replace all previous menu code in script.js with this:
document.addEventListener("DOMContentLoaded", () => {
  const navContainer = document.querySelector(".nav-container");
  const navLinks = document.querySelector(".nav-links");

  // Create toggle button
  const menuToggle = document.createElement("button");
  menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  menuToggle.className = "menu-toggle";
  navContainer.appendChild(menuToggle);

  // Toggle function
  const toggleMenu = () => {
    navLinks.classList.toggle("active");
    menuToggle.innerHTML = navLinks.classList.contains("active")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  };

  // Event listeners
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  document.addEventListener("click", (e) => {
    if (!navContainer.contains(e.target)) {
      navLinks.classList.remove("active");
      menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });

  navLinks.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      navLinks.classList.remove("active");
      menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
});

document.querySelectorAll(".card-image").forEach((card) => {
  const images = card.dataset.images.split(",");
  let currentIndex = 0;

  setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    card.style.backgroundImage = `url(${images[currentIndex].trim()})`;
  }, 5000);
});

document.querySelectorAll(".property-card").forEach((card) => {
  const images = card.dataset.images.split(",").map((img) => img.trim());
  const imageContainer = card.querySelector(".property-images");
  let currentIndex = 0;

  // Create image elements
  images.forEach((imgSrc, index) => {
    const img = document.createElement("div");
    img.style.backgroundImage = `url(${imgSrc})`;
    img.className = `property-images ${index === 0 ? "active" : ""}`;
    imageContainer.appendChild(img);
  });

  // Cycle images every 5 seconds
  setInterval(() => {
    const images = card.querySelectorAll(".property-images");
    images[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add("active");
  }, 5000);

  // Click handler
  card.addEventListener("click", () => {
    const propertyType = card.dataset.type;
    window.location.href = `properties.html?type=${propertyType}`;
  });
});

const portalLinks = document.querySelectorAll(".nexus-link");
portalLinks.forEach((link) => {
  link.addEventListener("mouseover", () => {
    link.style.transform = `translateY(-10px) rotate(${
      Math.random() * 10 - 5
    }deg)`;
  });
  link.addEventListener("mouseout", () => {
    link.style.transform = "";
  });
});

// Crypto ticker simulation
setInterval(() => {
  const coinValue = document.querySelector(".coin-value");
  const currentValue = parseFloat(coinValue.textContent.replace("$", ""));
  const newValue = currentValue + (Math.random() - 0.5) * 20;
  coinValue.textContent = `$${newValue.toFixed(2)}`;
}, 3000);

// Smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
