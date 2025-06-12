// assets/js/menu.js

document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.menu__btn');
    const menuList = document.querySelector('.menu__list');

    if (menuButton && menuList) {
        console.log('JS: Hamburger button and menu list found. Initializing menu logic.');

        // Add click event listener to the hamburger button
        menuButton.addEventListener('click', function(event) {
            // Prevent default action (e.g., if button is part of a form, prevent submit)
            event.preventDefault(); 
            event.stopPropagation(); // Stop event from bubbling up to document click handler immediately

            console.log('JS: Hamburger button clicked!');
            const isExpanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle the class that makes the menu visible
            menuList.classList.toggle('menu__list--open');
            console.log('JS: menu__list--open class toggled. Current state:', menuList.classList.contains('menu__list--open') ? 'OPEN' : 'CLOSED');
        });

        // Add click event listeners to all menu item links to close the menu
        menuList.querySelectorAll('.menu__item a.menu__link').forEach(link => {
            link.addEventListener('click', function() {
                console.log('JS: Menu item link clicked.');
                menuButton.setAttribute('aria-expanded', 'false');
                menuList.classList.remove('menu__list--open'); // Remove the open class
            });
        });

        // Add click event listener to the whole document to close menu if clicked outside
        document.addEventListener('click', function(event) {
            // Check if the click was outside of the menu list AND outside of the menu button
            // Only close if the menu is currently open
            if (menuList.classList.contains('menu__list--open')) {
                if (!menuList.contains(event.target) && !menuButton.contains(event.target)) {
                    menuButton.setAttribute('aria-expanded', 'false');
                    menuList.classList.remove('menu__list--open');
                    console.log('JS: Clicked outside menu. Menu closed.');
                }
            }
        });

    } else {
        console.error('JS ERROR: Could not find hamburger button (.menu__btn) or menu list (.menu__list). Please check your HTML classes.');
    }
});
