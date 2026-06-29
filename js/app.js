"use strict";

/* ==========================================================
   NovaAI Workspace
   Main JavaScript
========================================================== */

/* ==========================================================
   Mobile Navigation
========================================================== */

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {

    hamburger.addEventListener("click", () => {

        navMenu.classList.toggle("active");
        hamburger.classList.toggle("active");

    });

    document.querySelectorAll(".nav-menu a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");
            hamburger.classList.remove("active");

        });

    });

}

/* ==========================================================
   Back To Top Button
========================================================== */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

});

/* ==========================================================
   FAQ Accordion
========================================================== */

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {

    question.addEventListener("click", () => {

        const answer = question.nextElementSibling;

        const isVisible = answer.style.display === "block";

        document.querySelectorAll(".faq-answer").forEach(item => {

            item.style.display = "none";

        });

        if (!isVisible) {

            answer.style.display = "block";

        }

    });

});

/* ==========================================================
   Dark Mode
========================================================== */

const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {

            themeToggle.textContent = "☀️";

        } else {

            themeToggle.textContent = "🌙";

        }

    });

}

/* ==========================================================
   Header Shadow
========================================================== */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.20)";

    } else {

        header.style.boxShadow = "none";

    }

});

/* ==========================================================
   Active Navigation
========================================================== */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

/* ==========================================================
   Counter Animation
========================================================== */

const counters = document.querySelectorAll(".stats-card h2");

const runCounter = (counter) => {

    const target = parseInt(counter.innerText);

    if (isNaN(target)) return;

    let current = 0;

    const increment = Math.ceil(target / 100);

    const update = () => {

        current += increment;

        if (current >= target) {

            counter.innerText = target + "+";

        } else {

            counter.innerText = current;

            requestAnimationFrame(update);

        }

    };

    update();

};

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            runCounter(entry.target);

            observer.unobserve(entry.target);

        }

    });

});

counters.forEach(counter => observer.observe(counter));

/* ==========================================================
   Newsletter Validation
========================================================== */

const newsletter = document.querySelector(".newsletter");

if (newsletter) {

    newsletter.addEventListener("submit", (event) => {

        event.preventDefault();

        const email = newsletter.querySelector("input").value.trim();

        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!pattern.test(email)) {

            alert("Please enter a valid email address.");

            return;

        }

        alert("Thank you for subscribing!");

        newsletter.reset();

    });

}

/* ==========================================================
   Reveal Animation
========================================================== */

const revealElements = document.querySelectorAll(

    ".feature-card, .workflow-card, .stats-card, .testimonial-card"

);

const revealObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

            revealObserver.unobserve(entry.target);

        }

    });

}, {

    threshold: 0.15

});

revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(40px)";
    element.style.transition = ".7s ease";

    revealObserver.observe(element);

});

console.log("NovaAI Workspace Loaded Successfully");