console.clear();
/* Blue Light Filter */
const blueFilter = document.getElementById("blue-filter");
const blueToggleBtn = document.getElementById("bluelight-toggle");

let blueLightOn = false;

blueToggleBtn.addEventListener("click", () => {
    blueLightOn = !blueLightOn;
    blueFilter.style.opacity = blueLightOn ? "1" : "0";
    blueToggleBtn.textContent = blueLightOn ? "Disable Filter" : "Toggle Filter";

});

/* Brightness Control */
const brightnessSlider = document.getElementById("brightness-slider");
const brightnessOverlay = document.getElementById("brightness-overlay");

brightnessSlider.addEventListener("input", () => {
      const value = brightnessSlider.value;
      const opacity = (100 - value) /100;
      brightnessOverlay.style.opacity = opacity;
});

/* 20-20-20 Timer Logic */
const startTimerBtn = document.getElementById("start-timer"); // startTimerBtn links to the start button.
const timerDisplay = document.getElementById("timer-display"); // timerDisplay links to the ele showing countdown.
const stopTimerBtn = document.getElementById("stop-timer"); // stopTimerBtn links to the stop button

let timeInterval; // timeInterval stores the timerId for later control.

let timeLeft = 20 * 60; // time left starts at 1200sec (20 * 60)

function updateTimer() { // this converts timeLeft seconds into MM:SS format. Math.floor gets minutes, % gets remaining seconds and padStart adds a leading zero (e.g. "05") for display
    const minutes = Math.floor(timeLeft/60); 
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2,"0")}`;
}

startTimerBtn.addEventListener("click",() => { // Attaches a clik handler to the button. arrow function () => {} runs code when clicked
    clearInterval(timeInterval); // stops any running timer, resets to 20 minutes.
    timeLeft = 20 * 60;
    updateTimer();

    timeInterval = setInterval(() => { // creates a repeating function every 1000ms (1seconds) that decrements timeLeft by 1.
        timeLeft--; 

        if(timeLeft <= 0) { // when time hits zero, stops the interval, shows an alert, and resets for the next cycle(though it won't start auto-restart without another click)
            clearInterval(timeInterval);
            alert("👀 Time for a 20-second break! Look 20 feet away.");
            timeLeft = 20 * 60;
        }
        updateTimer(); //Updates display each second and sets 1000ms delay between runs.
    }, 1000);
});

// ⭐ New Stop Logic:

stopTimerBtn.addEventListener("click", () => {
    clearInterval(timeInterval);
    timerDisplay.textContent = "20:00"; // reset display
});

/* Blink Reminder Logic */

const blinkBtn = document.getElementById("blink-btn");

let blinkReminderActive = false;

let blinkInterval;

blinkBtn.addEventListener("click", () => {
    blinkReminderActive = !blinkReminderActive;

    if(blinkReminderActive) {
        blinkBtn.textContent = "Disable Reminder";

        blinkInterval = setInterval(() => {
             alert("😊 Remember to blink!");
        }, 5 * 60 * 1000); // every 5 minutes
    } else {
        blinkBtn.textContent = "Enable Reminder";
        clearInterval(blinkInterval);
    }
});

/* Session Timer Counter */
const sessionTimeDisplay = document.getElementById("session-time"); //Selects the HTML element with id="session-time" using DOM method getElementById(), which returns the element object or null if not found.

let sessionSeconds = 0; //Declares a mutable variable sessionSeconds initialized to 0 using let, to track total seconds elapsed since the timer started.

setInterval(() => { //Calls setInterval() with an arrow function callback, scheduling it to execute repeatedly.
    sessionSeconds++; //Increments sessionSeconds by 1 each interval execution, accumulating total seconds.

    let hrs = Math.floor(sessionSeconds/3600); //Calculates hours by integer-dividing total seconds by 3600 (seconds per hour) using Math.floor() for whole numbers.

    let mins = Math.floor((sessionSeconds % 3600)/60);//Computes minutes from remaining seconds after hours (using modulo % 3600), then divides by 60 and floors.

    let secs = sessionSeconds % 60;//Gets remaining seconds by taking total seconds modulo 60, discarding full minutes.

    sessionTimeDisplay.textContent = //Updates the text content of the targeted HTML element to display the formatted time.
    `${hrs.toString().padStart(2,"0")}:${mins.toString().padStart(2,"0")}:${secs.toString().padStart(2,"0")}`;//Converts each time component to string, pads with leading zeros to 2 digits using padStart(2, "0"), and templates into "HH:MM:SS" format.
}, 1000); // Closes the callback and setInterval() with 1000ms (1 second) delay, ensuring one update per second.