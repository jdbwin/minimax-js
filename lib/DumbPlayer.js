const randomIndex = require('./helpers').randomIndex;

class DumbPlayer {
  // public methods //
  constructor(player) {
    this.piece = player === 1 ? 'X' : '0';
  }

  /*
   * nextTurn decides the player move
   * returns new game state
   */
  nextTurn(gameState, move) {
    if (gameState.isOver()) {
      return gameState;
    }

    return gameState.move(this.dumbMove(gameState));
  }

  dumbMove(gameState) {
    const {occupiedSpaces, blankSpaces, width} = gameState.board;

    for (let space of occupiedSpaces) {
      const closest = blankSpaces.find(
        blank =>
          Math.abs(blank.row - space.row) < 2 &&
          Math.abs(blank.column - space.column) < 2,
      );

      if (closest) {
        return closest;
      }
    }

    return availableSpaces[randomIndex(availableSpaces)];
  }
}

module.exports = DumbPlayer;
