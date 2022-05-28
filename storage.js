export var gameID = writable(0);
export var playerNumber = 0;
export var isMyTurn = false;
export var diceResult = 0;
export var pawn1pos = 0;
export var pawn2pos = 0;
export var pawn3pos = 0;
export var isSaved = false;





export function saveGameState() {
		localStorage.setItem('gameID', JSON.stringify(getItem(gameID)));
		localStorage.setItem('playerNumber', JSON.stringify(getItem(playerNumber)));
		localStorage.setItem('isMyTurn', JSON.stringify(getItem(isMyTurn)));
		localStorage.setItem('diceResult',JSON.stringify(getItem(diceResult)));
		localStorage.setItem('pawn1pos', JSON.stringify(getItem(pawn1pos)));
		localStorage.setItem('pawn2pos', JSON.stringify(getItem(pawn2pos)));
		localStorage.setItem('pawn3pos', JSON.stringify(getItem(pawn3pos)));
		localStorage.setItem('isSaved', JSON.stringify(true));
}


export function restoreGameState() {
	if (localStorage.getItem('isSaved')) {
		gameID.set(JSON.parse(localStorage.getItem('gameID')));
		playerNumber.set(JSON.parse(localStorage.getItem('playerNumber')));
        isMyTurn.set(JSON.parse(localStorage.getItem('isMyTurn')));
        diceResult.set(JSON.parse(localStorage.getItem('diceResult')));
        pawn1pos.set(JSON.parse(localStorage.getItem('pawn1pos')));
        pawn2pos.set(JSON.parse(localStorage.getItem('pawn2pos')));
        pawn3pos.set(JSON.parse(localStorage.getItem('pawn3pos')));
	}
}


export function clearGameState() {
	gameID = 0;
	playerNumber = 0;
	isMyTurn = false;
	diceResult = 0;
    pawn1pos = 0;
    pawn2pos = 0;
    pawn3pos = 0;
}