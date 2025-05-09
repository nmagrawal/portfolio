// Basic script
console.log("Script loaded!");

// Active link highlighting for navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('main section');

    function changeLinkState() {
        let index = sections.length;

        while(--index && window.scrollY + 100 < sections[index].offsetTop) {} // 100 is an offset

        navLinks.forEach((link) => link.classList.remove('active'));
        // Check if a section is found and if the corresponding link exists
        if (index >= 0 && navLinks[index]) {
            navLinks[index].classList.add('active');
        }
    }

    // Initial call to set active link on page load/refresh
    changeLinkState();
    // Event listener for scroll
    window.addEventListener('scroll', changeLinkState);

    // Smooth scrolling for all internal anchor links
    const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
    allAnchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hrefAttribute = this.getAttribute('href');
            // Ensure it's an internal link and not just "#"
            if (hrefAttribute.startsWith('#') && hrefAttribute.length > 1) {
                e.preventDefault();
                const targetId = hrefAttribute.substring(1); // Remove '#'
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });

                    // If the clicked link is part of the main navigation, update active state immediately
                    if (Array.from(navLinks).includes(this)) {
                        navLinks.forEach(link => link.classList.remove('active'));
                        this.classList.add('active');
                    }
                    // Optionally, update URL hash without page jump (can be useful for bookmarking/sharing)
                    // history.pushState(null, null, `#${targetId}`); 
                }
            }
        });
    });
});
