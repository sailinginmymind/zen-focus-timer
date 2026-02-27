document.addEventListener('DOMContentLoaded', () => {
    const wheels = {
        h: document.getElementById('wheel-h'),
        m: document.getElementById('wheel-m'),
        s: document.getElementById('wheel-s')
    };
    
    let timeLeft = 0;
    let timerId = null;
    const bell = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');

    // Genera i numeri nelle ruote
    function populateWheel(element, max) {
        element.innerHTML = '<div></div>'; // Spazio vuoto sopra
        for (let i = 0; i <= max; i++) {
            const div = document.createElement('div');
            div.textContent = i.toString().padStart(2, '0');
            element.appendChild(div);
        }
        element.innerHTML += '<div></div>'; // Spazio vuoto sotto
    }

    populateWheel(wheels.h, 23);
    populateWheel(wheels.m, 59);
    populateWheel(wheels.s, 59);

    function getSelectedValues() {
        const h = Math.round(wheels.h.scrollTop / 50);
        const m = Math.round(wheels.m.scrollTop / 50);
        const s = Math.round(wheels.s.scrollTop / 50);
        return (h * 3600) + (m * 60) + s;
    }

    const startBtn = document.getElementById('start');
    const timerDisplay = document.getElementById('timer');

    function updateDisplay() {
        const h = Math.floor(timeLeft / 3600);
        const m = Math.floor((timeLeft % 3600) / 60);
        const s = timeLeft % 60;
        timerDisplay.textContent = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }

    startBtn.addEventListener('click', () => {
        if (timerId === null) {
            if (timeLeft <= 0) timeLeft = getSelectedValues();
            if (timeLeft <= 0) return;

            startBtn.textContent = 'Pausa';
            timerId = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateDisplay();
                } else {
                    clearInterval(timerId);
                    timerId = null;
                    bell.play();
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
        updateDisplay();
        startBtn.textContent = 'Start';
        // Reset rullini a 0
        wheels.h.scrollTo({top: 0, behavior: 'smooth'});
        wheels.m.scrollTo({top: 0, behavior: 'smooth'});
        wheels.s.scrollTo({top: 0, behavior: 'smooth'});
    });
});
