var Game = function() {
// game properties
  this.board = [];
  for (var i=0; i<6; i++) {
    this.board[i] = [];
    for (var j=0; j<7; j++) {
      this.board[i][j] = null;
    }
  }
  this.players = ["red", "blk"];
  this.turn = 0;
  this.lastTile = [];
  this.won = false;
  // game methods
  this.renderGame = function() {
    for (var i=0; i<6; i++) {
      console.log(this.board[i]);
    }
  }
  this.insertTile = function(column) {
    if (this.won || this.board[0][column] || column>6 || column <0 || typeof column !== "number" || (column/column !== 1 && column !== 0) ) {
      return;
    } else {
      this.turn++;
      var insertRow = 0;
      while (insertRow <5 && !this.board[insertRow+1][column] ) {
        insertRow++;
      }
      this.board[insertRow][column] = this.players[this.turn%2];
      this.renderGame();
      this.lastTile = [insertRow, column];
      this.check();
      return this.winner();
    }
  }
  this.checkVertical = function() {
    var numberOk = 1;
    var currentRow = this.lastTile[0];
    var currentColumn = this.lastTile[1];

    while ((this.board[currentRow +1] !== undefined) && (this.board[currentRow +1][currentColumn] === this.board[currentRow][currentColumn])) {
      numberOk++;
      currentRow++;
    }
    if (numberOk >= 4) {
      this.won = true;
    }
  }
  this.checkHorizontal = function() {
    var numberOk = 1;
    var currentRow = this.lastTile[0];
    var currentColumn = this.lastTile[1];

    while ((this.board[currentRow][currentColumn +1] !== undefined) && (this.board[currentRow][currentColumn +1] === this.board[currentRow][currentColumn])) {
      numberOk++;
      currentColumn++;
    }
    while ((this.board[currentRow][currentColumn -1] !== undefined) && (this.board[currentRow][currentColumn -1] === this.board[currentRow][currentColumn])) {
      numberOk++;
      currentColumn--;
    }
    if (numberOk >= 4) {
      this.won = true;
    }
  }
  this.checkDiagonalTopLeft = function() {
    var numberOk = 1;
    var currentRow = this.lastTile[0];
    var currentColumn = this.lastTile[1];

    while ((this.board[currentRow -1] !== undefined) && (this.board[currentRow][currentColumn -1] !== undefined) && (this.board[currentRow -1][currentColumn -1] === this.board[currentRow][currentColumn])) {
      numberOk++;
      currentColumn--;
      currentRow--;
    }
    while ((this.board[currentRow +1] !== undefined) && (this.board[currentRow][currentColumn +1] !== undefined) && (this.board[currentRow +1][currentColumn +1] === this.board[currentRow][currentColumn])) {
      numberOk++;
      currentColumn++;
      currentRow++;
    }
    if (numberOk >= 4) {
      this.won = true;
    }
  }
  this.checkDiagonalTopRight = function() {
    var numberOk = 1;
    var currentRow = this.lastTile[0];
    var currentColumn = this.lastTile[1];

    while ((this.board[currentRow -1] !== undefined) && (this.board[currentRow][currentColumn +1] !== undefined) && (this.board[currentRow -1][currentColumn +1] === this.board[currentRow][currentColumn])) {
      numberOk++;
      currentColumn++;
      currentRow--;
    }
    while ((this.board[currentRow +1] !== undefined) && (this.board[currentRow][currentColumn -1] !== undefined) && (this.board[currentRow +1][currentColumn -1] === this.board[currentRow][currentColumn])) {
      numberOk++;
      currentColumn--;
      currentRow++;
    }
    if (numberOk >= 4) {
      this.won = true;
    }
  }
  this.check = function() {
    this.checkDiagonalTopRight();
    this.checkDiagonalTopLeft();
    this.checkVertical();
    this.checkHorizontal();
  }
  this.winner = function() {
    if (this.won) {
      return  this.players[this.turn%2] + " won";
    }
  }
}


var game;
var setup = function() {
  game = new Game;
  game.renderGame();
}

setup();
