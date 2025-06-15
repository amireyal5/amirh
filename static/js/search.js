document.addEventListener('DOMContentLoaded', function() {
    // כל התוכן של ה-search.js ששלחת קודם יכנס לכאן:
    (function() {
      const searchInput = document.getElementById('search-input');
      const searchResults = document.getElementById('search-results');
      let fuse;

      // בדוק אם האלמנטים נמצאו לפני שממשיכים
      if (!searchInput || !searchResults) {
        console.warn("Search input or results element not found. Fuse.js search will not be initialized.");
        return; // צא אם האלמנטים לא נמצאו
      }

      // 1. טעינת אינדקס החיפוש (index.json)
      fetch('/index.json')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          const options = {
            keys: [
              { name: 'title', weight: 0.8 },
              { name: 'content', weight: 0.5 },
              { name: 'tags', weight: 0.3 }
            ],
            includeScore: false,
            threshold: 0.4,
            ignoreLocation: true,
            minMatchCharLength: 2
          };
          fuse = new Fuse(data, options);
        })
        .catch(error => {
          console.error('Error loading search index:', error);
          searchResults.innerHTML = '<li>שגיאה בטעינת נתוני החיפוש. נסה לרענן את העמוד.</li>';
          searchResults.style.display = 'block';
        });

      // 3. האזנה לאירועי קלט בשדה החיפוש
      searchInput.addEventListener('input', function(e) {
        const query = e.target.value.trim();
        searchResults.innerHTML = ''; // נקה תוצאות קודמות
        searchResults.style.display = 'none'; // הסתר את רשימת התוצאות

        if (query.length >= 2 && fuse) { // חפש רק אם השאילתה היא לפחות 2 תווים ו-fuse מאותחל
          const results = fuse.search(query);

          // 4. הצגת התוצאות
          if (results.length > 0) {
            searchResults.style.display = 'block'; // הצג את רשימת התוצאות
            results.forEach(result => {
              const li = document.createElement('li');
              const a = document.createElement('a');
              a.href = result.item.permalink;
              a.textContent = result.item.title;
              li.appendChild(a);
              searchResults.appendChild(li);
            });
          } else {
            searchResults.style.display = 'block'; // עדיין הצג, אבל עם הודעת "לא נמצאו תוצאות"
            const li = document.createElement('li');
            li.textContent = 'לא נמצאו תוצאות עבור החיפוש שלך.';
            searchResults.appendChild(li);
          }
        }
      });
    })();
}); // **השורה הזו והשורה הראשונה הן התוספת!**