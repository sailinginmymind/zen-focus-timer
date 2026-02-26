let timeLeft = 1500;
let timerId = null;
const bell = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');
const minutesInput = document.getElementById('minutesInput');
const container = document.querySelector('.glass-container');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

startBtn.addEventListener('click', () => {
    if (timerId === null) {
        // Se il timer è fermo, aggiorna timeLeft con l'input dell'utente
        if (timeLeft === 1500 || timeLeft === parseInt(minutesInput.value) * 60) {
            timeLeft = parseInt(minutesInput.value) * 60;
            updateDisplay();
        }

        startBtn.textContent = 'Pausa';
        container.classList.add('pulse');
        
        timerId = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timerId);
                timerId = null;
                bell.play();
                container.classList.remove('pulse');
                startBtn.textContent = 'Start';
                alert("Tempo scaduto!");
            }
        }, 1000);
    } else {
        // Pausa
        clearInterval(timerId);
        timerId = null;
        startBtn.textContent = 'Riprendi';
        container.classList.remove('pulse');
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    timeLeft = parseInt(minutesInput.value) * 60;
    updateDisplay();
    startBtn.textContent = 'Start';
    container.classList.remove('pulse');
});

// Aggiorna il tempo mentre l'utente cambia i minuti nell'input
minutesInput.addEventListener('change', () => {
    if (timerId === null) {
        timeLeft = parseInt(minutesInput.value) * 60;
        updateDisplay();
    }
});
