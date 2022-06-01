import {
  GameState
} from './gameState.js';

import{
  drawAll,
  drawWinner
} from './draw.js'

let websocket;
let gameStarted = false;
let waitForOpponent = false;
let game = new GameState;

function init() {
    websocket = new WebSocket("ws://127.0.0.1:8888/dga");
    websocket.binaryType = "arraybuffer";
    websocket.onopen = function(e) { onOpen(e) };
    websocket.onclose = function(e) { onClose(e) };
    websocket.onmessage = function(e) { onMessage(e) };
   document.querySelector('#usePawn1').disabled = true;
   document.querySelector('#usePawn2').disabled = true;
   document.querySelector('#roll').disabled = true;
  }
  

  function onOpen(e) {
    game.getIsSaved();
    console.log("onOpen : game IsSaved: "+ game.isSaved);
    if(game.isSaved){
      game.restoreGameState()
      reconnect();
      gameStarted = true;
      console.log("dice op:" +  game.enemyDiceResult);
        if(game.isMyTurn){
          if(game.diceRollState==0){
            document.querySelector('#roll').disabled = false;
            document.querySelector('#usePawn1').disabled = true;
            document.querySelector('#usePawn2').disabled = true;
          }
          else if(game.diceRollState==2){
            document.querySelector('#roll').disabled = true;
            document.querySelector('#usePawn1').disabled = false;
            document.querySelector('#usePawn2').disabled = false;
          }
          else{
            document.querySelector('#roll').disabled = true;
          }

        }else{
          document.querySelector('#usePawn1').disabled = true;
          document.querySelector('#usePawn2').disabled = true;
          document.querySelector('#roll').disabled = true;
        }
    }
    else if (waitForOpponent==false){
      sendInitMessage();
    }
    websocket.onopen = null;
  }
  

function sendInitMessage(){
  var buffer = new ArrayBuffer(4);
  var dataView = new DataView(buffer);
  dataView.setInt8(0, 0, true);
  websocket.send(buffer);
  waitForOpponent = true;
}


  function onMessage(e) {

  //   var buffer = new ArrayBuffer(4);
    var dataView = new DataView(e.data);
    const mssgType = dataView.getInt8(0,true);
    console.log('received message with type: ' + mssgType);
    switch(mssgType){
      case 3: // dice result
        game.diceResult = dataView.getInt8(1,true);
        console.log("I got my dice result:" + game.diceResult);
        game.diceRollState = 2;
        renderAll();  
        document.querySelector('#usePawn1').disabled = false;
        document.querySelector('#usePawn2').disabled = false;
        break;
      case 4: // game start info
        setupGame(dataView);
        waitForOpponent = false;
        console.log('Game starterd');
        if(game.isMyTurn){
          document.querySelector('#roll').disabled = false;
        }
        break;
      case 5: // enemy dice result
        game.enemyDiceResult = dataView.getInt8(1,true);
        console.log("I got enemy dice result:" + game.enemyDiceResult);
        renderAll();
        break;
      case 7: // get new pawn pos
        console.log('I got new pawn positions');
        game.p1pawn1pos = dataView.getInt8(1,true);
        game.p1pawn2pos = dataView.getInt8(2,true);
        game.p2pawn1pos = dataView.getInt8(3,true);
        game.p2pawn2pos = dataView.getInt8(4,true);
        console.log(game.p1pawn1pos, game.p1pawn2pos, game.p2pawn1pos, game.p2pawn2pos);
        renderAll();
        break;
      case 8: // its my turn
        console.log('Now its my turn');
        game.isMyTurn = true;
        document.querySelector('#roll').disabled = false;
        renderAll();
        break;
      case 9: // end of game
        const winner =  dataView.getInt8(1,true);
        drawWinner(winner);
        game = new GameState()
        game.saveGameState();
        game.setIsSaved(false);
        gameStarted = false;
        document.querySelector('#usePawn1').disabled = true;
        document.querySelector('#usePawn2').disabled = true;
        document.querySelector('#roll').disabled = true;
        setTimeout(renderAll, 2000);
        setTimeout(sendInitMessage, 2500);
        break;
      default:
        console.log('Unknown message');
        break;
    }
    
    if(gameStarted){
      game.saveGameState();
    }
  }

  
  function onClose (e) {
    if (e.wasClean) {
      console.log(`[close] Connection closed cleanly, code=${e.code} reason=${e.reason}`);
    } else {
      console.log('[close] Connection died');
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
    renderAll();
  }

  
  function rollDice(){
    if (game.isMyTurn && game.diceRollState == 0){
      console.log("rolling dice");
      var buffer = new ArrayBuffer(3);
      var dataView = new DataView(buffer);
      dataView.setInt8(0, 2, true);  // roll dice id
      dataView.setInt8(1, game.gameID, true);
      dataView.setInt8(2, game.playerNumber, true);
      websocket.send(buffer);
      game.diceRollState = 1;
      document.querySelector('#roll').disabled = true;
    }
    if(gameStarted){
      console.log('SAVING GAME STATE');
      game.saveGameState();
    }

  }
  

  function setupGame(dataView){
     // 4, GameID, clientNumber, hasTurn
    game.gameID = dataView.getInt8(1,true);
    game.playerNumber = dataView.getInt8(2,true);
    if(dataView.getInt8(3,true) == 1){
      game.isMyTurn = true;
    }
    else{
      game.isMyTurn = false;
    }
    console.log("My player number:", game.playerNumber);
    game.saveGameState();
    gameStarted = true;
    renderAll();
  }


  function renderAll(){
    drawAll(game);
  }


  function usePawn1(e){
    usePawn(0);
    document.querySelector('#usePawn1').disabled = true;
    document.querySelector('#usePawn2').disabled = true;
  }


  function usePawn2(e){
    usePawn(1);
    document.querySelector('#usePawn1').disabled = true;
    document.querySelector('#usePawn2').disabled = true;
  }


  function usePawn(pawnNumber){
    console.log("use pawn clicked");
    if (game.isMyTurn && game.diceRollState==2){
       console.log(`Using pawn ${pawnNumber}`);
       var buffer = new ArrayBuffer(4);
       var dataView = new DataView(buffer);
       dataView.setInt8(0, 6, true);  // use pawn id
       dataView.setInt8(1, game.gameID, true);
       dataView.setInt8(2, game.playerNumber, true);
       dataView.setInt8(3, pawnNumber, true);
       websocket.send(buffer);
       game.isMyTurn = false;
       game.diceRollState = 0;
      }else{
        console.log("I cant use pawn");
      }

      if(gameStarted){
        console.log('SAVING GAME STATE');
        game.saveGameState();
      }
  }


  window.addEventListener("load", init, false);
  window.addEventListener("load", renderAll, false);

  let rollBtn = document.querySelector('#roll');
  rollBtn.addEventListener('click', rollDice);

  let usePawn1btn = document.querySelector('#usePawn1');
  usePawn1btn.addEventListener('click', usePawn1);

  let usePawn2btn = document.querySelector('#usePawn2');

  usePawn2btn.addEventListener('click', usePawn2);
