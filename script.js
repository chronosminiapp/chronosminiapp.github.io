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
    
    const colors = ['#18ac91', '#75d3ba', '#4c9df3', '#dfb459', '#d561cd'];
    const count = 40;
    
    // Add color styles to head
    let styleSheet = document.createElement('style');
    colors.forEach((color, index) => {
        styleSheet.textContent += `
            .hourglass-color-${index} {
                filter: drop-shadow(0 0 8px ${color}) brightness(1.5);
            }
            .hourglass-color-${index} img {
                filter: hue-rotate(${index * 60}deg) saturate(2) brightness(1.5);
            }
        `;
    });
    document.head.appendChild(styleSheet);
    
    for (let i = 0; i < count; i++) {
        const hourglass = document.createElement('div');
        hourglass.className = 'background-hourglass';
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random size between 20px and 60px
        const size = 30 + Math.random() * 50;
        
        // Random color from our palette
        const colorIndex = Math.floor(Math.random() * colors.length);
        
        // Random animation duration between 10s and 20s
        const duration = 10 + Math.random() * 10;
        
        // Random delay
        const delay = Math.random() * 5;
        
        // Random opacity between 0.1 and 0.3
        const opacity = 0.2 + Math.random() * 0.3;
        
        hourglass.style.cssText = `
            position: absolute;
            left: ${posX}%;
            top: ${posY}%;
            width: ${size}px;
            height: ${size}px;
            opacity: ${opacity};
            animation: float ${duration}s ease-in-out ${delay}s infinite;
            z-index: 0;
        `;
        
        hourglass.classList.add(`hourglass-color-${colorIndex}`);
        
        // Use the custom SVG
        const img = document.createElement('img');
        img.src = 'images/hourglass.svg';
        img.style.cssText = `
            width: 100%;
            height: 100%;
        `;
        
        hourglass.appendChild(img);
        container.appendChild(hourglass);
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchStats();
    createHourglassBackground();
    
    // Add scroll animation for sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
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