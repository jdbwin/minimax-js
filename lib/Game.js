const GameState = require('./GameState');
const ComputerPlayer = require('./ComputerPlayer');
const DumbPlayer = require('./DumbPlayer');
const Board = require('./Board');

class Game {
  constructor(
    player1 = new ComputerPlayer(1),
    player2 = new ComputerPlayer(2),
  ) {
    this.player1 = player1;
    this.player2 = player2;

    this.gameState = new GameState(
      this.player1.piece,
      this.player2.piece,
      new Board(),
    );
  }

  play() {
    let newState = this.gameState;

    while (!newState.isOver()) {
      newState = this.player1.nextTurn(newState);

      newState = this.player2.nextTurn(newState);
    }

    newState.board.printBoard();

    const resultMessage = `-| ${newState.resultMessage} |-`;

    console.log(resultMessage);

    return newState.result;
  }
}

module.exports = Game;
