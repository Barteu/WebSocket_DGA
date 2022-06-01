export class GameState{
  
    constructor() {
        this.gameID =  -1;
        this.playerNumber = 0;
        this.isMyTurn = false;
        this.diceResult = 0;
        this.diceRollState = 0; // 0-not rolled, 1-rolled but result is unknown, 2-rolled and result is known
        this.enemyDiceResult = 0;
        this.p1pawn1pos = 0;
        this.p1pawn2pos = 1;
        this.p2pawn1pos = 11;
        this.p2pawn2pos = 12;
        this.isSaved = false;
      }
  
     saveGameState() {
          localStorage.setItem('gameID', JSON.stringify(this.gameID));
          localStorage.setItem('playerNumber', JSON.stringify(this.playerNumber));
          localStorage.setItem('isMyTurn', JSON.stringify(this.isMyTurn));
          localStorage.setItem('diceResult',JSON.stringify(this.diceResult));
          localStorage.setItem('diceRollState',JSON.stringify(this.diceRollState));
          localStorage.setItem('enemyDiceResult',JSON.stringify(this.enemyDiceResult));
          localStorage.setItem('p1pawn1pos', JSON.stringify(this.p1pawn1pos));
          localStorage.setItem('p1pawn2pos', JSON.stringify(this.p1pawn2pos));
          localStorage.setItem('p2pawn1pos', JSON.stringify(this.p2pawn1pos));
          localStorage.setItem('p2pawn2pos', JSON.stringify(this.p2pawn2pos));
          localStorage.setItem('isSaved', JSON.stringify(true));
          console.log("Game state has been SAVED");
  }
  

   restoreGameState() {
     console.log("try to restore..");
      if (localStorage.getItem('isSaved')) {
        console.log("restoring game state..");
        this.gameID = (JSON.parse(localStorage.getItem('gameID')));
        this.playerNumber = (JSON.parse(localStorage.getItem('playerNumber')));
        this.isMyTurn = (JSON.parse(localStorage.getItem('isMyTurn')));
        this.diceResult = (JSON.parse(localStorage.getItem('diceResult')));
        this.diceRollState = (JSON.parse(localStorage.getItem('diceRollState')));
        this.enemyDiceResult = (JSON.parse(localStorage.getItem('enemyDiceResult')));
        this.p1pawn1pos = (JSON.parse(localStorage.getItem('p1pawn1pos')));
        this.p1pawn2pos = (JSON.parse(localStorage.getItem('p1pawn2pos')));
        this.p2pawn1pos = (JSON.parse(localStorage.getItem('p2pawn1pos')));
        this.p2pawn2pos = (JSON.parse(localStorage.getItem('p2pawn2pos')));
        this.isSaved = (JSON.parse(localStorage.getItem('isSaved')));
      }
  }

  getIsSaved(){
    this.isSaved = (JSON.parse(localStorage.getItem('isSaved')));
    return this.isSaved;
  }

  setIsSaved(state){
    this.isSaved = state;
    localStorage.setItem('isSaved', JSON.stringify(state));
  }


  }