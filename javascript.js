let timeLeft = 1500; // 25 minuti
let timerId = null;

// --- AGGIUNTA: Carica il suono della campana ---
const bell = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');
const container = document.querySelector('.glass-container'); // Per l'effetto visivo

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

startBtn.addEventListener('click', () => {
    if (timerId === null) {
        startBtn.textContent = 'Pausa';
        // --- AGGIUNTA: Attiva l'effetto pulsante ---
        container.classList.add('pulse');
        
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft === 0) {
                clearInterval(timerId);
                // --- AGGIUNTA: Suona la campana alla fine ---
                bell.play(); 
                container.classList.remove('pulse');
                alert("Tempo scaduto! Namasté.");
            }
        }, 1000);
    } else {
        clearInterval(timerId);
        timerId = null;
        startBtn.textContent = 'Riprendi';
        // --- AGGIUNTA: Ferma l'effetto pulsante in pausa ---
        container.classList.remove('pulse');
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    timeLeft = 1500;
    updateDisplay();
    startBtn.textContent = 'Start';
    container.classList.remove('pulse');
});
