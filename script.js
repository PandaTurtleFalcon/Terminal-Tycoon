let loc = 0;
let locPerClick = 1;
let autoClickers = 0;
const locDisplay = document.getElementById('loc');
document.getElementById('click-btn').addEventListener('click', () => {
    loc += locPerClick;
    updateDisplay();
});
function buyUpgrade(type){
    if (type === 'keyboard' && loc >=50){
        loc -= 50;
        locPerClick += 1;
    } else if (type === 'assistant' && loc >= 250){
        loc -=250;
        autoClickers +=1;
    }
    updateDisplay();
}
function updateDisplay() {
    locDisplay.textContent = loc;
}
setInterval(() => {
    loc += autoClickers;
    updateDisplay();

}, 1000);
function saveGame() {
    fetch('/save', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({loc,locPerClick })
    });
}
function loadGame() {
    fetch ('/load')
        .then(res => res.json())
        .then(data => {
            loc = data.loc ?? 0;
            locPerClick = data.locPerClick ?? 1;
            updateDisplay();
        });
}
window.onload = loadGame;
setInterval(saveGame, 1000)