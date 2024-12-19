// Array di colori per ciclarli
const colors = ["red", "blue", "green", "orange", "purple", "pink", "brown", "white"];
let currentColorIndex = 0;

// Variabili per rilevare il movimento del touch
let startX = 0;
let endX = 0;

// Elemento target
const clock = document.getElementById("clock");
const hintMessage = document.getElementById("hint-message");

// Funzione per aggiornare il colore
function updateTextColor(direction) {
    if (direction === "left") {
        currentColorIndex = (currentColorIndex + 1) % colors.length;
    } else if (direction === "right") {
        currentColorIndex = (currentColorIndex - 1 + colors.length) % colors.length;
    }
    clock.style.color = colors[currentColorIndex];
}

// Eventi per rilevare il gesto
document.addEventListener("touchstart", event => {
    startX = event.touches[0].clientX;
});

document.addEventListener("touchmove", event => {
    endX = event.touches[0].clientX;
});

document.addEventListener("touchend", () => {
    const deltaX = endX - startX;
    if (Math.abs(deltaX) > 50) {
        const direction = deltaX > 0 ? "right" : "left";
        updateTextColor(direction);
    }
    startX = 0;
    endX = 0;
});

// Funzione dell'orologio
function clockFunction() {
    const today = new Date();

    // Ottieni le componenti dell'ora
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();

    // Aggiungi '0' se il valore è minore di 10
    const hour = hours < 10 ? "0" + hours : hours;
    const minute = minutes < 10 ? "0" + minutes : minutes;
    const second = seconds < 10 ? "0" + seconds : seconds;

    // Trasforma l'orologio in formato 12 ore
    const hourTime = hour > 12 ? hour - 12 : hour;

    // Determina AM o PM
    const ampm = hours < 12 ? " AM" : " PM";

    const time = hourTime + ":" + minute + ":" + second + ampm;

    // Mostra l'ora sul DOM
    clock.innerHTML = time;

    // Aggiorna ogni secondo
    setTimeout(clockFunction, 1000);
}

// Avvia l'orologio
clockFunction();

// Mostra l'animazione e il messaggio iniziale
window.addEventListener("load", () => {
    clock.classList.add("swipe-hint"); // Aggiungi animazione
    setTimeout(() => {
        clock.classList.remove("swipe-hint"); // Rimuovi animazione dopo 2 secondi
        hintMessage.classList.add("hidden"); // Nascondi il messaggio
    }, 3000); // Rimuovi dopo 3 secondi
});
