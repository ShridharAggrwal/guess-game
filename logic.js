let cnum = Math.floor(Math.random() * 100) + 1;
let attempt = 0;
let maxAttempts = 10;

let attemptData = document.getElementById("Attempt");
let userinp = document.getElementById("inp");
let subBtn = document.getElementById("submit");
let resBtn = document.getElementById("resBtn");
let message = document.getElementById("msg");


function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function check() {
    let usernum = parseInt(userinp.value);

    if (isNaN(usernum) || usernum < 1 || usernum > 100) {
        message.innerHTML = "Please enter a number between 1 and 100.";
        message.style.color = "orange";
        return;
    }

    let hint = "";
    if (isPrime(cnum)) {
        hint = "Hint: The number is prime.";
    } else {
        hint = cnum % 2 === 0 ? "Hint: The number is even." : "Hint: The number is odd.";
    }

    if (usernum === cnum) {
        message.innerHTML = ` Congratulations! You guessed the number!`;
        message.style.color = "green";
        resBtn.style.display = "block";
        subBtn.disabled = true; 
        return;
    }

    let rangeHint = "";
    if (Math.abs(usernum - cnum) < 5) {
        rangeHint = usernum > cnum ? "High and Very close!" : "Low and Very close!";
    } else if (Math.abs(usernum - cnum) < 10) {
        rangeHint = usernum > cnum ? "NOT TOO High!" : "NOT TOO Low!";
    } else {
        rangeHint = usernum > cnum ? "Too high!" : "Too low!";
    }
    

    message.innerHTML = `${rangeHint} ${hint}`;
    message.style.color = "red";

    attempt++;
    attemptData.innerHTML = attempt;


    if (attempt >= maxAttempts) {
        message.innerHTML = `Game Over! The number was ${cnum}. ${hint}`;
        message.style.color = "red";
        resBtn.style.display = "block";
        subBtn.disabled = true; 
    }

    setTimeout(() => {
        userinp.value = "";
    }, 1000);
}

function restart() {
    cnum = Math.floor(Math.random() * 100) + 1;
    attempt = 0;
    attemptData.innerHTML = attempt;
    userinp.value = "";
    message.innerHTML = "";
    resBtn.style.display = "none";
    subBtn.disabled = false; 
}


subBtn.addEventListener("click", check);
resBtn.addEventListener("click", restart);
