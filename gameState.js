export class GameState{
    // constructor(gameID, playerNumber, isMyTurn, pawn1pos, pawn2pos, pawn3pos) {
    //   this.gameID =  gameID;
    //   this.playerNumber = playerNumber;
    //   this.isMyTurn = isMyTurn;
    //   this.diceResult = 0;
    //   this.pawn1pos = pawn1pos;
    //   this.pawn2pos = pawn2pos;
    //   this.pawn3pos = pawn3pos;
    // }
  
    constructor() {
        this.gameID =  0;
        this.playerNumber = 0;
        this.isMyTurn = false;
        this.diceResult = 0;
        this.enemyDiceResult = 0;
        this.pawn1pos = 0;
        this.pawn2pos = 0;
        this.pawn3pos = 0;
      }
  
      

     saveGameState() {
          localStorage.setItem('gameID', JSON.stringify(this.gameID));
          localStorage.setItem('playerNumber', JSON.stringify(this.playerNumber));
          localStorage.setItem('isMyTurn', JSON.stringify(this.isMyTurn));
          localStorage.setItem('diceResult',JSON.stringify(this.diceResult));
          localStorage.setItem('enemyDiceResult',JSON.stringify(this.enemyDiceResult));
          localStorage.setItem('pawn1pos', JSON.stringify(this.pawn1pos));
          localStorage.setItem('pawn2pos', JSON.stringify(this.pawn2pos));
          localStorage.setItem('pawn3pos', JSON.stringify(this.pawn3pos));
          localStorage.setItem('isSaved', JSON.stringify(true));
  }
  
   restoreGameState() {
      if (localStorage.getItem('isSaved')) {
        this.gameID = (JSON.parse(localStorage.getItem('gameID')));
        this.playerNumber = (JSON.parse(localStorage.getItem('playerNumber')));
        this.isMyTurn = (JSON.parse(localStorage.getItem('isMyTurn')));
        this.diceResult = (JSON.parse(localStorage.getItem('diceResult')));
        this.enemyDiceResult = (JSON.parse(localStorage.getItem('enemyDiceResult')));
        this.pawn1pos = (JSON.parse(localStorage.getItem('pawn1pos')));
        this.pawn2pos = (JSON.parse(localStorage.getItem('pawn2pos')));
        this.pawn3pos = (JSON.parse(localStorage.getItem('pawn3pos')));
      }
  }
  }