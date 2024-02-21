const canvas = document.getElementById('Canvas');
const ctx = canvas.getContext('2d');

// function resizeCanvas() {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerWidth;
// }
// resizeCanvas();

// Fonction pour créer une grille de la taille spécifiée

class Pion {
    constructor(x, y, player, sprite) {
      this.x = x;
      this.y = y;
      this.player = player;
      this.sprite = sprite
    }

    
    changeValue(v){

    }
  }

let squareSize = 50; 
let width = 10;
let height = 10;

function createGrid(rows, cols) {
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

function drawSprite(sprite, row, col) {
    const img = new Image();
    img.src = sprite;
    
    img.onload = function() {
            ctx.clearRect(col * squareSize, row * squareSize, squareSize, squareSize); // Efface la zone du sprite précédent
            ctx.drawImage(img, col * squareSize, row * squareSize, squareSize, squareSize); // Dessine le nouveau sprite
    };
    return img
}

function createMap(){
    map = []
    for (var i = 0; i < width; i++) {
        map[i] = [];
        for (var j = 0; j < height; j++) {
            if (j == 0){
                map[i][j] = new Pion(i,j,1);
            }else if (j == width-1){
                map[i][j] = new Pion(i,j,2);
            }else {
                map[i][j] = new Pion(i,j,0);
            }
        }
    }
    console.log(map);
    return map;
}

function drawMap(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    createGrid(width, height, 50)
    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {
            if (map[i][j].player == 1){
                map[i][j].sprite = drawSprite("Img/X.png", i, j);
            }else if (map[i][j].player == 2){
                map[i][j].sprite = drawSprite("Img/O.png", i, j);
            }
        }
    }
}

function Init(){
    map = createMap();
    drawMap(map);
    createGrid(width, height);

    // ctx.clearRect(sprite.x, sprite.y, sprite.width, sprite.height); map[0][0].sprite = 0;
    const sprite = map[0][0].sprite;

    console.log(sprite);

    //Je veux supprimer 'sprite' pour qu'il ne soit plus affiché a l'écran
    // Effacer le sprite du canvas
    ctx.clearRect(sprite.x * squareSize, sprite.y * squareSize, squareSize, squareSize);

    // Réinitialiser le sprite du premier pion pour qu'il ne soit plus affiché
    map[0][0].sprite = null;

    console.log("Le premier pion a été supprimé avec succès.");
}


Init();
