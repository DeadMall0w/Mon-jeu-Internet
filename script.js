const canvas = document.getElementById('Canvas');
const ctx = canvas.getContext('2d');

// function resizeCanvas() {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerWidth;
// }
// resizeCanvas();

// Fonction pour créer une grille de la taille spécifiée

class Pion {
    constructor(x, y, player) {
      this.x = x;
      this.y = y;
      this.player = player;
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

function CreateMap(){
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

function DrawMap(){
    createGrid(width, height, 50)
    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {
            console.log(map[i][j].joueur );
            if (map[i][j].joueur == 1){
                drawSprite("Img/X.png", i, j);
            }else if (map[i][j].joueur == 2){
                drawSprite("Img/O.png", i, j);
            }
        }
    }
}

function Init(){
    map = CreateMap();
    DrawMap(map);
    createGrid(width, height);

}


Init();
