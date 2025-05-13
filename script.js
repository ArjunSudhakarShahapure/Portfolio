// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

// Toggle mobile menu
hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70; // Height of the fixed navbar
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll event listener for navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Form submitted! (Add your form submission logic)');
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// Enrollment Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('enrollmentPopup');
    const enrollBtn = document.querySelector('.course-cta .btn.primary');
    const closeBtn = document.querySelector('.close-popup');

    // Show popup when Enroll Now is clicked
    enrollBtn.addEventListener('click', function(e) {
        e.preventDefault();
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
    });

    // Close popup when close button is clicked
    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Close popup when clicking outside
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        }
    });

    // Handle form submission
    const enrollmentForm = document.querySelector('.enrollment-form');
    enrollmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you can add your form submission logic
        alert('Thank you for your interest! We will contact you soon.');
        popup.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
        enrollmentForm.reset();
    });
});

// Function to generate a unique visitor ID
function generateVisitorId() {
    return 'visitor_' + Math.random().toString(36).substr(2, 9);
}

// Function to update visitor count
function updateVisitorCount() {
    // Get or create visitor ID
    let visitorId = localStorage.getItem('visitorId');
    if (!visitorId) {
        visitorId = generateVisitorId();
        localStorage.setItem('visitorId', visitorId);
    }

    // Get current count from localStorage
    let count = parseInt(localStorage.getItem('visitorCount')) || 0;
    
    // Check if this visitor has already been counted
    let countedVisitors = JSON.parse(localStorage.getItem('countedVisitors')) || [];
    
    if (!countedVisitors.includes(visitorId)) {
        // Increment count only if this visitor hasn't been counted before
        count++;
        countedVisitors.push(visitorId);
        
        // Save updated data
        localStorage.setItem('visitorCount', count);
        localStorage.setItem('countedVisitors', JSON.stringify(countedVisitors));
    }
    
    // Update display with animation
    const counterElement = document.getElementById('visitorCount');
    counterElement.style.animation = 'none';
    counterElement.offsetHeight; // Trigger reflow
    counterElement.style.animation = 'pulse 2s infinite';
    counterElement.textContent = count;
}

// Update when page loads
document.addEventListener('DOMContentLoaded', updateVisitorCount);

// Optional: Add click effect
document.querySelector('.floating-counter').addEventListener('click', () => {
    const counter = document.querySelector('.floating-counter');
    counter.style.transform = 'scale(0.95)';
    setTimeout(() => {
        counter.style.transform = 'scale(1)';
    }, 100);
}); 
fetch('https://api.countapi.xyz/hit/arjun-portfolio/visits')
  .then(res => res.json())
  .then(res => {
    document.getElementById('visitorCount').textContent = res.value;
  }); 
