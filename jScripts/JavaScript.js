var sleepStart, sleepEnd, start, end, sleepDuration, sport, waterIntake, selectedOption;

//  איפוס שקיפות תמונה
window.addEventListener('load', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => { img.style.opacity = 0; });

// הוספת מאזיני אירועים לשדות
    document.getElementById('sleepStart').addEventListener('input', validateForm);
    document.getElementById('sleepEnd').addEventListener('input', validateForm);
    document.getElementById('waterForm').addEventListener('change', validateForm);
    var sportOptions = document.querySelectorAll('input[name="sport"]');
    sportOptions.forEach(option => option.addEventListener('change', validateForm));
    var foodCheckboxes = document.querySelectorAll('input[name="eat"]');
    foodCheckboxes.forEach(checkbox => checkbox.addEventListener('change', validateForm));

    // בדיקה ראשונית
    validateForm();
});

// פונקציה לבדיקת הזנת כל השדות
function validateForm() {
    var sleepStart = document.getElementById('sleepStart').value;
    var sleepEnd = document.getElementById('sleepEnd').value;
    var waterIntake = document.getElementById('waterForm').value;
    var selectedSport = document.querySelector('input[name="sport"]:checked');
    var foodTypes = ['protein', 'carbs', 'fats', 'fruits', 'vegetables'];
    var foodChecked = foodTypes.some(type => document.getElementById(type).checked);

    if (sleepStart && sleepEnd && waterIntake && selectedSport && foodChecked) {
        document.getElementById('send').style.display = 'block';
    } else {
        document.getElementById('send').style.display = 'none';
    }
}
//TIME מתן משוב מילולי ושינוי התמונה בהתאם לנתוני שעות השינה שהמשתמש הזין  
function CheckSleep() {
    sleepStart = document.getElementById('sleepStart').value;
    sleepEnd = document.getElementById('sleepEnd').value;
    sleepImage = document.querySelector('#sleep_img img');
    if (!sleepStart || !sleepEnd) {
        document.getElementById('feedbackSleep').innerHTML = 'נא למלא את שעות השינה.';
        } else {
        start = new Date(`1970-01-01T${sleepStart}`);
        end = new Date(`1970-01-01T${sleepEnd}`);
        if (end < start) end.setDate(end.getDate() + 1);
        sleepDuration = (end - start) / 3600000;
        if (sleepDuration > 7) {
            sleepImage.style.opacity = 1;
            document.getElementById('feedbackSleep').innerHTML = "כל הכבוד ישנת מעל 7 שעות";
        } else {
            sleepImage.style.opacity = 1 * (sleepDuration / 7);
            document.getElementById('feedbackSleep').innerHTML = " שים לב לא ישנת מספיק היום - כדי לאפשר למידה אפקטיבית הקפד על לפחות 7 שעות שינה";
        }
    }
}
//RADIO מתן משוב מילולי ושינוי התמונה בהתאם לנתוני הפעילות הכופנית שהמשתמש הזין 

function CheckSport() {
    selectedOption = document.querySelector('input[name="sport"]:checked');
    var sportImage = document.querySelector('#sport_img img');
    if (!selectedOption) {
        document.getElementById('feedbackSport').innerHTML = 'נא לבחור אם התאמנת היום.';
    } else {
        if (selectedOption.value == 'yes') {
            sportImage.style.opacity = 1;
            document.getElementById('feedbackSport').innerHTML = 'כל הכבוד שהתאמנת.';
        } else {
            sportImage.style.opacity = 0;
            document.getElementById('feedbackSport').innerHTML = 'הקפידו מחר לשלב פעילות גופנית במהלך היום שלכם';
        }
         }
}

//select מתן משוב מילולי ושינוי התמונה בהתאם לנתוני הפעילות הכופנית שהמשתמש הזין 
function CheckWater() {
    var totalE = document.getElementById('waterForm').value;
    var waterImage = document.querySelector('#water_img img');
    if (totalE == 0) {
        document.getElementById('feedbackWater').innerHTML = 'נא לבחור כמה כוסות מים שתית היום.';
    } else {
        if (totalE > 10) {
            waterImage.style.opacity = 1;
            document.getElementById('feedbackWater').innerHTML = 'כל הכבוד שתית את כמות המים המומלצת.';
        } else {
            waterImage.style.opacity = 1 * (totalE / 11);
            document.getElementById('feedbackWater').innerHTML = 'שים לב ששתית פחות מכמות המים המומלצת.';
        }
    }
}
//CHECKBOX מתן משוב מילולי ושינוי התמונה בהתאם לנתוני הפעילות הכופנית שהמשתמש הזין 
function CheckFood() {
    var foodTypes = ['protein', 'carbs', 'fats', 'fruits', 'vegetables'];
    var allChecked = false;
    foodTypes.forEach(type => {
        var checkbox = document.getElementById(type);
        var image = document.querySelector(`#${type}_img img`);
        image.style.opacity = checkbox.checked ? 1 : 0;
        if (checkbox.checked)
            allChecked = true;
    });
    if (!allChecked) {
        document.getElementById('feedbackFood').innerHTML = 'נא לבחור מה אכלת היום.';
    } 
}
//פונקצית סיכום בחירות של המשתמש
function generateFeedback() {
    sleepStart = document.getElementById('sleepStart').value;
    sleepEnd = document.getElementById('sleepEnd').value;
    start = new Date(`1970-01-01T${sleepStart}`);
    end = new Date(`1970-01-01T${sleepEnd}`);
    if (end < start) end.setDate(end.getDate() + 1);
    sleepDuration = (end - start) / 3600000;

    sport = document.querySelector('input[name="sport"]:checked').value;
    waterIntake = document.getElementById('waterForm').value;
    foodTypes = ['protein', 'carbs', 'fats', 'fruits', 'vegetables'];

    var feedback = document.getElementById('feedback');
    feedback.innerHTML =
        `<h3>סיכום הבחירות שלך:</h3>
        <p>שעות שינה: ${sleepStart} - ${sleepEnd} (${sleepDuration.toFixed(1)} שעות)</p>
        <p>פעילות גופנית: ${sport === 'yes' ? 'כן' : 'לא'}</p>
        <p>כוסות מים: ${waterIntake}</p>
        <p>אוכל: ${foodTypes.filter(type => document.getElementById(type).checked).map(type => type).join(', ')}</p>`;
}
