// il y a X set (manche)
// Nombre de points gagnés : 15 | 30 | 40 
// Si 2 joueurs sont execo à 40, le prochain qui marque aura avantage, et ce dernier devra encore marquer pour gagner 1 jeu (point)
// Si 2 joueurs sont à 15-40, celui à 40 gagne automatiquement
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
            playerAScore += 10;
        } else if (win === 'player B' && playerBScore === 30) {
            playerBScore += 10;
        } else if(win === 'player A' && playerAScore < 40) {
            playerAScore += 15;
        } else if (win === 'player B' && playerBScore < 40) {
            playerBScore += 15;
        } else if (win === 'player A' && playerAScore === 40 && playerBScore === 40) {
            playerAScore = 'A';
        } else if (win === 'player B' && playerAScore === 40 && playerBScore === 40) {
            playerBScore = 'A';
        } else if (win === 'player B' && playerAScore === 'A' && playerBScore === 40) {
            playerBScore = 'A';
        } else if (win === 'player A' && playerAScore === 40 && playerBScore === 'A') {
            playerAScore = 'A';
        }
    });
    return result(playerAScore, playerBScore);

}

function result(playerAScore, playerBScore) {
    if (playerAScore === 'A' && playerBScore === 'A') {
        return 'Egalité';
    } else {
        return `${playerAScore}-${playerBScore}`;
    }
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
    console.log(calculateScore())
    return calculateScore() === '0-40';
});

assert('advantage when both players are execo and the first player scores', () => {
    gameWins = [];
    playerWins('player A');
    playerWins('player B');
    playerWins('player A');
    playerWins('player B');
    playerWins('player A');
    playerWins('player B');
    playerWins('player A');
    console.log(calculateScore())
    return calculateScore() === 'A-40';
});

assert('advantage when both players are execo and the second player scores', () => {
    gameWins = [];
    playerWins('player A');
    playerWins('player B');
    playerWins('player A');
    playerWins('player B');
    playerWins('player A');
    playerWins('player B');
    playerWins('player B');
    console.log(calculateScore())
    return calculateScore() === '40-A';
});

assert('when both players have an advantage but it is the second player who last had the advantage', () => {
    gameWins = [];
    playerWins('player A');
    playerWins('player B');
    playerWins('player A');
    playerWins('player B');
    playerWins('player A');
    playerWins('player B');
    playerWins('player A');
    playerWins('player B');
    console.log(calculateScore())
    return calculateScore() === 'Egalité';
});

assert('when both players have an advantage but it is the first player who last had the advantage', () => {
    gameWins = [];
    playerWins('player A');
    playerWins('player B');
    playerWins('player A');
    playerWins('player B');
    playerWins('player A');
    playerWins('player B');
    playerWins('player B');
    playerWins('player A');
    console.log(calculateScore())
    return calculateScore() === 'Egalité';
});