// assets/js/menu.js

document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.menu__btn');
    const menuList = document.querySelector('.menu__list');

    if (menuButton && menuList) {
        console.log('JS: Hamburger button and menu list found. Initializing menu logic.');

        // Initialize menu state for mobile: hide it explicitly if on mobile
        // This handles cases where CSS might not hide it properly initially
        if (window.innerWidth <= 768) { // Assuming 768px is the mobile breakpoint
            menuList.style.display = 'none';
            console.log('JS: Initializing menu as hidden on mobile.');
        } else {
            menuList.style.display = ''; // Reset for desktop (let CSS control)
        }

        // Add click event listener to the hamburger button
        menuButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default button action (e.g., form submission)
            event.stopPropagation(); // Stop event from bubbling up immediately (prevents document click from closing it)

            console.log('JS: Hamburger button clicked!');
            const isExpanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle the CSS class (still good practice for other styling)
            menuList.classList.toggle('menu__list--open');

            // Directly control the display property for maximum certainty
            if (menuList.classList.contains('menu__list--open')) {
                menuList.style.display = 'flex'; // Force display to flex
                console.log('JS: Menu opened via direct style.display = "flex".');
            } else {
                menuList.style.display = 'none'; // Force display to none
                console.log('JS: Menu closed via direct style.display = "none".');
            }
        });

        // Add click event listeners to all menu item links to close the menu
        menuList.querySelectorAll('.menu__item a.menu__link').forEach(link => {
            link.addEventListener('click', function() {
                console.log('JS: Menu item link clicked. Closing menu.');
                menuButton.setAttribute('aria-expanded', 'false');
                menuList.classList.remove('menu__list--open');
                // Only hide display if we are on mobile (desktop menu should stay visible)
                if (window.innerWidth <= 768) {
                    menuList.style.display = 'none';
                }
            });
        });

        // Add click event listener to the whole document to close menu if clicked outside
        document.addEventListener('click', function(event) {
            // Only attempt to close if the menu is currently open
            if (menuList.classList.contains('menu__list--open')) {
                // Check if the click was outside of the menu list AND outside of the menu button
                if (!menuList.contains(event.target) && !menuButton.contains(event.target)) {
                    menuButton.setAttribute('aria-expanded', 'false');
                    menuList.classList.remove('menu__list--open');
                    // Only hide display if we are on mobile
                    if (window.innerWidth <= 768) {
                        menuList.style.display = 'none';
                    }
                    console.log('JS: Clicked outside menu. Menu closed.');
                }
            }
        });

        // Handle window resize to ensure correct display on breakpoint change
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                // On desktop, ensure menu is visible and remove mobile-specific styles
                menuList.style.display = ''; // Reset to default (CSS controlled)
                menuList.classList.remove('menu__list--open'); // Ensure class is removed
                menuButton.setAttribute('aria-expanded', 'false'); // Reset aria attribute
                console.log('JS: Resized to desktop, menu reset.');
            } else {
                // On mobile, if menu is not open, hide it
                if (!menuList.classList.contains('menu__list--open')) {
                    menuList.style.display = 'none';
                    console.log('JS: Resized to mobile, menu hidden if not open.');
                }
            }
        });

    } else {
        console.error('JS ERROR: Could not find hamburger button (.menu__btn) or menu list (.menu__list). Please check your HTML classes and ensure they are correct.');
    }
});
