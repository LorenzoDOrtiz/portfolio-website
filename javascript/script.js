document.addEventListener("DOMContentLoaded", function () {
    smoothScrolling();
    backToTopButton();
    toggleMenuIcon();
    filterProjects();
    setTopElementMargin();
});

function smoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

function backToTopButton() {
    const backToTopButton = document.getElementById("backToTopBtn");

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
}

function toggleMenuIcon() {
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav_links');

    menuIcon.addEventListener('click', function () {
        navLinks.classList.toggle('show');
        menuIcon.classList.toggle('active');
    });
}

function filterProjects() {
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
        button.addEventListener("click", () => filterProjectsBySkill(skill));
        filterButtonsContainer.appendChild(button);
    });

    // Add event listener to the reset button
    resetButton.addEventListener("click", () => resetFilters());

    function filterProjectsBySkill(skill) {
        projects.forEach((project) => {
            const projectSkills = project.dataset.skills.split(" ");
            const isSkillPresent = projectSkills.includes(skill);

            if (isSkillPresent) {
                project.style.display = "block";
            } else {
                project.style.display = "none";
            }
        });

        highlightActiveButton(skill);
    }

    function resetFilters() {
        projects.forEach((project) => (project.style.display = "block"));
        Array.from(filterButtonsContainer.children).forEach((button) => button.classList.remove("active"));
    }

    function highlightActiveButton(skill) {
        Array.from(filterButtonsContainer.children).forEach((button) => button.classList.remove("active"));
        const activeButton = Array.from(filterButtonsContainer.children).find((button) => button.textContent === skill);
        activeButton.classList.add("active");
    }
}

function setTopElementMargin() {
    const header = document.querySelector('header');
    const topElement = document.getElementById('top');
    const headerHeight = header.offsetHeight;

    topElement.style.marginTop = `-${headerHeight}px`;
}
