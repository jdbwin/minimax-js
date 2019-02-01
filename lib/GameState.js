const {clone, cloneDeep, arrayIsUniform} = require('./helpers');

class GameState {
  // public methods //

  constructor(player, opponent, board) {
    this.player = player;
    this.opponent = opponent;
    this.board = board;

    this.winner = null;
    this.resultMessage = null;
    this.result = null;
  }

  move(space) {
    const newState = clone(this);
    newState.player = this.opponent;
    newState.opponent = this.player;
    newState.board = cloneDeep(this.board);

    newState.board.claimSpace(space, this.player);

    return newState;
  }

  isOver() {
    return this.checkForWin() || this.isDraw();
  }

  isDraw() {
    if (this.board.numberOfBlanks === 0 && !this.winner) {
      this.result = 'draw';
      this.resultMessage = 'No one won. It was a draw!';
      return true;
    }
  }

  isLost(player) {
    return this.winner && this.winner !== player;
  }

  isWon(player) {
    return this.winner && this.winner === player;
  }

  // private methods //

  checkForWin() {
    return (
      this.winningRow() ||
      this.winningColumn() ||
      this.winningTopLeftDiagonal() ||
      this.winningBottomLeftDiagonal()
    );
  }

  winningRow() {
    const board = this.board.board;

    for (let row = 0; row < board.length; row++) {
      if (board[row].includes(null) || !arrayIsUniform(board[row])) {
        continue;
      }

      this.winner = board[row][0];
      this.result = 'win';
      this.resultMessage = `${this.winner} won with a winning row!`;
      return true;
    }

    return false;
  }

  winningColumn() {
    const board = this.board.board;
    let winningColumn = null;

    for (let column = 0; column < board.length; column++) {
      const newColumn = [];
      for (let row = 0; row < board.length; row++) {
        if (board[row][column] === null) {
          break;
        }

        newColumn.push(board[row][column]);
      }

      if (newColumn.length === board.length && arrayIsUniform(newColumn)) {
        winningColumn = newColumn;
      }
    }

    if (winningColumn) {
      this.winner = winningColumn[0];
      this.result = 'win';
      this.resultMessage = `${this.winner} won with a winning diagonal!`;
      return true;
    }

    return false;
  }

  winningTopLeftDiagonal() {
    const board = this.board.board;
    let diagonal = [];
    let column = 0;

    for (let row = 0; row < board.length; row++) {
      const player = board[row][column];

      if (player === null) {
        return false;
      }

      if (diagonal.length && !diagonal.includes(player)) {
        return false;
      }

      diagonal.push(player);
      column++;
    }

    this.winner = diagonal[0];
    this.result = 'win';
    this.resultMessage = `${this.winner} won with a winning diagonal!`;

    return true;
  }

  winningBottomLeftDiagonal() {
    const board = this.board.board;
    let diagonal = [];
    let column = 0;

    for (let row = board.length - 1; row >= 0; row--) {
      const player = board[row][column];

      if (player === null) {
        return false;
      }

      if (diagonal.length && !diagonal.includes(player)) {
        return false;
      }

      diagonal.push(player);
      column++;
    }

    this.winner = diagonal[0];
    this.result = 'win';
    this.resultMessage = `${this.winner} won with a winning diagonal!`;

    return true;
  }
}

module.exports = GameState;
