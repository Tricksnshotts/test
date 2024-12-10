/**
* Template Name: DevFolio
* Template URL: https://bootstrapmade.com/devfolio-bootstrap-portfolio-html-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
 * Theme toggle (Light/Dark Mode)
 */
const themeToggleButton = document.querySelector('#theme-toggle'); // Add theme toggle functionality here
if (themeToggleButton) {
  const savedTheme = localStorage.getItem('theme') || 'light-background';
  document.body.className = savedTheme;

  themeToggleButton.addEventListener('click', () => {
    if (document.body.classList.contains('light-background')) {
      document.body.className = 'dark-background';
      localStorage.setItem('theme', 'dark-background');
    } else {
      document.body.className = 'light-background';
      localStorage.setItem('theme', 'light-background');
    }
  });
}
  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.querySelector(".php-email-form");
    const resultsContainer = document.querySelector(".results-container");
  
    if (contactForm && resultsContainer) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent default form submission
  
        // Collect form data
        const formData = {
          name: document.querySelector("[name='name']").value.trim(),
          email: document.querySelector("[name='email']").value.trim(),
          phone: document.querySelector("[name='phone']").value.trim(),
          address: document.querySelector("[name='address']").value.trim(),
          message: document.querySelector("[name='message']").value.trim(),
          attributes: [
            parseFloat(document.querySelector("[name='attribute1']").value),
            parseFloat(document.querySelector("[name='attribute2']").value),
            parseFloat(document.querySelector("[name='attribute3']").value),
            parseFloat(document.querySelector("[name='attribute4']").value),
            parseFloat(document.querySelector("[name='attribute5']").value),
          ],
        };
  
        // Validation for email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          alert("Please enter a valid email address.");
          return;
        }
  
        // Validation for phone (basic validation for digits and length)
        const phoneRegex = /^\+?[0-9]{7,15}$/;
        if (!phoneRegex.test(formData.phone)) {
          alert("Please enter a valid phone number (e.g., +123456789).");
          return;
        }
  
        // Validation for address (not empty)
        if (formData.address === "") {
          alert("Please enter a valid address.");
          return;
        }
  
        // Validate numeric attributes
        if (formData.attributes.some((attr) => isNaN(attr))) {
          alert("Please enter valid numeric values for all attributes.");
          return;
        }
  
        // Concatenate address (if needed, e.g., multiple lines to single line)
        formData.address = formData.address.replace(/\s+/g, " ").trim();
  
        // Calculate the average of numeric attributes
        const total = formData.attributes.reduce((sum, attr) => sum + attr, 0);
        const average = (total / formData.attributes.length).toFixed(2);
  
        // Determine the color for the average
        const averageColor =
          average < 50 ? "red" : average < 75 ? "orange" : "green";
  
        // Build the results HTML
        const resultsHTML = `
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <p><strong>Address:</strong> ${formData.address}</p>
          <p><strong>Message:</strong> ${formData.message}</p>
          ${formData.attributes
            .map(
              (attr, index) =>
                `<p><strong>Attribute ${index + 1}:</strong> ${attr}</p>`
            )
            .join("")}
          <p style="font-weight: bold; text-align: center; color: ${averageColor};">
            Average of Numeric Attributes: ${average}
          </p>
        `;
  
        // Display the results in the container
        resultsContainer.innerHTML = resultsHTML;
        resultsContainer.style.display = "block";
      });
    }
  });
  
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);
  (function () {
    "use strict";
  
    /**
     * Theme toggle (Light/Dark Mode)
     */
    const themeToggleButton = document.querySelector('#mode-toggle');
    const themeIcon = document.querySelector('#mode-icon');
    const body = document.body;
  
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light-background';
    body.className = savedTheme;
  
    // Update the icon based on the saved theme
    if (savedTheme === 'dark-background') {
      themeIcon.classList.replace('bi-moon-fill', 'bi-sun-fill');
    }
  
    // Toggle theme on button click
    themeToggleButton.addEventListener('click', () => {
      if (body.classList.contains('light-background')) {
        body.className = 'dark-background';
        localStorage.setItem('theme', 'dark-background');
        themeIcon.classList.replace('bi-moon-fill', 'bi-sun-fill');
      } else {
        body.className = 'light-background';
        localStorage.setItem('theme', 'light-background');
        themeIcon.classList.replace('bi-sun-fill', 'bi-moon-fill');
      }
    });
  })();
 
})();