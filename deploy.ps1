Write-Host "מוסיף את כל השינויים ל-stage..."
git add .

$commit_message = "עדכון תוכן אוטומטי"
git commit -m "$commit_message"

Write-Host "דוחף את השינויים ל-remote..."
git push

Write-Host "העדכון הועלה! בדוק ב-Netlify את הסטטוס."
