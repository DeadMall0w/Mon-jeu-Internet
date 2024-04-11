class Pion {
    constructor(x, y, player, sprite) {
      this.x = x;
      this.y = y;
      this.player = player;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    //#region Initialization
    let roundIndex = 0;
    let gameStarted = false;
    let tour = 1; // 1 = joueur 1, 2 = joueur 2

    const roundText = document.getElementById('Round-index');
    const playerTurn = document.getElementById('Player-turn');
    const canvas = document.getElementById('board');
    const ctx = canvas.getContext('2d');
    const victoryList = document.getElementById("victory-list");

    let gridSize = 6;

    let map = [];
    let selectedPiece = null;
    let moves = [];

    UpdateCanvasSize();

    window.addEventListener('resize', function(event) {
        UpdateCanvasSize();
    }, true);

    function UpdateCanvasSize() {
        canvas.width = window.innerWidth-400;
        canvas.height = window.innerHeight;
    
        cellSize =  Math.min(canvas.height / gridSize, canvas.width / gridSize);
        draw();
    }
    
    function startRound(){
        gameStarted = true;
        roundIndex++;
        console.log("---")
        console.log("Begining of round : ", roundIndex);
        roundText.innerHTML = "Manche : " + roundIndex;
        createMap();
        draw();
        if (roundIndex%2==0){
            tour = 1;
            console.log("Player 2 start");
        }else{
            tour = -1;
            console.log("Player 1 start");
        }
        UpdatePlayerTurn();
    }

    function AddVictory(winner){
        var newLi = document.createElement("li");
        newLi.textContent = "Manche " + roundIndex + " : " + winner; // Vous pouvez changer le "O" pour le résultat désiré
        victoryList.appendChild(newLi)
        console.log("Victory : ", winner);
      }

    function finishRound(winner){
        console.log("End of round : ", roundIndex);
        if (winner == 1){
            console.log("Player 1 win");
        }else {
            console.log("Player 2 win");
        }
    }

    function createMap(){
        console.log("Map created !")
        for (var i = 0; i < gridSize; i++) {
            map[i] = [];
            for (var j = 0; j < gridSize; j++) {
                if (j == 0){
                    map[i][j] = new Pion(i,j,1);
                }else if (j == gridSize-1){
                    map[i][j] = new Pion(i,j,-1);
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
        if(gameStarted){
            drawPoints();
        }
    }

    function drawGrid() {
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                ctx.strokeStyle = 'white';
                ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
            }
        }
    }

    function UpdatePlayerTurn() {
        if(tour == 1){
            tour = -1;
            playerTurn.innerHTML = "Joueur : O";
        }else{
            tour = 1;
            playerTurn.innerHTML = "Joueur : X";
        }
        console.log("Turn of player : ", tour);
    }

    function createPointOnGrid(row, col, player) {
        map[row][col] = new Pion(row, col, player);

    }
    function removePoint(x, y) {
        const row = Math.floor(y / cellSize);
        const col = Math.floor(x / cellSize);
        map[row][col].player = 0; // Réinitialiser le joueur à 0 pour supprimer le pion
    }

    function removePointOnGrid(row, col) {
        map[row][col].player = 0; // Réinitialiser le joueur à 0 pour supprimer le pion
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
                    drawPointImage(j,i, "Img/x.png");
                }else if (point.player == -1){
                    drawPointImage(j,i, "Img/O.png");
                }
            }    
        }
    }

    function showMoves(moves){
        for (let index = 0; index < moves.length; index++) {
            drawPointImage(moves[index][1],moves[index][0], "Img/M.png"); 
        }
    }

    function tryAddMove(move){
        x = move[0]
        y = move[1]
        if(x == gridSize || y == gridSize || x == -1 || y == -1){
            return;
        }

        if (map[x][y].player == tour){
            return;
        }
        moves.push(move);
    }

    // Checks if the given position is a locking position for the current player.
    function isLock(x,y){
        if(map[y][x].player == 1 && x == gridSize-1){
            return true;
        }
        if(map[y][x].player == -1 && x == 0){
            return true;
        }

        neightbour = [];
        if(x != gridSize-1){
            neightbour.push(map[y][x+1].player);
        }

        if(y != gridSize-1){
            neightbour.push(map[y+1][x].player);
        }

        if (x != 0){
            neightbour.push(map[y][x-1].player);
        }

        if (y != 0){
            neightbour.push(map[y-1][x].player);
        }

        return neightbour.includes(tour*-1);
    }

    function getMoves(y,x){
        draw();
        moves = [];

        let pion = map[y][x];
        //si c'est le bon tour
        if (pion.player != tour){
            return;
        }

        // Check for locking position
        if(isLock(x,y)){
            console.log(x,y," Locked !");
            return;
        }

        // Ajout des mouvements en diagonal
        if(y == gridSize-1){
            tryAddMove([y,x+tour]);
            tryAddMove([y-1,x+tour]);
        }else if(y == 0){
            tryAddMove([y+1,x+tour]);
            tryAddMove([y,x+tour]);
        }else{
            tryAddMove([y+1,x+tour]);
            tryAddMove([y-1,x+tour]);
        }

        //Check if there is a player in front
        if (map[y][x+tour].player == tour){
            tryAddMove([y,x+(tour*2)]);
            tryAddMove([y-1,x+(tour*2)]);
            tryAddMove([y+1,x+(tour*2)]);
        }
        
        showMoves(moves);
    }
    
    // Function to handle mouse down events on the canvas
    canvas.addEventListener('mousedown', function(event) {
        if(gameStarted == false){
            console.log("Game not started !");
            return;
        }
        const x = event.offsetX;
        const y = event.offsetY;
        selectedPiece = getPieceAtPosition(x, y);
        const row =  Math.floor(y / cellSize);
        const col = Math.floor(x / cellSize);
        console.log("Click at :", row, col, "piece : " ,selectedPiece.player);
        getMoves(row, col);
    });

    function isPresentIn(mainList, secondList) {
        for (let sousListe of mainList) {
            let correspond = true;
            if (sousListe.length === secondList.length) {
                for (let i = 0; i < sousListe.length; i++) {
                    if (sousListe[i] !== secondList[i]) {
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
        if(gameStarted == false){
            console.log("Game not started !");
            return;
        }
        const x = event.offsetX;
        const y = event.offsetY;
        if (selectedPiece)
        {
            const deleteRow = selectedPiece.x;
            const deleteCol = selectedPiece.y;

            const newRow =  Math.floor(y / cellSize);
            const newCol = Math.floor(x / cellSize);

            if (isPresentIn(moves,[newRow, newCol])){

                if (deleteRow == newRow && deleteCol == newCol){
                    return;
                }
                createPointOnGrid(newRow,newCol,selectedPiece.player)
                removePointOnGrid(deleteRow,deleteCol);
                draw();

                UpdatePlayerTurn();

                allLock = true;
                for (let y = 0; y  < gridSize; y++) {
                    for (let x = 0; x  < gridSize; x++) {
                        if(map[y][x].player == tour){
                            if(!isLock(x,y)){
                                allLock = false;
                            }
                        }
                    }
                }
                if(allLock){
                    console.log("aucun move possible");
                }
            }
        }
        selectedPiece = null;
    });

    // Print map to console
    document.addEventListener('keydown', function(event) {
        if (event.key === ' ') {
            console.log(map);
        }else if (event.key === 'm') {
            startRound();
        }else if (event.key === 'O') {
            AddVictory("O");
            startRound();
        }else if (event.key === 'X') {
            AddVictory("X");
            startRound();
        }
    });

    // Function to get the piece at specified coordinates
    function getPieceAtPosition(x, y) {
        const row = Math.floor(y / cellSize);
        const col = Math.floor(x / cellSize);
        return map[row][col];
    }

    // Function to remove contextmenu (right click)
    canvas.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        const x = event.offsetX;
        const y = event.offsetY;
        removePoint(x, y,2);
        
    });

    startRound();
});
