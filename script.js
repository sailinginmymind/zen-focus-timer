document.addEventListener('DOMContentLoaded', () => {
    let timeLeft = 0;
    let timerId = null;
    const bell = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');

    const timerDisplay = document.getElementById('timer');
    const startBtn = document.getElementById('start');
    const hIn = document.getElementById('hoursInput');
    const mIn = document.getElementById('minutesInput');
    const sIn = document.getElementById('secondsInput');
    const container = document.querySelector('.glass-container');

    function updateDisplay() {
        const h = Math.floor(timeLeft / 3600);
        const m = Math.floor((timeLeft % 3600) / 60);
        const s = timeLeft % 60;
        timerDisplay.textContent = 
            `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }

    startBtn.addEventListener('click', () => {
        if (timerId === null) {
            // Calcola il tempo totale dai 3 input
            const totalSeconds = (parseInt(hIn.value) * 3600) + (parseInt(mIn.value) * 60) + parseInt(sIn.value);
            
            if (totalSeconds <= 0) return;

            if (timeLeft <= 0) timeLeft = totalSeconds;
            
            startBtn.textContent = 'Pausa';
            startBtn.style.background = '#333';
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
                    startBtn.style.background = '#ff9f0a';
                    alert("Tempo scaduto!");
                }
            }, 1000);
        } else {
            clearInterval(timerId);
            timerId = null;
            startBtn.textContent = 'Riprendi';
            startBtn.style.background = '#ff9f0a';
            container.classList.remove('pulse');
        }
    });

    document.getElementById('reset').addEventListener('click', () => {
        clearInterval(timerId);
        timerId = null;
        timeLeft = 0;
        updateDisplay();
        startBtn.textContent = 'Start';
        startBtn.style.background = '#ff9f0a';
        container.classList.remove('pulse');
    });
});
