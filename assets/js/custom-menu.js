// assets/js/custom-menu.js

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.custom-menu-toggle');
    const menuList = document.querySelector('.custom-menu-list');

    if (menuToggle && menuList) {
        console.log('JS: Custom menu elements found. Initializing menu logic.');

        // Set initial state for mobile: menu is hidden.
        if (window.innerWidth <= 768) {
            menuList.style.display = 'none';
            menuToggle.setAttribute('aria-expanded', 'false');
            console.log('JS: Menu initialized hidden on mobile.');
        } else {
            // Ensure desktop state is correct
            menuList.style.display = ''; // Let CSS control on desktop
            menuList.classList.remove('open'); // Ensure no mobile open class
            menuToggle.removeAttribute('aria-expanded'); // Not strictly needed for desktop
            console.log('JS: Menu initialized for desktop.');
        }

        menuToggle.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation(); // Stop event from bubbling up to document click handler

            // DEBUGGING: Add debugger to check if click event reaches here
            // debugger; 

            console.log('JS: Custom menu toggle clicked!');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle 'open' class for CSS styling
            menuList.classList.toggle('open');

            // Force display property based on 'open' class existence
            if (menuList.classList.contains('open')) {
                menuList.style.display = 'flex'; // Force menu to display
                console.log('JS: Menu opened via direct style.display = "flex".');
            } else {
                menuList.style.display = 'none'; // Force menu to hide
                console.log('JS: Menu closed via direct style.display = "none".');
            }
        });

        // Close menu when a link inside is clicked (on mobile)
        menuList.querySelectorAll('.custom-menu-item a').forEach(link => {
            link.addEventListener('click', function() {
                console.log('JS: Menu link clicked, closing menu.');
                if (window.innerWidth <= 768) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuList.classList.remove('open');
                    menuList.style.display = 'none';
                }
            });
        });

        // Close menu if click outside (on mobile)
        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 768 && menuList.classList.contains('open')) {
                if (!menuList.contains(event.target) && !menuToggle.contains(event.target)) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuList.classList.remove('open');
                    menuList.style.display = 'none';
                    console.log('JS: Clicked outside. Menu closed.');
                }
            }
        });

        // Handle window resize for responsive behavior
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                // On desktop, ensure menu is always visible and mobile styles are removed
                menuList.style.display = ''; // Let CSS take over
                menuList.classList.remove('open');
                menuToggle.removeAttribute('aria-expanded');
                console.log('JS: Resized to desktop, menu reset.');
            } else {
                // On mobile, if not explicitly open, ensure it's hidden
                if (!menuList.classList.contains('open')) {
                    menuList.style.display = 'none';
                }
                menuToggle.setAttribute('aria-expanded', 'false'); // Ensure correct state for mobile
                console.log('JS: Resized to mobile.');
            }
        });

    } else {
        console.error('JS ERROR: Could not find custom menu toggle (.custom-menu-toggle) or menu list (.custom-menu-list). Please check your HTML classes.');
    }
});
