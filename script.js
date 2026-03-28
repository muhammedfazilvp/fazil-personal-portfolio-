document.addEventListener('DOMContentLoaded', () => {
    // Typing Animation specific to Fazil's roles
    const typingText = document.querySelector('.typing-text');
    const roles = ['Manager.', 'Translator.', 'Digital Marketer.', 'Graphic Designer.'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        if (!typingText) return;
        
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before new word
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start typing effect
    setTimeout(typeEffect, 1000);

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Scroll Animation (Intersection Observer)
    const animateElements = document.querySelectorAll('.skill-category, .portfolio-item, .exp-body, .about-bio, .about-education, .section-header');
    
    // Add base class for animation
    animateElements.forEach(el => el.classList.add('animate-on-scroll'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animateElements.forEach(el => observer.observe(el));

    // Active Navigation Link Highlighting
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Form Submission Handling
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate form sending
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                formStatus.innerHTML = '<span style="color: #10b981;"><i class="fas fa-check-circle"></i> Message sent successfully! I will get back to you soon.</span>';
                
                setTimeout(() => {
                    formStatus.innerHTML = '';
                }, 5000);
            }, 1500);
        });
    }
});
