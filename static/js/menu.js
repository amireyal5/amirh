document.addEventListener('DOMContentLoaded', () => {
  const hamburgerToggle = document.querySelector('.hamburger-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-nav-menu');

  if (hamburgerToggle && mobileMenu) {
    hamburgerToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('is-open'); // החלף מחלקה
      hamburgerToggle.classList.toggle('is-active'); // אופציונלי: לשנות את אייקון ההמבורגר ל-X
    });
  }
});
