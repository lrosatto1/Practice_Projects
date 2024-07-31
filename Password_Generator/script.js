const lengthSliderHTML = document.querySelector(".pass-length input");
const optionsHTML = document.querySelectorAll(".pass-settings .option input");
const copyIconHTML = document.querySelector(".input-box span");
const passwordInputHTML = document.querySelector(".input-box input");
const passIndicatorHTML = document.querySelector(".pass-indicator");
const generateBTNHTML = document.querySelector(".generate-btn");

// Objeto para Datos
const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!$%&|[](){}:;.,*+-#@<>~"
}

const generatePassword = () => {
    let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false,
    passLength = lengthSliderHTML.value;

    optionsHTML.forEach(option => {
        if (option.checked) {
            if (option.id !== "exc-duplicate" && option.id !== "spaces") {
                staticPassword += characters[option.id];
            } else if (option.id === "spaces") {
                staticPassword += " ";
            } else {
                excludeDuplicate = true;
            }
        }
    });

    for (let i = 0; i < passLength; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if (excludeDuplicate) {
            if (!randomPassword.includes(randomChar) || randomChar === " ") {
                randomPassword += randomChar;
            } else {
                i--;
            }
        } else {
            randomPassword += randomChar;
        }
    }

    passwordInputHTML.value = randomPassword;
    updatePasswordColor();
}

const updatePassIndicator = () => {
    if (lengthSliderHTML.value < 6) {
        passIndicatorHTML.id = "weak";
    } else if (lengthSliderHTML.value < 12) {
        passIndicatorHTML.id = "medium";
    } else {
        passIndicatorHTML.id = "strong";
    }
}

const updateSlider = () => {
    document.querySelector(".pass-length span").innerText = lengthSliderHTML.value;
    generatePassword();
    updatePassIndicator();
}

const updatePasswordColor = () => {
    const passLength = passwordInputHTML.value.length;
    if (passLength < 6) {
        passwordInputHTML.className = "weak-password";
    } else if (passLength < 12) {
        passwordInputHTML.className = "medium-password";
    } else {
        passwordInputHTML.className = "strong-password";
    }
}

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInputHTML.value);
    copyIconHTML.innerText = "check";
    copyIconHTML.style.color = "#4285f4";
    setTimeout(() => {
        copyIconHTML.innerText = "copy_all";
        copyIconHTML.style.color = "#707070";
    }, 1500);
}

copyIconHTML.addEventListener("click", copyPassword);
lengthSliderHTML.addEventListener("input", updateSlider);
generateBTNHTML.addEventListener("click", generatePassword);
