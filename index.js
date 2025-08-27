(() => {
  const pads = {
    green: document.getElementById('green'),
    red: document.getElementById('red'),
    yellow: document.getElementById('yellow'),
    blue: document.getElementById('blue'),
  };

  const colors = ['green', 'red', 'yellow', 'blue'];
  const startBtn = document.getElementById('startBtn');
  const levelEl = document.getElementById('level');

  let sequence = [];
  let userIndex = 0;
  let level = 0;
  let playingBack = false;
  let gameStarted = false;

  function flash(color) {
    const el = pads[color];
    el.classList.add('active');
    setTimeout(() => {
      el.classList.remove('active');
    }, 400);
  }

  function resetGame() {
    sequence = [];
    userIndex = 0;
    level = 0;
    gameStarted = false;
    levelEl.textContent = level;
  }

  function playSequence() {
    playingBack = true;
    let i = 0;

    function next() {
      if (i < sequence.length) {
        flash(sequence[i]);
        i++;
        setTimeout(next, 800);
      } else {
        playingBack = false;
      }
    }

    setTimeout(next, 800);
  }

  function nextRound() {
    sequence.push(colors[Math.floor(Math.random() * colors.length)]);
    level++;
    levelEl.textContent = level;
    userIndex = 0;
    playSequence();
  }

  function handleUser(color) {
    if (!gameStarted) return;
    if (playingBack) return;

    flash(color);

    if (sequence[userIndex] === color) {
      userIndex++;
      if (userIndex === sequence.length) {
        setTimeout(nextRound, 1000);
      }
    } else {
      alert("¡Fallaste! Intenta de nuevo.");
      resetGame();
    }
  }

  // Eventos
  Object.values(pads).forEach(el => {
    el.addEventListener('click', () => handleUser(el.dataset.color));
  });

  startBtn.addEventListener('click', () => {
    resetGame();
    gameStarted = true;
    nextRound();
  });
})();
