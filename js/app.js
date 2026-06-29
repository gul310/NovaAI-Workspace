"use strict";

/* ==========================================================
   NovaAI Workspace
   Main JavaScript
   Version : 2.0
   Author  : Syeda Gul Andam Ali Kazmi
   ========================================================== */

/* ==========================================================
   DOM Ready Check
========================================================== */

document.addEventListener('DOMContentLoaded', function() {

    console.log('🚀 NovaAI Workspace Initialized');

    /* ==========================================================
       MOBILE NAVIGATION
    ========================================================== */

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {

        hamburger.addEventListener('click', function() {
            const isActive = navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isActive);
            hamburger.setAttribute(
                'aria-label',
                isActive ? 'Close Navigation' : 'Open Navigation'
            );
        });

        document.querySelectorAll('.nav-menu a').forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.setAttribute('aria-label', 'Open Navigation');
            });
        });

        document.addEventListener('click', function(event) {
            const isClickInside = navMenu.contains(event.target) ||
                                 hamburger.contains(event.target);
            if (!isClickInside && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.setAttribute('aria-label', 'Open Navigation');
            }
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.setAttribute('aria-label', 'Open Navigation');
                hamburger.focus();
            }
        });

    }

    /* ==========================================================
       BACK TO TOP BUTTON
    ========================================================== */

    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        backToTop.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }

    /* ==========================================================
       FAQ ACCORDION
    ========================================================== */

    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(function(question) {
        question.addEventListener('click', function() {
            const parent = this.parentElement;
            const isActive = parent.classList.contains('active');

            document.querySelectorAll('.faq-item').forEach(function(item) {
                item.classList.remove('active');
                const btn = item.querySelector('.faq-question');
                if (btn) {
                    btn.setAttribute('aria-expanded', 'false');
                }
            });

            if (!isActive) {
                parent.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
            }
        });

        question.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        });
    });

    /* ==========================================================
       DARK / LIGHT MODE TOGGLE
    ========================================================== */

    const themeToggle = document.getElementById('theme-toggle');

    if (themeToggle) {
        const savedTheme = localStorage.getItem('novaai-theme');

        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            themeToggle.textContent = '☀️';
        }

        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-mode');

            if (document.body.classList.contains('light-mode')) {
                this.textContent = '☀️';
                localStorage.setItem('novaai-theme', 'light');
            } else {
                this.textContent = '🌙';
                localStorage.setItem('novaai-theme', 'dark');
            }
        });

        themeToggle.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        });
    }

    /* ==========================================================
       HEADER SHADOW / STICKY EFFECT
    ========================================================== */

    const header = document.querySelector('.header');

    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 40) {
                header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
                header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.08)';
            } else {
                header.style.boxShadow = 'none';
                header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.06)';
            }
        });
    }

    /* ==========================================================
       COUNTER ANIMATION - FIXED FOR STATISTICS
    ========================================================== */

    // Select only stats-card h2 elements (Our Impact section)
    const counters = document.querySelectorAll('.stats-card h2');

    console.log('✅ Found counters:', counters.length);

    // Function to run counter animation
    const runCounter = function(counter) {
        // Get target from data-count attribute
        const target = parseInt(counter.getAttribute('data-count'));
        
        if (!target || isNaN(target)) {
            console.log('⚠️ No data-count attribute found for:', counter);
            return;
        }

        // Get suffix from current text (%, +, etc.)
        const currentText = counter.innerText.trim();
        const suffix = currentText.replace(/[0-9]/g, '').trim();
        
        console.log('🎯 Target:', target, 'Suffix:', suffix);

        // Set initial value to 0
        counter.innerText = '0' + (suffix ? ' ' + suffix : '');

        let current = 0;
        const duration = 2500; // 2.5 seconds
        const startTime = performance.now();

        // Animation function
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out cubic for smooth deceleration
            const eased = 1 - Math.pow(1 - progress, 3);
            current = Math.round(eased * target);

            // Format number with commas
            const formatted = current.toLocaleString();

            // Display with suffix
            if (suffix) {
                counter.innerText = formatted + ' ' + suffix;
            } else {
                counter.innerText = formatted;
            }

            // Continue animation until complete
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                // Final value
                const finalFormatted = target.toLocaleString();
                if (suffix) {
                    counter.innerText = finalFormatted + ' ' + suffix;
                } else {
                    counter.innerText = finalFormatted;
                }
                console.log('✅ Counter finished:', counter.innerText);
            }
        }

        // Start animation
        requestAnimationFrame(updateCounter);
    };

    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                console.log('👀 Counter in view:', entry.target);
                runCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all counters
    counters.forEach(function(counter) {
        counterObserver.observe(counter);
    });

    /* ==========================================================
       NEWSLETTER FORM VALIDATION
    ========================================================== */

    const newsletterForm = document.querySelector('.newsletter');

    if (newsletterForm) {
        const emailInput = newsletterForm.querySelector('input[type="email"]');

        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const email = emailInput.value.trim();
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!email) {
                showNotification('Please enter your email address.', 'error');
                emailInput.focus();
                emailInput.style.borderColor = '#EF4444';
                return;
            }

            if (!pattern.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                emailInput.focus();
                emailInput.style.borderColor = '#EF4444';
                return;
            }

            // Success
            emailInput.style.borderColor = '#10B981';
            showNotification('Thank you for subscribing! 🎉', 'success');
            newsletterForm.reset();

            setTimeout(function() {
                emailInput.style.borderColor = '';
            }, 3000);
        });

        emailInput.addEventListener('input', function() {
            if (this.style.borderColor === '#EF4444') {
                this.style.borderColor = '';
            }
        });
    }

    /* ==========================================================
       NOTIFICATION SYSTEM
    ========================================================== */

    function showNotification(message, type) {
        // Remove existing notification
        const existing = document.querySelector('.notification-toast');
        if (existing) {
            existing.remove();
        }

        const toast = document.createElement('div');
        toast.className = 'notification-toast';
        toast.textContent = message;

        const colors = {
            success: '#10B981',
            error: '#EF4444',
            info: '#4F46E5'
        };

        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%) translateY(20px);
            padding: 14px 28px;
            border-radius: 12px;
            color: #fff;
            font-weight: 600;
            font-size: 0.95rem;
            background: ${colors[type] || colors.info};
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.4s ease, transform 0.4s ease;
            max-width: 90%;
            text-align: center;
            pointer-events: none;
        `;

        document.body.appendChild(toast);

        // Trigger fade in
        requestAnimationFrame(function() {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0)';
        });

        // Auto dismiss after 3.5 seconds
        setTimeout(function() {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(-20px)';

            setTimeout(function() {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 400);
        }, 3500);
    }

    /* ==========================================================
       SCROLL REVEAL ANIMATION
    ========================================================== */

    const revealElements = document.querySelectorAll(
        '.feature-card, .workflow-card, .stats-card, ' +
        '.testimonial-card, .faq-item, .brand-card'
    );

    if (revealElements.length) {
        const revealObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function() {
                        entry.target.classList.add('visible');
                    }, index * 100);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -30px 0px'
        });

        revealElements.forEach(function(element) {
            element.classList.add('animate-fade-up');
            revealObserver.observe(element);
        });
    }

    /* ==========================================================
       SMOOTH SCROLL FOR ANCHOR LINKS
    ========================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                event.preventDefault();

                const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                const targetPosition = targetElement.getBoundingClientRect().top +
                                      window.pageYOffset -
                                      headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ==========================================================
       YEAR IN FOOTER
    ========================================================== */

    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2026', currentYear);
    }

    /* ==========================================================
       CONSOLE BRANDING
    ========================================================== */

    console.log('%c 🚀 NovaAI Workspace ', 'background: #4F46E5; color: #fff; padding: 8px 16px; border-radius: 8px; font-weight: bold; font-size: 16px;');
    console.log('%c Built by Syeda Gul Andam Ali Kazmi ', 'color: #22D3EE; font-size: 14px;');
    console.log('%c DecodeLabs Internship Project 2026 ', 'color: #9CA3AF; font-size: 12px;');

}); // End DOMContentLoaded