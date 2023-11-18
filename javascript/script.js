


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});



document.addEventListener("DOMContentLoaded", function () {
    var backToTopButton = document.getElementById("backToTopBtn");

    window.addEventListener("scroll", function () {
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            backToTopButton.classList.add("show"); // Add the "show" class
        } else {
            backToTopButton.classList.remove("show"); // Remove the "show" class
        }
    });

    backToTopButton.addEventListener("click", function () {
        scrollToTop(1000); // Set the duration of the scroll animation (in milliseconds)
    });

    function scrollToTop(duration) {
        var start = window.pageYOffset;
        var startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

        function scroll() {
            var currentTime = 'now' in window.performance ? performance.now() : new Date().getTime();
            var timeElapsed = currentTime - startTime;
            var nextScroll = easeInOutQuad(timeElapsed, start, -start, duration);
            document.documentElement.scrollTop = nextScroll;

            if (timeElapsed < duration) {
                requestAnimationFrame(scroll);
            }
        }

        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(scroll);
    }
});





document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav_links');

    menuIcon.addEventListener('click', function () {
        navLinks.classList.toggle('show');
        menuIcon.classList.toggle('active');
    });
});
    

    < !--Add the JavaScript code for handling form submission and displaying confirmation-- >

    document.addEventListener("DOMContentLoaded", function () {
        var contactForm = document.getElementById("contactForm");
        var confirmationMessage = document.getElementById("confirmationMessage");

        if (contactForm) {
            contactForm.addEventListener("submit", function (e) {
                e.preventDefault();

                // Use FormData to serialize the form data
                var formData = new FormData(contactForm);

                // Make an AJAX request to the action_page.php
                fetch(contactForm.action, {
                    method: 'POST',
                    body: formData
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === 'success') {
                            // Show green success confirmation
                            confirmationMessage.style.color = 'green';
                            confirmationMessage.textContent = data.message;

                            // Optionally, clear the form fields after successful submission
                            contactForm.reset();
                        } else {
                            // Show red failure confirmation
                            confirmationMessage.style.color = 'red';
                            confirmationMessage.textContent = data.message;
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            });
        }
    });

