// Animate stats numbers
function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    if (!obj) return;
    
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        obj.innerHTML = value.toLocaleString() + '+';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Fetch stats from API or use placeholder values
async function fetchStats() {
    try {
        // Replace with actual API endpoints when available
        const response = await fetch('https://chronosbackend.onrender.com/webapp/mining_users');
        const data = await response.json();
        
        // Update stats with real data
        animateValue('users-count', 0, 50000, 2000);
        animateValue('community-count', 0, 20000, 2000);
        animateValue('holders-count', 0, 15000, 2000);
        animateValue('active-count', 0, 8000, 2000);
        animateValue('online-count', 0, data.count || 1000, 2000);
    } catch (error) {
        console.error('Error fetching stats:', error);
        
        // Use placeholder values if API fails
        animateValue('users-count', 0, 50000, 2000);
        animateValue('community-count', 0, 20000, 2000);
        animateValue('holders-count', 0, 15000, 2000);
        animateValue('active-count', 0, 8000, 2000);
        animateValue('online-count', 0, 1000, 2000);
    }
}

// Generate animated hourglass background
function createHourglassBackground() {
    const container = document.querySelector('.hourglass-container');
    if (!container) return;
    
    const colors = ['#18ac91', '#4c9df3', '#d561cd', '#dfb459'];
    const isMobile = window.innerWidth <= 768;
    const count = isMobile ? 15 : 30;
    
    for (let i = 0; i < count; i++) {
        const hourglass = document.createElement('div');
        hourglass.className = 'background-hourglass';
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random size
        const size = isMobile ? 
            (20 + Math.random() * 30) : // 20-50px on mobile
            (30 + Math.random() * 50);  // 30-80px on desktop
        
        // Random color
        const colorIndex = Math.floor(Math.random() * colors.length);
        const color = colors[colorIndex];
        
        // Random animation duration
        const duration = 10 + Math.random() * 15;
        
        // Random delay
        const delay = Math.random() * 5;
        
        // Random opacity
        const opacity = 0.1 + Math.random() * 0.2;
        
        hourglass.style.cssText = `
            position: absolute;
            left: ${posX}%;
            top: ${posY}%;
            width: ${size}px;
            height: ${size}px;
            opacity: ${opacity};
            animation: float ${duration}s ease-in-out ${delay}s infinite;
            z-index: 0;
            filter: drop-shadow(0 0 10px ${color});
        `;
        
        // Create hourglass image
        const img = document.createElement('img');
        img.src = 'images/hourglass.png';
        img.alt = 'Hourglass';
        img.style.cssText = `
            width: 100%;
            height: 100%;
            object-fit: contain;
            filter: hue-rotate(${colorIndex * 90}deg);
        `;
        
        hourglass.appendChild(img);
        container.appendChild(hourglass);
    }
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
  // Create animated hourglass background
  createHourglassBackground();
  
  // Initialize stats animation
  initializeStats();
  
  // Add interaction to app mockups
  initializeMockups();
  
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // FAQ accordion functionality
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all FAQ items
      faqItems.forEach(faqItem => {
        faqItem.classList.remove('active');
      });
      
      // If the clicked item wasn't active, open it
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
  
  // Header scroll effect
  const header = document.querySelector('.header');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
      header.style.backdropFilter = 'blur(10px)';
    } else {
      header.style.boxShadow = 'none';
      header.style.backdropFilter = 'blur(5px)';
    }
    
    lastScrollTop = scrollTop;
  });
  
  // Form submission
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      // Simple validation
      if (!nameInput.value || !emailInput.value || !messageInput.value) {
        alert('Please fill in all fields');
        return;
      }
      
      // Simulate form submission
      const submitButton = contactForm.querySelector('.submit-button');
      const originalText = submitButton.textContent;
      
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        alert('Thank you for your message! We will get back to you soon.');
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }, 1500);
    });
  }
  
  // Add animation to feature cards
  const featureCards = document.querySelectorAll('.feature-card');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  featureCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.5s ease, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(card);
  });
  
  // Add animation to timeline items
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
        timelineObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = `opacity 0.5s ease, transform 0.5s ease ${index * 0.1}s`;
    timelineObserver.observe(item);
  });
  
  // Mobile menu toggle
  const createMobileMenu = () => {
    const header = document.querySelector('.header-content');
    const navLinks = document.querySelector('.nav-links');
    
    // Create mobile menu button
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.classList.add('mobile-menu-button');
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    // Insert button before nav links
    header.insertBefore(mobileMenuButton, navLinks);
    
    // Add toggle functionality
    mobileMenuButton.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileMenuButton.classList.toggle('active');
      
      if (mobileMenuButton.classList.contains('active')) {
        mobileMenuButton.innerHTML = '<i class="fas fa-times"></i>';
      } else {
        mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileMenuButton.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuButton.classList.remove('active');
        mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
    
    // Close menu when clicking a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove('active');
          mobileMenuButton.classList.remove('active');
          mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
        }
      });
    });
  };
  
  // Check if we need to create mobile menu
  if (window.innerWidth <= 768) {
    createMobileMenu();
  }
  
  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
      if (!document.querySelector('.mobile-menu-button')) {
        createMobileMenu();
      }
    }
    
    // Recreate hourglass background on resize
    const container = document.querySelector('.hourglass-container');
    if (container) {
      container.innerHTML = '';
      createHourglassBackground();
    }
  });
  
  // Add a scroll-to-top button
  const createScrollTopButton = () => {
    const button = document.createElement('button');
    button.classList.add('scroll-top-button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(button);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        button.classList.add('visible');
      } else {
        button.classList.remove('visible');
      }
    });
    
    // Scroll to top when clicked
    button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  };
  
  createScrollTopButton();
  
  // Add CSS for the new elements
  const addStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
      .mobile-menu-button {
        display: none;
        background: none;
        border: none;
        color: var(--white);
        font-size: 24px;
        cursor: pointer;
      }
      
      .scroll-top-button {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, var(--blue), var(--purple));
        color: var(--white);
        border: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s, visibility 0.3s, transform 0.3s;
        box-shadow: 0 4px 12px rgba(76, 157, 243, 0.3);
        z-index: 99;
      }
      
      .scroll-top-button.visible {
        opacity: 1;
        visibility: visible;
      }
      
      .scroll-top-button:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 16px rgba(76, 157, 243, 0.4);
      }
      
      @media (max-width: 768px) {
        .mobile-menu-button {
          display: block;
        }
        
        .nav-links {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: var(--dark-gray);
          flex-direction: column;
          padding: 20px;
          gap: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          transform: translateY(-100%);
          opacity: 0;
          visibility: hidden;
          transition: transform 0.3s, opacity 0.3s, visibility 0.3s;
          z-index: 99;
        }
        
        .nav-links.active {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }
      }
      
      @keyframes float {
        0%, 100% {
          transform: translateY(0) rotate(0deg);
        }
        50% {
          transform: translateY(-20px) rotate(10deg);
        }
      }
    `;
    document.head.appendChild(style);
  };
  
  addStyles();
});

// Function to initialize stats with animation
function initializeStats() {
  const stats = [
    { id: 'users-count', start: 0, end: 50000 },
    { id: 'community-count', start: 0, end: 20000 },
    { id: 'holders-count', start: 0, end: 15000 },
    { id: 'active-count', start: 0, end: 8000 }
  ];
  
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const stat = stats.find(s => s.id === id);
        if (stat) {
          animateValue(id, stat.start, stat.end, 2000);
        }
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  stats.forEach(stat => {
    const element = document.getElementById(stat.id);
    if (element) {
      statsObserver.observe(element);
    }
  });
}

// Initialize FAQ accordion functionality
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        // Set initial state
        if (item.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
            answer.style.maxHeight = '0px';
        }
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                const faqAnswer = faqItem.querySelector('.faq-answer');
                faqItem.classList.remove('active');
                faqAnswer.style.maxHeight = '0px';
            });
            
            // If the clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
    
    // Open the first FAQ item by default
    if (faqItems.length > 0 && !faqItems[0].classList.contains('active')) {
        faqItems[0].classList.add('active');
        const firstAnswer = faqItems[0].querySelector('.faq-answer');
        firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
    }
}

// Initialize navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Initialize animations
function initAnimations() {
    // Add fade-in animation to elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize mobile menu
function initMobileMenu() {
    if (window.innerWidth > 768) return;
    
    const header = document.querySelector('.header-content');
    const navLinks = document.querySelector('.nav-links');
    
    if (!header || !navLinks) return;
    
    // Check if mobile menu button already exists
    if (document.querySelector('.mobile-menu-button')) return;
    
    // Create mobile menu button
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.classList.add('mobile-menu-button');
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    // Insert button before nav links
    header.insertBefore(mobileMenuButton, navLinks);
    
    // Add toggle functionality
    mobileMenuButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuButton.classList.toggle('active');
        
        if (mobileMenuButton.classList.contains('active')) {
            mobileMenuButton.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuButton.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuButton.classList.remove('active');
            mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Close menu when clicking a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuButton.classList.remove('active');
            mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Add mobile menu styles
    if (!document.getElementById('mobile-menu-styles')) {
        const style = document.createElement('style');
        style.id = 'mobile-menu-styles';
        style.textContent = `
            @media (max-width: 768px) {
                .mobile-menu-button {
                    display: block;
                    background: none;
                    border: none;
                    color: var(--white);
                    font-size: 24px;
                    cursor: pointer;
                    z-index: 101;
                }
                
                .nav-links {
                    position: fixed;
                    top: 80px;
                    left: 0;
                    right: 0;
                    background: var(--dark-gray);
                    flex-direction: column;
                    padding: 20px;
                    gap: 16px;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    transform: translateY(-100%);
                    opacity: 0;
                    visibility: hidden;
                    transition: transform 0.3s, opacity 0.3s, visibility 0.3s;
                    z-index: 100;
                }
                
                .nav-links.active {
                    transform: translateY(0);
                    opacity: 1;
                    visibility: visible;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize contact form
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        // Simple validation
        if (!nameInput.value || !emailInput.value || !messageInput.value) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon.');
            nameInput.value = '';
            emailInput.value = '';
            messageInput.value = '';
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
}

// Initialize mockup interactions
function initMockupInteractions() {
    const mockups = document.querySelectorAll('.iphone-mockup');
    const mockupContainer = document.querySelector('.mockup-container');
    
    if (mockups.length > 0 && mockupContainer) {
        // Add hover effects to iPhone mockups
        mockups.forEach(mockup => {
            mockup.addEventListener('mouseenter', () => {
                mockups.forEach(m => {
                    if (m !== mockup) {
                        m.style.opacity = '0.5';
                        m.style.transform = m.style.transform.replace('scale(1)', 'scale(0.95)');
                    }
                });
                
                const currentTransform = mockup.style.transform || '';
                mockup.style.transform = currentTransform + ' scale(1.05) translateY(-10px)';
                mockup.style.zIndex = '10';
                
                const glowEffect = mockup.querySelector('.glow-effect');
                if (glowEffect) {
                    glowEffect.style.opacity = '1';
                }
            });
            
            mockup.addEventListener('mouseleave', () => {
                mockups.forEach(m => {
                    m.style.opacity = '1';
                    m.style.transform = m.style.transform.replace(' scale(0.95)', '').replace(' scale(1.05) translateY(-10px)', '');
                    m.style.zIndex = '';
                });
                
                const glowEffect = mockup.querySelector('.glow-effect');
                if (glowEffect) {
                    glowEffect.style.opacity = '0.6';
                }
            });
        });
        
        // Add parallax effect
        if (window.innerWidth > 768) {
            mockupContainer.addEventListener('mousemove', (e) => {
                const { left, top, width, height } = mockupContainer.getBoundingClientRect();
                const x = (e.clientX - left) / width - 0.5;
                const y = (e.clientY - top) / height - 0.5;
                
                mockups.forEach((mockup, index) => {
                    const factor = 15 - (index * 5);
                    const currentTransform = mockup.style.transform || '';
                    
                    // Remove any existing translate values
                    const cleanedTransform = currentTransform
                        .replace(/translateX\([^)]*\)/g, '')
                        .replace(/translateY\([^)]*\)/g, '');
                    
                    mockup.style.transform = `${cleanedTransform} translateX(${x * factor}px) translateY(${y * factor}px)`;
                });
            });
            
            mockupContainer.addEventListener('mouseleave', () => {
                mockups.forEach(mockup => {
                    const currentTransform = mockup.style.transform || '';
                    const cleanedTransform = currentTransform
                        .replace(/translateX\([^)]*\)/g, '')
                        .replace(/translateY\([^)]*\)/g, '');
                    
                    mockup.style.transform = cleanedTransform;
                });
            });
        }
    }
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true
    });
    
    // Initialize all components
    initNavigation();
    initFAQAccordion();
    initMobileMenu();
    initContactForm();
    initMockupInteractions();
    
    // Animate stats numbers
    const statsElements = document.querySelectorAll('.stat-value, .ton-stat-value, .metric-value');
    statsElements.forEach(element => {
        const finalValue = parseInt(element.textContent.replace(/[^0-9]/g, ''));
        animateValue(element, 0, finalValue, 2000);
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        initMobileMenu();
    });
});

// Add fade-in animation styles
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
    </style>
`); 