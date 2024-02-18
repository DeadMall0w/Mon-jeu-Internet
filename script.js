// Génération du plateau de jeu
function createBoard() {
    const board = document.getElementById('board');

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.dataset.row = row;
            square.dataset.col = col;
            board.appendChild(square);
        }
    }
}

// Fonction d'initialisation
function init() {
    createBoard();
}

// Appel de la fonction d'initialisation
init();
