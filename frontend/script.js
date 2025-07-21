let loc = 0;
let locPerClick = 1;

// DOM elements
const locDisplay = document.getElementById('loc');
const clickButton = document.getElementById('click-btn');

// Update the UI
function updateDisplay() {
  locDisplay.textContent = loc;
}

// Handle clicks
clickButton.addEventListener('click', () => {
  loc += locPerClick;
  updateDisplay();
});

// Handle upgrades
function buyUpgrade(type) {
  if (type === 'keyboard' && loc >= 50) {
    loc -= 50;
    locPerClick += 1;
  }
  updateDisplay();
}

// Save to Flask backend
function saveGame() {
  fetch('http://127.0.0.1:5000/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      loc: loc,
      locPerClick: locPerClick
    })
  })
    .then(res => res.json())
    .then(data => console.log('[SAVE] status:', data.status))
    .catch(err => console.error('[SAVE] error:', err));
}

// Load from Flask backend
function loadGame() {
  fetch('http://127.0.0.1:5000/load')
    .then(res => res.json())
    .then(data => {
      loc = data.loc ?? 0;
      locPerClick = data.locPerClick ?? 1;
      updateDisplay();
      console.log('[LOAD] Game loaded:', data);
    })
    .catch(err => console.error('[LOAD] error:', err));
}

// Load on page start
window.onload = loadGame;

// Auto-save every 10 seconds
setInterval(saveGame, 10000);
