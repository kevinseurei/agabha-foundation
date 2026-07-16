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

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href;
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }

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
    // 2. CONTACT FORM
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

    setupContactForm();

    console.log('✅ AGABHA HOPE LADIES FOUNDATION — site loaded successfully!');
});