class Pion {
    constructor(x, y, player, sprite) {
      this.x = x;
      this.y = y;
      this.player = player;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('board');
    const ctx = canvas.getContext('2d');
    const gridSize = 8;
    const cellSize = canvas.width / gridSize;
    let map = [];
    let selectedPiece = null;

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
        if (map[row][col].player == 0) {
            map[row][col] = new Pion(row, col, player);
        }
    }
    function removePoint(x, y) {
        const row = Math.floor(y / cellSize);
        const col = Math.floor(x / cellSize);
        map[row][col].player = 0; // Réinitialiser le joueur à 0 pour supprimer le pion
    }

    function removePointOnGrid(row, col) {
        map[row][col].player = 0; // Réinitialiser le joueur à 0 pour supprimer le pion
        console.log(map[row][col].player);
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

    function drawPointImage(i, j, img) {
        const image = new Image();
        image.src = img;
        image.onload = function() {
            ctx.drawImage(image, i * cellSize, j * cellSize, cellSize, cellSize);
        }
    }

    // Function to handle mouse down events on the canvas
    canvas.addEventListener('mousedown', function(event) {
        console.log("Mouse down");
        const x = event.offsetX;
        const y = event.offsetY;
        selectedPiece = getPieceAtPosition(x, y);
    });

    // Function to handle mouse move events on the document
    canvas.addEventListener('mousemove', function(event) {

    });

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
            if (deleteRow == newRow && deleteCol == newCol){
                return;
            }
            createPointOnGrid(newRow,newCol,selectedPiece.player)
            removePointOnGrid(deleteRow,deleteCol);
            draw();
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
        // createPoint(x, y,2);
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
    draw();
});
