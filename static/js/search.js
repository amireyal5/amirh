(function() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  let fuse; // משתנה שיחזיק את מופע Fuse

  // וודא שאלמנטי ה-HTML קיימים בדף לפני שממשיכים
  // אם הם לא קיימים, זה ימנע שגיאות בקונסול ויבטיח שהסקריפט לא ינסה לעבוד לשווא.
  if (!searchInput || !searchResults) {
    console.warn("Search input or results element not found. Fuse.js search will not be initialized.");
    return; // צא מהפונקציה אם האלמנטים אינם קיימים
  }

  // 1. טעינת אינדקס החיפוש (index.json)
  // אנחנו משתמשים ב-fetch כדי לקבל את קובץ ה-JSON שיצרנו עם Hugo.
  fetch('/index.json') // שימו לב לנתיב: /index.json הוא הנתיב היחסי לקובץ שנבנה בתיקיית ה-public
    .then(response => {
      // בודק אם התגובה מהשרת הייתה מוצלחת (סטטוס 200 OK)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); // המר את התגובה לפורמט JSON
    })
    .then(data => {
      // 2. הגדרת אפשרויות ל-Fuse.js
      // כאן אנו מגדירים אילו שדות בתוך כל פריט JSON (עמוד באתר) Fuse יחפש בהם,
      // וכיצד הוא יבצע את החיפוש (לדוגמה, חיפוש מטושטש, משקולות לשדות).
      const options = {
        keys: [
          { name: 'title', weight: 0.8 },      // חיפוש בכותרות - עם משקל גבוה (הכי חשוב)
          { name: 'content', weight: 0.5 },    // חיפוש בתוכן - עם משקל בינוני
          { name: 'tags', weight: 0.3 }        // חיפוש בתגיות - עם משקל נמוך
        ],
        includeScore: false,                  // לא לכלול את ציון ההתאמה בתוצאות (ניתן לשנות ל-true לדיבוג)
        threshold: 0.4,                       // רמת סף להתאמה (0.0 הכי מדויק, 1.0 הכי פחות מדויק). ערך בינוני מאפשר חיפוש מטושטש טוב.
        ignoreLocation: true,                 // לא להתחשב במיקום הטקסט בתוך השדה (מאפשר למצוא התאמות בכל מקום בשדה)
        minMatchCharLength: 2                 // מינימום תווים שצריך להקליד כדי להתחיל חיפוש.
      };
      fuse = new Fuse(data, options); // אתחול Fuse עם הנתונים והאפשרויות שהגדרנו
    })
    .catch(error => {
      // טיפול בשגיאות אם טעינת האינדקס נכשלה
      console.error('Error loading search index:', error);
      searchResults.innerHTML = '<li>שגיאה בטעינת נתוני החיפוש. נסה לרענן את העמוד.</li>';
      searchResults.style.display = 'block'; // הצג את הודעת השגיאה
    });

  // 3. האזנה לאירועי קלט בשדה החיפוש
  // בכל פעם שהמשתמש מקליד תו בתיבת החיפוש, פונקציה זו תופעל.
  searchInput.addEventListener('input', function(e) {
    const query = e.target.value.trim(); // קבל את טקסט החיפוש הנוכחי ונקה רווחים מיותרים
    searchResults.innerHTML = ''; // נקה תוצאות קודמות לפני הצגת חדשות
    searchResults.style.display = 'none'; // הסתר את רשימת התוצאות כברירת מחדל

    // בצע חיפוש רק אם יש לפחות 2 תווים שהוקלדו ו-Fuse אכן אתחל בהצלחה
    if (query.length >= 2 && fuse) {
      const results = fuse.search(query); // בצע את החיפוש בפועל באמצעות Fuse.js

      // 4. הצגת התוצאות
      if (results.length > 0) {
        searchResults.style.display = 'block'; // הצג את רשימת התוצאות
        results.forEach(result => {
          const li = document.createElement('li'); // צור רכיב רשימה חדש (<li>)
          const a = document.createElement('a');   // צור רכיב קישור חדש (<a>)
          a.href = result.item.permalink;          // הגדר את הקישור לעמוד המקורי
          a.textContent = result.item.title;       // הגדר את הטקסט של הקישור ככותרת העמוד
          li.appendChild(a);                     // הוסף את הקישור לרכיב הרשימה
          searchResults.appendChild(li);           // הוסף את רכיב הרשימה לרשימת התוצאות ב-HTML
        });
      } else {
        // אם לא נמצאו תוצאות עבור החיפוש
        searchResults.style.display = 'block'; // עדיין הצג את הרשימה כדי להציג את ההודעה
        const li = document.createElement('li');
        li.textContent = 'לא נמצאו תוצאות עבור החיפוש שלך.';
        searchResults.appendChild(li);
      }
    }
  });
})();