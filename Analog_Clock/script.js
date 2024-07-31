// Traer elementos del DOM

const bodyHTML = document.querySelector("body"),
    hourHandHTML = document.querySelector(".hour"),
    minuteHandHTML = document.querySelector(".minute"),
    secondHandHTML = document.querySelector(".second"),
    modeSwitchHTML = document.querySelector(".mode-switch");

// Chequear si el modo esta puesto en dark mode en el storage local
if(localStorage.getItem("mode") === "Dark Mode") {
    bodyHTML.classList.add("dark");
    modeSwitchHTML.textContent = "Light Mode"
}



// agregar el evento para el click de cambio de modo
    modeSwitchHTML.addEventListener("click", () => {
        bodyHTML.classList.toggle("dark");
        const isDarkMode = bodyHTML.classList.contains("dark");
        modeSwitchHTML.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
        // set localstorage baded on dark class presence
        localStorage.setItem("mode", isDarkMode ? "Dark Mode" : "Light Mode" );

    });



// obtener el tiempo actual y calcular los grados para las agujas del reloj
const updateTime = () =>{
    let date = new Date(),
    secondToDeg = (date.getSeconds() / 60) * 360;
    minuteToDeg = (date.getMinutes() / 60) * 360;
    hourToDeg = (date.getHours() / 12) * 360;
    //rotacion de las ajugas del reloj basado en el tiempo actual
    hourHandHTML.style.transform = `rotate(${hourToDeg}deg)`;
    minuteHandHTML.style.transform = `rotate(${minuteToDeg}deg)`;
    secondHandHTML.style.transform = `rotate(${secondToDeg}deg)`;

};


// Update Time para setear el reloj todos los segundos

setInterval(updateTime, 1000);

// llamar a la funcion update time cuando se carga la pagina

updateTime();