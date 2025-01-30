document.addEventListener("DOMContentLoaded", () => {
  const navContainer = document.querySelector(".nav-container");
  const navLinks = document.querySelector(".nav-links");

  // Create mobile menu toggle
  const menuToggle = document.createElement("button");
  menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  menuToggle.className = "menu-toggle";
  navContainer.appendChild(menuToggle);

  // Toggle menu function
  const toggleMenu = () => {
    navLinks.classList.toggle("active");
    menuToggle.innerHTML = navLinks.classList.contains("active")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  };

  // Menu event listeners
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navContainer.contains(e.target)) {
      navLinks.classList.remove("active");
      menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });

  // Close menu on resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navLinks.classList.remove("active");
      menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });

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

  const searchBtn = document.querySelector(".search-icon");
  searchBtn.addEventListener("click", () => {
    const location = document.getElementById("location").value;
    const type = document.getElementById("property-type").value;
  });

  document.querySelectorAll(".card-image").forEach((card) => {
    const images = card.dataset.images.split(",");
    let currentIndex = 0;

    setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      card.style.backgroundImage = `url(${images[currentIndex].trim()})`;
    }, 5000);
  });

  // Redirect function
  function redirectToProperties(type) {
    window.location.href = `properties.html?type=${type}`;
  }

  document.querySelectorAll(".property-card").forEach((card) => {
    const images = card.dataset.images.split(",").map((img) => img.trim());
    const container = card.querySelector(".property-images-container");
    let currentIndex = 0;

    // Initialize images
    images.forEach((imgSrc, index) => {
      const img = document.createElement("img");
      img.className = `property-image ${index === 0 ? "active" : ""}`;
      img.src = imgSrc;
      img.alt = `Property image ${index + 1}`;
      container.appendChild(img);
    });

    // Cycle images every 5 seconds
    const imageInterval = setInterval(() => {
      const images = container.querySelectorAll(".property-image");
      images[currentIndex].classList.remove("active");
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].classList.add("active");
    }, 5000);

    // Pause on hover
    card.addEventListener("mouseenter", () => clearInterval(imageInterval));
    card.addEventListener("mouseleave", () => {
      imageInterval = setInterval(cycleImages, 5000);
    });
  });

  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const form = e.target;
      const loadingOverlay = document.createElement("div");
      loadingOverlay.className = "loading-overlay";
      loadingOverlay.innerHTML = '<div class="quantum-loader"></div>';
      document.body.appendChild(loadingOverlay);

      try {
        hideMessages();
        if (!validateForm(form)) return;

        // Simulated API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // If successful
        showConfirmation(form.name.value);
        form.reset();
      } catch (error) {
        showError(error.message || "Submission failed. Please try again.");
      } finally {
        loadingOverlay.remove();
      }
    });
  }

  function validateForm(form) {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Clear previous errors
    document.querySelectorAll(".input-error").forEach((el) => el.remove());
    document
      .querySelectorAll(".input-hologram")
      .forEach((el) => el.classList.remove("error"));

    // Field validations
    if (!form.name.value.trim()) {
      showFieldError(form.name, "Name is required");
      isValid = false;
    }

    if (!emailRegex.test(form.email.value)) {
      showFieldError(form.email, "Invalid email address");
      isValid = false;
    }

    if (form.message.value.length < 20) {
      showFieldError(form.message, "Message must be at least 20 characters");
      isValid = false;
    }

    if (!form.gdpr?.checked) {
      showError("You must agree to our privacy policy");
      isValid = false;
    }

    return isValid;
  }

  function showFieldError(input, message) {
    const container = input.closest(".input-hologram");
    container.classList.add("error");
    const errorEl = document.createElement("div");
    errorEl.className = "input-error";
    errorEl.textContent = message;
    container.appendChild(errorEl);
  }

  function showConfirmation(name) {
    const confirmation = document.querySelector(".confirmation-message");
    const confirmationText = document.querySelector(".confirmation-text");
    const firstName = name.split(" ")[0] || "valued guest";

    confirmationText.innerHTML = `
      Thank you, ${firstName}!<br>
      <small>Our team will contact you shortly</small>
    `;
    confirmation.classList.add("active");
    setTimeout(() => confirmation.classList.remove("active"), 5000);
  }

  function showError(message) {
    const error = document.querySelector(".error-message");
    error.querySelector(".error-text").textContent = message;
    error.classList.add("active");
    setTimeout(() => error.classList.remove("active"), 5000);
  }

  function hideMessages() {
    document
      .querySelectorAll(".confirmation-message, .error-message")
      .forEach((el) => el.classList.remove("active"));
  }

  document.querySelectorAll(".social-wormhole").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      window.open(link.href, "_blank");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const propertyId = urlParams.get("id");

  // Sample property data (replace with actual data from your backend)
  const properties = {
    1: {
      title: "Beachfront Villa Malindi",
      bedrooms: 4,
      bathrooms: 3,
      price: 950,
      images: ["beach1.jpg", "beach2.jpg"],
    },
  };

  const property = properties[propertyId] || properties["1"];

  // Update page content
  document.getElementById("property-title").textContent = property.title;
  document.getElementById(
    "bedrooms"
  ).textContent = `${property.bedrooms} Bedrooms`;
  document.getElementById(
    "bathrooms"
  ).textContent = `${property.bathrooms} Bathrooms`;

  // Load images
  const gallery = document.querySelector(".property-gallery");
  property.images.forEach((img) => {
    const imgEl = document.createElement("img");
    imgEl.src = `images/${img}`;
    imgEl.alt = property.title;
    gallery.appendChild(imgEl);
  });
});

// Property card click handler
document.querySelectorAll(".property-card").forEach((card) => {
  card.addEventListener("click", (e) => {
    // Prevent navigation if clicking interactive elements
    if (e.target.tagName === "BUTTON" || e.target.tagName === "A") return;

    const propertyId = card.dataset.id;
    window.location.href = `property.html?id=${propertyId}`;
  });
});

// Explore button click handler
document.querySelectorAll(".explore-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const propertyId = e.target.closest(".property-card").dataset.id;
    window.location.href = `property.html?id=${propertyId}`;
  });
});
