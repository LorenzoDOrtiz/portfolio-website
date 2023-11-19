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
        if (window.scrollY > 200) { 
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

document.addEventListener("DOMContentLoaded", function () {
    const projects = document.querySelectorAll(".project");
    const skillsSection = document.getElementById("skills-section");
    const filterButtonsContainer = document.getElementById("filter-buttons");
    const resetButton = document.getElementById("reset-button");

    // Extract unique skills from projects
    const skills = [...new Set(Array.from(projects).flatMap((project) => project.dataset.skills.split(" ")))];

    // Dynamically create filter buttons
    skills.forEach((skill) => {
        const button = document.createElement("button");
        button.textContent = skill;
        button.addEventListener("click", () => filterProjects(skill));
        filterButtonsContainer.appendChild(button);
    });

    // Add event listener to the reset button
    resetButton.addEventListener("click", () => resetFilters());

    // Function to filter projects based on the selected skill
    function filterProjects(skill) {
        projects.forEach((project) => {
            const projectSkills = project.dataset.skills.split(" ");
            const isSkillPresent = projectSkills.includes(skill);

            if (isSkillPresent) {
                project.style.display = "block";
            } else {
                project.style.display = "none";
            }
        });

        // Highlight the active filter button
        highlightActiveButton(skill);
    }

    // Function to reset filters and display all projects
    function resetFilters() {
        projects.forEach((project) => (project.style.display = "block"));
        // Remove active class from all buttons
        Array.from(filterButtonsContainer.children).forEach((button) => button.classList.remove("active"));
    }

    // Function to highlight the active filter button
    function highlightActiveButton(skill) {
        // Remove active class from all buttons
        Array.from(filterButtonsContainer.children).forEach((button) => button.classList.remove("active"));

        // Add active class to the selected button
        const activeButton = Array.from(filterButtonsContainer.children).find((button) => button.textContent === skill);
        activeButton.classList.add("active");
    }
});



