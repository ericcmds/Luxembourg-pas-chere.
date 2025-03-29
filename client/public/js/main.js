// Main JavaScript file for Luxembourg Pas Chère

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Enable JavaScript detection
  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');
  
  // Initialize mobile menu
  initMobileMenu();
  
  // Initialize smooth scrolling for anchor links
  initSmoothScroll();
  
  // Initialize lazy loading of images
  initLazyLoading();
  
  // Initialize animations on scroll
  initScrollAnimations();
  
  // Initialize offer filtering (if available)
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (filterButtons.length > 0) {
    initFilterSystem();
  }
  
  // Initialize newsletter form (if available)
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    initNewsletter(newsletterForm);
  }
  
  // Initialize contact form (if available)
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    initContactForm(contactForm);
  }
});

/**
 * Initialize the mobile menu functionality
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.main-navigation');
  
  if (!menuToggle || !nav) return;
  
  menuToggle.addEventListener('click', function() {
    // Toggle the active class on the navigation
    nav.classList.toggle('active');
    
    // Update the aria-expanded attribute
    const isExpanded = nav.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', isExpanded);
    
    // Toggle the hamburger icon
    const hamburgerIcon = menuToggle.querySelector('.hamburger-icon');
    if (hamburgerIcon) {
      hamburgerIcon.classList.toggle('active');
    }
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (nav.classList.contains('active') && 
        !nav.contains(event.target) && 
        !menuToggle.contains(event.target)) {
      nav.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      
      const hamburgerIcon = menuToggle.querySelector('.hamburger-icon');
      if (hamburgerIcon) {
        hamburgerIcon.classList.remove('active');
      }
    }
  });
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
  // Only initialize if the browser doesn't support scroll-behavior
  if ('scrollBehavior' in document.documentElement.style) return;
  
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Initialize lazy loading for images
 */
function initLazyLoading() {
  // Use native lazy loading if supported
  if ('loading' in HTMLImageElement.prototype) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
  } else {
    // Fallback for browsers that don't support native lazy loading
    const lazyImages = document.querySelectorAll('img.lazy');
    
    if (lazyImages.length === 0) return;
    
    const lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          
          if (lazyImage.dataset.src) {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.remove('lazy');
            lazyImageObserver.unobserve(lazyImage);
          }
        }
      });
    });
    
    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  }
}

/**
 * Initialize animations on scroll
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  if (animatedElements.length === 0) return;
  
  const animationObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        animationObserver.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -10% 0px'
  });
  
  animatedElements.forEach(function(element) {
    animationObserver.observe(element);
  });
}

/**
 * Initialize the offer filtering system
 */
function initFilterSystem() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const offerCards = document.querySelectorAll('.offer-card');
  
  if (filterButtons.length === 0 || offerCards.length === 0) return;
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      
      // Filter the offers
      offerCards.forEach(card => {
        if (filter === 'all') {
          card.style.display = '';
        } else {
          const category = card.getAttribute('data-category');
          
          if (category === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });
}

/**
 * Initialize the newsletter signup form
 */
function initNewsletter(form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput ? emailInput.value : '';
    
    if (!email || !validateEmail(email)) {
      showFormMessage(form, 'Bitte geben Sie eine gültige E-Mail-Adresse ein.', 'error');
      return;
    }
    
    // Simulate form submission (in real implementation, send to server)
    const formData = new FormData(form);
    
    // Send form data via fetch API
    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Netzwerkantwort war nicht ok');
      }
      return response.json();
    })
    .then(data => {
      // Reset form and show success message
      form.reset();
      showFormMessage(form, 'Vielen Dank für Ihre Anmeldung!', 'success');
    })
    .catch(error => {
      showFormMessage(form, 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.', 'error');
    });
  });
}

/**
 * Initialize the contact form
 */
function initContactForm(form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const nameInput = form.querySelector('input[name="name"]');
    const emailInput = form.querySelector('input[name="email"]');
    const messageInput = form.querySelector('textarea[name="message"]');
    
    const name = nameInput ? nameInput.value : '';
    const email = emailInput ? emailInput.value : '';
    const message = messageInput ? messageInput.value : '';
    
    // Validate form
    let isValid = true;
    let errorMessage = '';
    
    if (!name) {
      isValid = false;
      errorMessage = 'Bitte geben Sie Ihren Namen ein.';
    } else if (!email || !validateEmail(email)) {
      isValid = false;
      errorMessage = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
    } else if (!message) {
      isValid = false;
      errorMessage = 'Bitte geben Sie eine Nachricht ein.';
    }
    
    if (!isValid) {
      showFormMessage(form, errorMessage, 'error');
      return;
    }
    
    // Send form data
    const formData = {
      name,
      email,
      message
    };
    
    fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Netzwerkantwort war nicht ok');
      }
      return response.json();
    })
    .then(data => {
      // Reset form and show success message
      form.reset();
      showFormMessage(form, 'Vielen Dank für Ihre Nachricht! Wir werden uns so schnell wie möglich bei Ihnen melden.', 'success');
    })
    .catch(error => {
      showFormMessage(form, 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.', 'error');
    });
  });
}

/**
 * Helper function to validate email format
 */
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

/**
 * Helper function to show form messages
 */
function showFormMessage(form, message, type) {
  let messageElement = form.querySelector('.form-message');
  
  if (!messageElement) {
    messageElement = document.createElement('div');
    messageElement.className = 'form-message';
    form.appendChild(messageElement);
  }
  
  messageElement.textContent = message;
  messageElement.className = `form-message ${type}`;
  
  // Automatically remove after 5 seconds
  setTimeout(() => {
    messageElement.classList.add('hiding');
    
    setTimeout(() => {
      messageElement.remove();
    }, 300);
  }, 5000);
}