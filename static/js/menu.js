document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.menu__btn');
    const menuList = document.querySelector('.menu__list');

    if (menuBtn && menuList) {
        menuBtn.addEventListener('click', function() {
            menuList.classList.toggle('is-active');

            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
        });

        // (אופציונלי) סגור את התפריט בלחיצה מחוץ לו או בעת שינוי גודל חלון
        document.addEventListener('click', function(event) {
            if (!menuBtn.contains(event.target) && !menuList.contains(event.target)) {
                if (menuList.classList.contains('is-active')) {
                    menuList.classList.remove('is-active');
                    menuBtn.setAttribute('aria-expanded', 'false');
                }
            }
        });

        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && menuList.classList.contains('is-active')) {
                menuList.classList.remove('is-active');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
});
