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