// il y a X set (manche)
// Nombre de points gagnés : 15 | 30 | 40 
// Si 2 joueurs sont execo à 40, le prochain qui marque aura avantage, et ce dernier devra avoir un 2e avantage et marquer pour gagner 1 jeu (point)
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
        if (win === 'player A') {
            playerAScore = computePlayerAScore(playerAScore, playerBScore);
        } else  if(win === 'player B') {
            playerBScore = computePlayerBScore(playerAScore, playerBScore);
        }
    });
    return result(playerAScore, playerBScore);
}

function computePlayerAScore(playerAScore, playerBScore) {
    if (playerAScore < 40 && playerAScore !== 30) {
        return playerAScore + 15;
    } else if (playerAScore === 30) {
        return playerAScore + 10;
    } else if (playerAScore === 40 && ( playerBScore === 'A' || playerBScore === 40)) {
        return 'A';
    } else if (playerAScore === 'A' && playerBScore === 40 || playerBScore < 40) {
        return 'Player A wins';
    } else if (playerAScore === 'A' && playerBScore === 'A') {
        return 'pA-A et pB-40';
    } 
}

function computePlayerBScore(playerAScore, playerBScore) {
    if (playerBScore < 40 && playerBScore !== 30) {
        return playerBScore + 15;
    } else if (playerBScore === 30) {
        return playerBScore + 10;
    } else  if ( playerBScore === 40 && (playerAScore === 'A' || playerAScore === 40)) {
        return 'A';
    } else if (playerBScore === 'A' && playerAScore === 40 || playerAScore < 40) {
        return 'Player B wins';
    } else if (playerAScore === 'A' && playerBScore === 'A') {
        return 'pA-40 et pB-A';
    }
}

function result(playerAScore, playerBScore) {
    if (playerAScore === 'A' && playerBScore === 'A') {
        return 'Deuce';
    } else if (playerAScore === 'Player A wins') {
        return 'Player A wins';
    } else if (playerBScore === 'Player B wins') {
        return 'Player B wins';
    } else if (playerBScore === 'pA-40 et pB-A' && playerAScore === 'A') {
        return '40-A';
    } else if (playerAScore === 'pA-A et pB-40' && playerBScore === 'A') {
        return 'A-40';
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
    playerAWin3Times();
    return calculateScore() === '40-0';
}); 

assert('40 points when the second player wins the game', () => {
    gameWins = [];
    playerBWin3Times();
    return calculateScore() === '0-40';
});

assert('advantage when both players are execo and the first player scores', () => {
    gameWins = [];
    isADeuce();
    playerWins('player A');
    return calculateScore() === 'A-40';
});

assert('advantage when both players are execo and the second player scores', () => {
    gameWins = [];
    isADeuce();
    playerWins('player B');
    return calculateScore() === '40-A';
});

assert('when both players have an advantage but it is the second player who last had the advantage', () => {
    gameWins = [];
    isADeuce();
    playerWins('player A');
    playerWins('player B');
    return calculateScore() === 'Deuce';
});

assert('when both players have an advantage but it is the first player who last had the advantage', () => {
    gameWins = [];
    isADeuce();
    playerWins('player B');
    playerWins('player A');
    return calculateScore() === 'Deuce';
});

assert('can have successive advantages and ties when finally first player wins', () => {
    gameWins = [];
    isADeuce();
    playerWins('player B');
    playerWins('player A');
    playerWins('player A');
    return calculateScore() === 'A-40';
});

assert('can have successive advantages and ties when finally second player wins', () => {
    gameWins = [];
    isADeuce();
    playerWins('player A');
    playerWins('player B');
    playerWins('player B');
    return calculateScore() === '40-A';
});

assert('when the first player wins after a draw', () => {
    gameWins = [];
    isADeuce();
    playerWins('player A');
    playerWins('player A');
    return calculateScore() === 'Player A wins';
});

assert('when the second player wins a draw', () => {
    gameWins = [];
    isADeuce();
    playerWins('player B');
    playerWins('player B');
    return calculateScore() === 'Player B wins';
});

assert('when the first player wins and the second player had less 40 points', () => {
    gameWins = [];
    playerWins('player A');
    playerWins('player B');
    playerAWin3Times();
    return calculateScore() === 'Player A wins';
});

assert('when the second player wins and the first player had less 40 points', () => {
    gameWins = [];
    playerWins('player B');
    playerWins('player A');
    playerBWin3Times();
    return calculateScore() === 'Player B wins';
});

function isADeuce() {
    playerAWin3Times();
    playerBWin3Times();
}

function playerAWin3Times() {
    playerWins('player A');
    playerWins('player A');
    playerWins('player A');
}

function playerBWin3Times() {
    playerWins('player B');
    playerWins('player B');
    playerWins('player B');
}