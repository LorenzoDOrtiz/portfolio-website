// Declare allTags in the global scope
let allTags = [];

document.addEventListener('DOMContentLoaded', () => {
    smoothScrolling();
    backToTopButton();
    extractTags();
    createFilterButtons();
});

function smoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetElement = document.querySelector(this.getAttribute('href'));

            if (targetElement) {
                const offset = 60; // Adjust the offset based on your fixed header height
                const targetPosition = targetElement.offsetTop - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth',
                });
            }
        });
    });
}

function backToTopButton() {
    const backToTopButton = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        scrollToTop(1000);
    });

    function scrollToTop(duration) {
        const start = window.pageYOffset;
        const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

        function scroll() {
            const now = 'now' in window.performance ? performance.now() : new Date().getTime();
            const time = Math.min(1, (now - startTime) / duration);

            window.scroll(0, Math.ceil((1 - time) * start + time * 0));

            if (time < 1) {
                requestAnimationFrame(scroll);
            }
        }

        scroll();
    }
}

function extractTags() {
    const projects = document.querySelectorAll('.project');
    allTags = [];

    projects.forEach((project) => {
        const tagsString = project.querySelector('.project-tags').innerText;
        const tags = tagsString.split(', ');

        tags.forEach((tag) => {
            if (!allTags.includes(tag)) {
                allTags.push(tag);
            }
        });
    });

    console.log(allTags);
}


function createFilterButtons() {
    const filterButtonsContainer = document.getElementById('filter-buttons');

    allTags.forEach((tag) => {
        const button = document.createElement('button');
        button.innerText = tag;
        button.id = tag;
        button.addEventListener('click', () => {
            toggleFilter(tag, button);
        });

        filterButtonsContainer.appendChild(button);
    });

    // Add event listener for the reset button
    const resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', () => {
        resetFilters();
    });
}




function toggleFilter(tag) {
    const projects = document.querySelectorAll('.project');

    // Toggle active class on the button
    const button = document.getElementById(tag);
    button.classList.toggle('active');

    // Filter projects based on selected tags
    projects.forEach((project) => {
        const projectTagsString = project.querySelector('.project-tags').innerText;
        const projectTags = projectTagsString.split(', ');

        // Check if at least one selected tag is present in the project
        const showProject = Array.from(document.querySelectorAll('#filter-buttons button.active')).some((activeButton) => projectTags.includes(activeButton.innerText));

        // Toggle the project visibility
        project.style.display = showProject ? 'flex' : 'none'; // Set display to 'flex' to maintain the flexbox layout

        // Apply transition class to the clicked project's image
        if (showProject) {
            project.addEventListener('click', () => {
                const clickedImage = project.querySelector('.project-photo img');
                clickedImage.classList.add('centered');

                // Remove the 'centered' class from other images in the same project
                const otherImages = project.querySelectorAll('.project-photo img:not(.centered)');
                otherImages.forEach((img) => {
                    img.classList.remove('centered');
                });
            });
        }
    });
}


function resetFilters() {
    const buttons = document.querySelectorAll('#filter-buttons button');

    // Remove 'active' class from all buttons
    buttons.forEach((button) => {
        button.classList.remove('active');
    });

    // Show all projects
    const projects = document.querySelectorAll('.project');
    projects.forEach((project) => {
        project.style.display = 'flex'; // Set display to 'flex' to maintain the flexbox layout
    });
}

