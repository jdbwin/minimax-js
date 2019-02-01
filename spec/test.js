const Game = require('../lib/Game');
const ComputerPlayer = require('../lib/ComputerPlayer');
const DumbPlayer = require('../lib/DumbPlayer');

test('ComputerPlayer vs ComputerPlayer ends in a draw', () => {
  const game = new Game(new ComputerPlayer(1), new ComputerPlayer(2));

  const result = game.play();

  expect(result).toEqual('draw');
});

test('ComputerPlayer vs Player ends in win for computer', () => {
  const game = new Game(new ComputerPlayer(1), new DumbPlayer(2));

  const result = game.play();

  expect(result).toEqual('win');
});
