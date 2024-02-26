class Pion {
    constructor(x, y, player, sprite) {
      this.x = x;
      this.y = y;
      this.player = player;
    }
}


document.addEventListener('DOMContentLoaded', function() {
    let tour = 1; // 1 = joueur 1, 2 = joueur 2
    const canvas = document.getElementById('board');
    const ctx = canvas.getContext('2d');
    const gridSize = 8;
    const cellSize = canvas.width / gridSize;
    let map = [];
    let selectedPiece = null;
    let moves = [];

    function createMap(){
        for (var i = 0; i < gridSize; i++) {
            map[i] = [];
            for (var j = 0; j < gridSize; j++) {
                if (j == 0){
                    map[i][j] = new Pion(i,j,1);
                }else if (j == gridSize-1){
                    map[i][j] = new Pion(i,j,2);
                }else {
                    map[i][j] = new Pion(i,j,0);
                }
            }
        }
    }

    function draw(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drawGrid();
        drawPoints();
    }

    // Function to draw the grid on the canvas
    function drawGrid() {
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                ctx.strokeStyle = 'white';
                ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
            }
        }
    }

    // Function to create a point at specified coordinates
    function createPoint(x, y, player) {
        const row = Math.floor(y / cellSize);
        const col = Math.floor(x / cellSize);
        if (map[row][col].player == 0) {
            map[row][col] = new Pion(row, col, player);
        }
    }

    function createPointOnGrid(row, col, player) {
        // if (map[row][col].player == 0) {
            map[row][col] = new Pion(row, col, player);
        // }
    }
    function removePoint(x, y) {
        const row = Math.floor(y / cellSize);
        const col = Math.floor(x / cellSize);
        map[row][col].player = 0; // Réinitialiser le joueur à 0 pour supprimer le pion
    }

    function removePointOnGrid(row, col) {
        map[row][col].player = 0; // Réinitialiser le joueur à 0 pour supprimer le pion
        // console.log(map[row][col].player);
    }
    function drawPointImage(i, j, img) {
        const image = new Image();
        image.src = img;
        image.onload = function() {
            ctx.drawImage(image, i * cellSize, j * cellSize, cellSize, cellSize);
        }
    }

    function drawPoints() {
        for (var i = 0; i < gridSize; i++) {
            for (var j = 0; j < gridSize; j++) {
                const point = map[i][j];
                if (point.player == 1){
                    drawPointImage(j,i, "Img/X.png");
                }else if (point.player == 2){
                    drawPointImage(j,i, "Img/O.png");
                }
            }    
        }
    }

    function showMoves(moves){
        for (let index = 0; index < moves.length; index++) {
            drawPointImage(moves[index][1],moves[index][0], "Img/M.png"); 
            // console.log(moves[index][0],moves[index][1]);
        }
    }

    function tryAddMove(move){
        // console.log(map[move[0]][move[1]], move[0], move[1]);
        if (map[move[0]][move[1]].player == tour){
            return;
        }
        moves.push(move);
    }

    function getMoves(y,x){
        draw();
        moves = [];
        // console.log("étude du joueur en ", x, y, map[y][x]);
        let pion = map[y][x];
        //si c'est le bon tour
        if (pion.player != tour){
            return;
        }
        // regarder s'il exite des cases a gauche
        // drawPointImage(y+1, x+1, "Img/M.png");

        // Ajout des mouvements en diagonal
        if(y == gridSize-1){
            tryAddMove([y,x+1]);
            tryAddMove([y-1,x+1]);
        }else if(y == 0){
            tryAddMove([y+1,x+1]);
            tryAddMove([y,x+1]);
        }else{
            tryAddMove([y+1,x+1]);
            tryAddMove([y-1,x+1]);
        }

        //Check if there is a player in front
        if (map[y][x+1].player == tour){
            tryAddMove([y,x+2]);
            tryAddMove([y-1,x+2]);
            tryAddMove([y+1,x+2]);
        }
        
        
        
        showMoves(moves);
    }
    
    // Function to handle mouse down events on the canvas
    canvas.addEventListener('mousedown', function(event) {
        // console.log("Mouse down");
        const x = event.offsetX;
        const y = event.offsetY;
        selectedPiece = getPieceAtPosition(x, y);
        const row =  Math.floor(y / cellSize);
        const col = Math.floor(x / cellSize);
        getMoves(row, col);
    });

    // Function to handle mouse move events on the document
    canvas.addEventListener('mousemove', function(event) {

    });

    function listePresente(listePrincipale, listeRecherchee) {
        for (let sousListe of listePrincipale) {
            let correspond = true;
            if (sousListe.length === listeRecherchee.length) {
                for (let i = 0; i < sousListe.length; i++) {
                    if (sousListe[i] !== listeRecherchee[i]) {
                        correspond = false;
                        break;
                    }
                }
                if (correspond) {
                    return true;
                }
            }
        }
        return false;
    }

    // Function to handle mouse up events on the document
    canvas.addEventListener('mouseup', function(event) {
        const x = event.offsetX;
        const y = event.offsetY;
        if (selectedPiece)
        {
            const deleteRow = selectedPiece.x;
            const deleteCol = selectedPiece.y;

            const newRow =  Math.floor(y / cellSize);
            const newCol = Math.floor(x / cellSize);
            // console.log(moves,[newRow, newCol],moves.includes([newRow, newCol]));
            if (listePresente(moves,[newRow, newCol])){

                if (deleteRow == newRow && deleteCol == newCol){
                    return;
                }
                createPointOnGrid(newRow,newCol,selectedPiece.player)
                removePointOnGrid(deleteRow,deleteCol);
                draw();
            }
        }
        selectedPiece = null;
    });

    // Function to get the piece at specified coordinates
    function getPieceAtPosition(x, y) {
        const row = Math.floor(y / cellSize);
        const col = Math.floor(x / cellSize);
        return map[row][col];
    }

    // Function to handle click events on the canvas
    canvas.addEventListener('click', function(event) {
        const x = event.offsetX;
        const y = event.offsetY;
    });

    // Function to handle click events for removing points
    canvas.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        const x = event.offsetX;
        const y = event.offsetY;
        removePoint(x, y,2);
        
    });

    // Draw the grid initially
    createMap();
    // drawMoves(1,3);
    // drawPointImage(1, 3, "Img/M.png");
    draw();
});
