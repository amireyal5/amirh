document.addEventListener('DOMContentLoaded', function() {
    // מזהה את כפתור הבורגר (הכפתור עם הקלאס menu__btn)
    const menuBtn = document.querySelector('.menu__btn');
    // מזהה את רשימת התפריט (ה-UL עם הקלאס menu__list)
    const menuList = document.querySelector('.menu__list');

    // בודק אם האלמנטים קיימים בדף לפני שמנסים להוסיף להם אירועים
    if (menuBtn && menuList) {
        // מוסיף מאזין לאירוע לחיצה (click) על כפתור הבורגר
        menuBtn.addEventListener('click', function() {
            // טוגל (הוספה/הסרה) של הקלאס 'is-active' לרשימת התפריט
            // הקלאס 'is-active' הוא זה שמוצג/מסתיר את התפריט ב-CSS
            menuList.classList.toggle('is-active');

            // בנוסף, נשנה את ה-aria-expanded על הכפתור לנגישות
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
        });

        // (אופציונלי) סגור את התפריט בלחיצה מחוץ לו או בעת שינוי גודל חלון
        document.addEventListener('click', function(event) {
            // אם הלחיצה הייתה מחוץ לכפתור התפריט ולרשימת התפריט עצמה
            if (!menuBtn.contains(event.target) && !menuList.contains(event.target)) {
                // ודא שהתפריט פתוח לפני שסוגרים אותו
                if (menuList.classList.contains('is-active')) {
                    menuList.classList.remove('is-active');
                    menuBtn.setAttribute('aria-expanded', 'false');
                }
            }
        });

        // (אופציונלי) סגור את התפריט אם המשתמש משנה את גודל החלון למסך גדול
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && menuList.classList.contains('is-active')) {
                menuList.classList.remove('is-active');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
});
