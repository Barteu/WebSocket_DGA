import {
  GameState
} from './gameState.js';

import{
  drawBoard
} from './draw.js'

let websocket;
let gameIsSaved = false;
let gameStarted = false;
let game = new GameState;

function init() {
    websocket = new WebSocket("ws://127.0.0.1:8888/dga");
    websocket.binaryType = "arraybuffer";
    websocket.onopen = function(e) { onOpen(e) };
    websocket.onclose = function(e) { onClose(e) };
    websocket.onmessage = function(e) { onMessage(e) };
   // websocket.onerror = function(e) { onError(e) };
  }
  

  function onOpen(e) {
    console.log(e.type);

    if(gameIsSaved){
      game.restoreGameState()
      reconnect()
    }
    else{
      var buffer = new ArrayBuffer(4);
      var dataView = new DataView(buffer);
      dataView.setInt8(0, 0, true);
      websocket.send(buffer);
    }
    websocket.onopen = null;
  }
  
  function onMessage(e) {
    console.log('rcvd: ' + e.data);
  
  //   var buffer = new ArrayBuffer(4);
    var dataView = new DataView(e.data);
  
    const mssgType = dataView.getInt8(0,true);
    
    switch(mssgType){
      case 3: // dice result
        game.diceResult = dataView.getInt8(1,true);
        document.getElementById('diceResult').innerHTML = game.diceResult; 
        break;
      case 4: // game start info
        setupGame(dataView);
        break;
      case 5: // enemy dice result
        game.enemyDiceResult = dataView.getInt8(1,true);
        document.getElementById('enemyDiceResult').innerHTML = game.enemyDiceResult; 
        break;

    }
  
    document.getElementById('message').innerHTML = mssgType; 
    //websocket.close();
  }

  
  function onClose (e) {
    if (e.wasClean) {
      console.log(`[close] Connection closed cleanly, code=${e.code} reason=${e.reason}`);
    } else {
      console.log('[close] Connection died');
    }
    if(gameStarted){
      game.saveGameState();
    }
  };

  
  function reconnect() {
    const mssg = new ArrayBuffer(3);
    const view = new DataView(mssg);
    console.log('reconnecting.. gameID:'+ game.gameID);
    view.setUint8(0, 1);
    view.setUint8(1, game.gameID);
    view.setUint8(2, game.playerNumber);
    websocket.send(mssg);
  }

  
  function throwDice(){
    console.log("throwing dice");
    var buffer = new ArrayBuffer(3);
    var dataView = new DataView(buffer);
    dataView.setInt8(0, 2, true);  // throw dice id
    dataView.setInt8(1, game.gameID, true);
    dataView.setInt8(2, game.playerNumber, true);

    websocket.send(buffer)

  }
  

  function setupGame(dataView){
     // 4, GameID, clientNumber, hasTurn, pawn1pos, pawn2pos, pawn3pos
    game.gameID = dataView.getInt8(1,true);
    game.playerNumber = dataView.getInt8(2,true);
    if(dataView.getInt8(3,true) == 1){
      game.isMyTurn = true;
    }
    else{
      game.isMyTurn = False;
    }
    game.pawn1pos = dataView.getInt8(4,true);
    game.pawn2pos = dataView.getInt8(5,true);
    game.pawn3pos = dataView.getInt8(6,true);
    console.log("player:", game.playerNumber);
    game.saveGameState();
    gameStarted = true;

  }


  window.addEventListener("load", init, false);
  window.addEventListener("load", drawBoard, false);

  let throwBtn = document.querySelector('#throw');
  throwBtn.addEventListener('click', throwDice)