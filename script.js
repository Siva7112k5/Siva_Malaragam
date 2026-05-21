// Siva Malaragam - JavaScript

document.addEventListener('DOMContentLoaded', () => {

    // 0. Splash Screen Logic
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
        setTimeout(() => {
            splashScreen.classList.add('hidden');
        }, 2000); // Hold for 2s before fading out
    }

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

    // 5. Smooth Scroll for all links (with navbar offset)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const navbarHeight = document.getElementById('navbar')?.offsetHeight || 80;
                const offset = 20; // extra breathing room
                const top = targetEl.getBoundingClientRect().top + window.scrollY - navbarHeight - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // 6. Dynamic Categorization & WhatsApp/Instagram Customization
    const allCards = document.querySelectorAll('.gallery-card');
    allCards.forEach(card => {
        const img = card.querySelector('img');
        const h3 = card.querySelector('h3');
        const p = card.querySelector('.card-info p');
        
        if (img && h3) {
            const imgSrc = img.getAttribute('src') || '';
            const imgName = imgSrc.split('/').pop().split('.')[0]; // e.g. "m1"
            const title = h3.textContent.trim();
            
            // Assign Occasion Categories dynamically (only for gallery cards)
            if (card.closest('#gallery')) {
                let category = 'wedding'; // default
                
                if (imgName.startsWith('m')) {
                    const num = parseInt(imgName.substring(1));
                    if ((num >= 37 && num <= 61) || num === 4 || num === 7 || num === 8 || num === 10 || num === 11 || num === 12 || num === 18 || num === 20 || num === 23 || (num >= 29 && num <= 36) || num === 65) {
                        category = 'temple';
                    } else if (num === 5 || num === 14 || num === 19 || num === 22 || num === 64) {
                        category = 'reception';
                    }
                } else if (imgName === '3rd') {
                    category = 'wedding reception temple'; // show everywhere
                }
                
                card.setAttribute('data-category', category);
            } else if (card.closest('#combos')) {
                card.setAttribute('data-category', 'combo');
            }
            
            // Create rich action links in the overlay (WhatsApp and Instagram)
            const isCombo = card.closest('#combos') !== null;
            const prefix = isCombo ? "காம்போ" : "மாலை";
            const message = `நான் இந்த ${prefix} book செய்ய விரும்புகிறேன்: ${title} (${imgName}). விலை சொல்லுங்கள்.`;
            
            const overlay = card.querySelector('.card-overlay');
            if (overlay) {
                overlay.innerHTML = `
                    <a href="https://wa.me/919443994187?text=${encodeURIComponent(message)}" target="_blank" class="btn-card">
                        <i class="fab fa-whatsapp"></i> WhatsApp Book
                    </a>
                    <a href="https://ig.me/m/siva_malaragam_offical" target="_blank" class="btn-card btn-instagram">
                        <i class="fab fa-instagram"></i> Instagram DM
                    </a>
                `;
            }
        }
    });

    // 7. Occasion Filter Tabs Logic
    const galleryCards = document.querySelectorAll('#gallery .gallery-card');
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');
            
            if (filterValue === 'combo') {
                const combosSection = document.getElementById('combos');
                if (combosSection) {
                    combosSection.scrollIntoView({ behavior: 'smooth' });
                }
                return;
            }
            
            // Update active states
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            galleryCards.forEach(card => {
                const cardCats = card.getAttribute('data-category') || '';
                if (filterValue === 'all' || cardCats.split(' ').includes(filterValue)) {
                    card.style.display = 'block';
                    // Trigger reflow & simple fade-in
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                        card.classList.add('active');
                    }, 50);
                } else {
                    card.style.display = 'none';
                    card.classList.remove('active');
                }
            });
        });
    });

    // 8. FAQ Accordion Toggling Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');
                
                // Close all items first
                faqItems.forEach(i => i.classList.remove('open'));
                
                // If it wasn't open, open it
                if (!isOpen) {
                    item.classList.add('open');
                }
            });
        }
    });

});
