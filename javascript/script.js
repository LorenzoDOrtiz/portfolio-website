// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Back-to-top button functionality
document.addEventListener("DOMContentLoaded", function () {
    var backToTopButton = document.getElementById("backToTopBtn");

    window.addEventListener("scroll", function () {
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            backToTopButton.classList.add("show");
        } else {
            backToTopButton.classList.remove("show");
        }
    });

    backToTopButton.addEventListener("click", function () {
        scrollToTop(1000);
    });

    function scrollToTop(duration) {
        var start = window.pageYOffset;
        var startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

        function scroll() {
            var now = 'now' in window.performance ? performance.now() : new Date().getTime();
            var time = Math.min(1, (now - startTime) / duration);

            window.scroll(0, Math.ceil((1 - time) * start + time * 0));
            
            if (time < 1) {
                requestAnimationFrame(scroll);
            }
        }

        scroll();
    }
});

// Toggle menu icon and navigation links
document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav_links');

    menuIcon.addEventListener('click', function () {
        navLinks.classList.toggle('show');
        menuIcon.classList.toggle('active');
    });
});

// Form submission with AJAX
document.addEventListener("DOMContentLoaded", function () {
    var contactForm = document.getElementById("contactForm");
    var confirmationMessage = document.getElementById("confirmationMessage");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            // ... (form submission logic)
        });
    }
});
