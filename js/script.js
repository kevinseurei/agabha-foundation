// =========================================================
// AGABHA HOPE LADIES FOUNDATION — script.js
// Smooth scrolling, active nav, events loader, contact form
// =========================================================

document.addEventListener('DOMContentLoaded', function() {
    
    // =========================================================
    // 1. NAVIGATION — smooth scroll & active state
    // =========================================================
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbar = document.querySelector('.navbar');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href;
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                    
                    // Smooth scroll
                    const navHeight = navbar ? navbar.offsetHeight : 0;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollY = window.pageYOffset;
        const navHeight = navbar ? navbar.offsetHeight : 0;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // =========================================================
    // 2. EVENTS — load from data array
    // =========================================================
    const eventsData = [
        { date: "15 May", title: "Sanitary Towel Drive", location: "Kisumu, Kenya", time: "10:00 AM - 2:00 PM" },
        { date: "22 May", title: "Mentorship Workshop", location: "Nairobi, Kenya", time: "9:00 AM - 1:00 PM" },
        { date: "5 June", title: "Bible Camp for Kids", location: "Eldoret, Kenya", time: "8:00 AM - 4:00 PM" }
    ];

    function loadEvents() {
        const container = document.getElementById('eventsContainer');
        if (!container) return;
        
        container.innerHTML = '';
        eventsData.forEach(event => {
            const eventHTML = `
                <div class="col-md-4">
                    <div class="event-card">
                        <span class="badge">${event.date}</span>
                        <h5>${event.title}</h5>
                        <p><i class="fas fa-map-pin text-secondary me-2"></i>${event.location}</p>
                        <p><i class="far fa-clock text-secondary me-2"></i>${event.time}</p>
                    </div>
                </div>
            `;
            container.innerHTML += eventHTML;
        });
    }

    // =========================================================
    // 3. MODAL ACTION BUTTONS
    // =========================================================
    function setupModalActions() {
        const actionButtons = document.querySelectorAll('.modal-action-btn');
        
        actionButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                // If it has data-bs-toggle="modal", let Bootstrap handle it
                if (this.getAttribute('data-bs-toggle') === 'modal') {
                    return;
                }
                
                e.preventDefault();
                const target = this.getAttribute('href');
                const modal = this.closest('.modal');
                
                if (modal) {
                    const modalInstance = bootstrap.Modal.getInstance(modal);
                    if (modalInstance) {
                        modalInstance.hide();
                    }
                }
                
                setTimeout(function() {
                    if (target && target.startsWith('#')) {
                        const targetElement = document.querySelector(target);
                        if (targetElement) {
                            const navHeight = navbar ? navbar.offsetHeight : 0;
                            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }
                }, 300);
            });
        });
    }

    // =========================================================
    // 4. CONTACT FORM
    // =========================================================
    function setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = this.querySelector('input[placeholder="Your Name"]')?.value || '';
            const email = this.querySelector('input[placeholder="Email"]')?.value || '';
            const subject = this.querySelector('input[placeholder="Subject"]')?.value || '';
            const message = this.querySelector('textarea[placeholder="Message"]')?.value || '';
            
            // Show success message
            alert(`✅ Thank you for your message, ${name || 'friend'}!\n\n📧 We will get back to you soon.\n\n📞 For immediate response, call: 0720445393\n📧 Or email: heleatita@gmail.com`);
            
            // Reset form
            this.reset();
        });
    }

    // =========================================================
    // 5. DONATION BUTTONS — open modal
    // =========================================================
    function setupDonationButtons() {
        const donateButtons = document.querySelectorAll('[data-bs-target="#donateModal"]');
        
        donateButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Bootstrap handles the modal automatically via data attributes
                // Just log for debugging
                console.log('Donation modal opened');
            });
        });
    }

    // =========================================================
    // 6. VIEW ALL EVENTS BUTTON
    // =========================================================
    function setupViewAllEvents() {
        const viewAllBtn = document.querySelector('.events-section .btn-outline-primary');
        if (viewAllBtn) {
            viewAllBtn.addEventListener('click', function(e) {
                e.preventDefault();
                // Scroll to events section (already there)
                const eventsSection = document.querySelector('.events-section');
                if (eventsSection) {
                    const navHeight = navbar ? navbar.offsetHeight : 0;
                    const targetPosition = eventsSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    }

    // =========================================================
    // 7. VOLUNTEER BUTTONS
    // =========================================================
    function setupVolunteerButtons() {
        const volunteerBtns = document.querySelectorAll('.volunteer-section .btn-success');
        volunteerBtns.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                alert(`🙏 Thank you for your interest in volunteering!\n\n📞 Call us: 0720445393\n📧 Email: heleatita@gmail.com\n\nWe'll get back to you with more information.`);
            });
        });
    }

    // =========================================================
    // 8. INITIALIZE EVERYTHING
    // =========================================================
    
    // Load events
    loadEvents();
    
    // Setup all interactions
    setupModalActions();
    setupContactForm();
    setupDonationButtons();
    setupViewAllEvents();
    setupVolunteerButtons();

    // =========================================================
    // 9. ADD SCROLL ANIMATION (optional)
    // =========================================================
    function setupScrollAnimations() {
        const cards = document.querySelectorAll('.stat-card, .project-card, .event-card, .donation-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(card);
        });
    }

    // Run scroll animations (optional - you can enable by uncommenting)
    // setupScrollAnimations();

    console.log('✅ AGABHA HOPE LADIES FOUNDATION — site loaded successfully!');
});