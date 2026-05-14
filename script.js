// Siva Malaragam - JavaScript

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar Scroll Effect (Top & Bottom)
    const navbar = document.getElementById('navbar');
    const mobileNav = document.getElementById('mobile-nav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Top Navbar scrolled state
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Bottom Nav Hide/Show Logic (YouTube style)
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down
            mobileNav.classList.add('nav-hidden');
        } else {
            // Scrolling up
            mobileNav.classList.remove('nav-hidden');
        }
        
        lastScrollY = currentScrollY;

        // Update active state in bottom nav
        updateActiveNav();
    });

    // Function to update active nav item based on section in view
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    function updateActiveNav() {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute("id");
            }
        });

        navItems.forEach((item) => {
            item.classList.remove("active");
            if (item.getAttribute("href").includes(current)) {
                item.classList.add("active");
            }
        });
    }

    // 2. Reveal Animations on Scroll
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // 3. Mobile Menu Toggle (Simplified)
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            // Since the CSS doesn't have the mobile-nav-active class yet, 
            // this is a placeholder for future implementation if needed.
            // For now, let's just alert or toggle visibility if we add it.
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'white';
            navLinks.style.padding = '20px';
            navLinks.style.textAlign = 'center';
            navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
    }

    // 4. Contact Form Submission (Email Redirect)
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Constructing the WhatsApp message body
            const whatsappMessage = encodeURIComponent(
                `*New Booking Inquiry*\n\n` +
                `*Name:* ${name}\n` +
                `*Phone:* ${phone}\n` +
                `*Service Requested:* ${service}\n` +
                `*Message:* ${message}`
            );
            
            // Using wa.me to open WhatsApp
            const whatsappNumber = "919043345140"; 
            window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
            
            // Optional: Show success message
            alert("Redirecting to WhatsApp to complete your booking...");
        });
    }

    // 5. Smooth Scroll for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

});
