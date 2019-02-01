const randomIndex = require('./helpers').randomIndex;

class ComputerPlayer {
  // public methods //
  constructor(player) {
    this.piece = player === 1 ? 'X' : '0';

    this.currentMove;
    this.baseScore;
    this.gameState;
  }

  /*
   * nextTurn decides the player move
   * returns new game state
   */
  nextTurn(gameState) {
    if (gameState.isOver()) {
      return gameState;
    }

    this.gameState = gameState;
    this.player = gameState.player;

    return gameState.move(this.perfectMove());
  }

  // private methods //
  perfectMove() {
    const {blankSpaces, numberOfBlanks, occupiedSpaces} = this.gameState.board;

    // if new board choose a corner
    if (!occupiedSpaces.length) {
      return this.gameState.board.getCornerSpace();
    }

    // choose last space if only one space
    if (numberOfBlanks === 1) {
      return this.gameState.board.getLastSpace();
    }

    this.baseScore = blankSpaces.length + 1;

    const bound = this.baseScore + 1;

    this.minimax(this.gameState, 0, -bound, bound);

    return this.currentMove;
  }

  minimax(gameState, depth, lower, upper) {
    if (gameState.isOver()) {
      return this.evaluateState(gameState, depth);
    }

    const moveScores = [];

    for (let blank of gameState.board.blankSpaces) {
      const moveState = gameState.move(blank);
      const isCurrentPlayer = gameState.player === this.player;

      const score = this.minimax(moveState, depth + 1, lower, upper);

      const moveScore = {score, blank};

      if (isCurrentPlayer) {
        moveScores.push(moveScore);
      }

      if (isCurrentPlayer && moveScore.score > lower) {
        lower = moveScore.score;
      }

      if (!isCurrentPlayer && moveScore.score < upper) {
        upper = moveScore.score;
      }

      if (upper < lower) {
        break;
      }
    }

    if (gameState.player !== this.player) {
      return upper;
    }

    const bestMove = moveScores.reduce((current, next) => {
      return current.score >= next.score ? current : next;
    });

    this.currentMove = bestMove.blank;

    return lower;
  }

  evaluateState(gameState, depth) {
    if (gameState.isWon(this.player)) {
      return this.baseScore - depth;
    } else if (gameState.isLost(this.player)) {
      return depth - this.baseScore;
    } else {
      return 0;
    }
  }
}

module.exports = ComputerPlayer;
