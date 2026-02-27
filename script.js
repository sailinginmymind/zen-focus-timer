document.addEventListener('DOMContentLoaded', () => {
    let timeLeft = 0;
    let timerId = null;
    const bell = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');

    const timerDisplay = document.getElementById('timer');
    const startBtn = document.getElementById('start');
    const inputs = {
        h: document.getElementById('h-input'),
        m: document.getElementById('m-input'),
        s: document.getElementById('s-input')
    };

    function updateDisplay(seconds) {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        timerDisplay.textContent = 
            `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }

    // Sincronizza il display centrale con quello che scrivi negli input
    function syncTime() {
        if (timerId === null) {
            const total = (parseInt(inputs.h.value) || 0) * 3600 +
                          (parseInt(inputs.m.value) || 0) * 60 +
                          (parseInt(inputs.s.value) || 0);
            timeLeft = total;
            updateDisplay(timeLeft);
        }
    }

    [inputs.h, inputs.m, inputs.s].forEach(input => {
        input.addEventListener('input', syncTime);
    });

    startBtn.addEventListener('click', () => {
        if (timerId === null) {
            syncTime(); // Prendi i valori attuali
            if (timeLeft <= 0) return;

            startBtn.textContent = 'Pausa';
            startBtn.classList.add('active'); // Puoi aggiungere uno stile per la pausa

            timerId = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateDisplay(timeLeft);
                } else {
                    clearInterval(timerId);
                    timerId = null;
                    bell.play().catch(() => {});
                    startBtn.textContent = 'Start';
                    alert("Tempo scaduto!");
                }
            }, 1000);
        } else {
            clearInterval(timerId);
            timerId = null;
            startBtn.textContent = 'Riprendi';
        }
    });

    document.getElementById('reset').addEventListener('click', () => {
        clearInterval(timerId);
        timerId = null;
        timeLeft = 0;
        inputs.h.value = "00";
        inputs.m.value = "00";
        inputs.s.value = "00";
        updateDisplay(0);
        startBtn.textContent = 'Start';
    });
});
