// il y a X set (manche)
// Nombre de points gagnés : 15 | 30 | 40 
// Si 2 joueurs sont execo à 40, le prochain qui marque aura avantage, et ce dernier devra encore marquer pour gagner 1 jeu (point)
// Si 2 joueurs sont à 15-40, selui à 40 gagne automatiquement
// But : Calculer le score d'un jeu

function assert(label, test) {
    if(test()) {
        console.log(`${label} ✔`)
    } else {
        console.log(`${label} ❌`)
    }
}

let gameWins = [];

function playerWins(player) {
    gameWins.push(player);
}

function calculateScore() {
    let playerAScore = 0;
    let playerBScore = 0;
    gameWins.forEach(win => {
        if (win === 'player A' && playerAScore === 30) {
            playerAScore += 10
        } else if (win === 'player B' && playerBScore === 30) {
            playerBScore += 10
        } else if(win === 'player A') {
            playerAScore += 15;
        } else if (win === 'player B') {
            playerBScore += 15;
        }
    });
    return `${playerAScore}-${playerBScore}`;
}

assert('0 points when the game starts', () => {
    gameWins = [];
    return calculateScore() === '0-0';
});

assert('15 points when the player wins the first time', () => {
    gameWins = [];
    playerWins('player A');
    return calculateScore() === '15-0';
}); 

assert('15 points when the second player wins the first time', () => {
    gameWins = [];
    playerWins('player B');
    return calculateScore() === '0-15';
}); 

assert('40 points when the first player wins the game', () => {
    gameWins = [];
    playerWins('player A');
    playerWins('player A');
    playerWins('player A');
    return calculateScore() === '40-0';
}); 

assert('40 points when the second player wins the game', () => {
    gameWins = [];
    playerWins('player B');
    playerWins('player B');
    playerWins('player B');
    return calculateScore() === '0-40';
}); 