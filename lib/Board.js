const spacesAreEqual = require('./helpers').spacesAreEqual;
const randomIndex = require('./helpers').randomIndex;

class Board {
  constructor() {
    this.width = 3;
    this.maxIndex = this.width - 1;
    this.numberOfBlanks = this.width ** 2;

    this.board = this.createBoard();
    this.blankSpaces = this.getBlankIndices();
    this.occupiedSpaces = [];
  }

  // public methods //

  /*
   * claimSpace places the player at the target space and returns current state
   */
  claimSpace(space, player) {
    this.board[space.row][space.column] = player;

    this.numberOfBlanks--;
    this.occupiedSpaces.push(space);

    // remove target space from blank spaces
    this.blankSpaces = this.blankSpaces.filter(
      blank => !spacesAreEqual(blank, space),
    );

    return this;
  }

  // private methods //

  /*
   * getBlankIndices return indices of null spaces
   */
  getBlankIndices() {
    // traverse board
    return this.board.reduce((blankSpaces, row, rowIndex) => {
      // traverse row
      for (let column = 0; column < row.length; column++) {
        blankSpaces.push({row: rowIndex, column});
      }

      return blankSpaces;
    }, []);
  }

  /*
   * getCornerSpace return top and bottom row edges
   */
  getCornerSpace() {
    const corners = [
      [0, 0],
      [0, this.maxIndex],
      [this.maxIndex, 0],
      [this.maxIndex, this.maxIndex],
    ];

    const corner = corners[randomIndex(corners)];

    return {row: corner[0], column: corner[1]};
  }

  getLastSpace() {
    return this.blankSpaces[0];
  }

  createBoard() {
    const board = new Array();

    for (let row = 0; row < this.width; row++) {
      board.push(new Array(this.width).fill(null));
    }

    return board;
  }

  printBoard() {
    const boardString = `
  ${'~'.repeat(this.width * 3)}
    ${this.board[0]}
    ${this.board[1]}
    ${this.board[2]}
  ${'~'.repeat(this.width * 3)}
  `;

    console.log(boardString);
  }
}

module.exports = Board;
