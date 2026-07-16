// =========================================================
// AGABHA HOPE LADIES FOUNDATION — script.js
// Smooth scrolling, active nav, contact form
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
    // 2. MODAL ACTION BUTTONS
    // =========================================================
    function setupModalActions() {
        const actionButtons = document.querySelectorAll('.modal-action-btn');

        actionButtons.forEach(button => {
            button.addEventListener('click', function(e) {
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
    // 3. CONTACT FORM
    // =========================================================
    function setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = this.querySelector('input[placeholder="Your Name"]')?.value || '';

            alert(`✅ Thank you for your message, ${name || 'friend'}!\n\n📧 We will get back to you soon.\n\n📞 For immediate response, call: 0720445393\n📧 Or email: heleatita@gmail.com`);

            this.reset();
        });
    }

    // =========================================================
    // 4. DONATION BUTTONS — open modal
    // =========================================================
    function setupDonationButtons() {
        const donateButtons = document.querySelectorAll('[data-bs-target="#donateModal"]');

        donateButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                console.log('Donation modal opened');
            });
        });
    }

    // =========================================================
    // 5. INITIALIZE EVERYTHING
    // =========================================================

    setupModalActions();
    setupContactForm();
    setupDonationButtons();

    console.log('✅ AGABHA HOPE LADIES FOUNDATION — site loaded successfully!');
});