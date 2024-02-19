const canvas = document.getElementById('Canvas');
const ctx = canvas.getContext('2d');

// function resizeCanvas() {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerWidth;
// }
// resizeCanvas();

// Fonction pour créer une grille de la taille spécifiée

let squareSize = 50; 
function createGrid(rows, cols) {
    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    squareSize = canvas.width/rows
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            ctx.strokeStyle = 'white';
            ctx.strokeRect(col * squareSize, row * squareSize, squareSize, squareSize);
        }
    }
}

createGrid(8, 8, 50);


function removeSquare(row, col, squareSize) {
    ctx.clearRect(col * squareSize, row * squareSize, squareSize, squareSize);
}

function drawSprite(sprite, row, col) {
    const img = new Image();
    img.src = sprite;
 
    img.onload = function() {
        ctx.drawImage(img, col * squareSize, row * squareSize, squareSize, squareSize);
    };
}

drawSprite('Img/O.png', 1, 1);
drawSprite('Img/x.png', 1, 4);
