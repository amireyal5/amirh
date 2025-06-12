// assets/js/menu.js

document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.menu__btn');
    const menuList = document.querySelector('.menu__list');

    if (menuButton && menuList) {
        // Toggle main menu visibility when hamburger button is clicked
        menuButton.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !isExpanded);
            menuList.classList.toggle('menu__list--open');
        });

        // Close main menu when any menu item link is clicked
        menuList.querySelectorAll('.menu__item a.menu__link').forEach(link => {
            link.addEventListener('click', () => {
                menuButton.setAttribute('aria-expanded', 'false');
                menuList.classList.remove('menu__list--open');
            });
        });

        // Close menu if clicked outside of the menu or hamburger button
        document.addEventListener('click', function(event) {
            if (!menuList.contains(event.target) && !menuButton.contains(event.target)) {
                menuButton.setAttribute('aria-expanded', 'false');
                menuList.classList.remove('menu__list--open');
            }
        });
    }
});
