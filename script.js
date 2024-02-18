const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Fonction pour créer une grille de la taille spécifiée
function createGrid(rows, cols, squareSize) {
    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner la grille
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            ctx.strokeStyle = 'black';
            ctx.strokeRect(col * squareSize, row * squareSize, squareSize, squareSize);
        }
    }
}

createGrid(8, 8, 50);


function removeSquare(row, col, squareSize) {
    ctx.clearRect(col * squareSize, row * squareSize, squareSize, squareSize);
}

function drawSprite(sprite, row, col, squareSize) {
    // Charger l'image sprite
    const img = new Image();
    img.src = sprite;

    // Attendre le chargement de l'image
    img.onload = function() {
        // Dessiner l'image dans la case spécifiée
        ctx.drawImage(img, col * squareSize, row * squareSize, squareSize, squareSize);
    };
}

drawSprite('sprite.png', 1, 1, 50);

// removeSquare(1, 1, 50);