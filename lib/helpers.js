const _clone = require('lodash').clone;
const _cloneDeep = require('lodash').cloneDeep;

const randomIndex = arr => Math.floor(Math.random() * arr.length);

const spacesAreEqual = (space1, space2) =>
  space1.row === space2.row && space1.column === space2.column;

const arrayIsUniform = arr => arr.every(i => i === arr[0]);

// import from lodash
const clone = obj => _clone(obj);
const cloneDeep = obj => _cloneDeep(obj);

module.exports = {
  arrayIsUniform,
  clone,
  cloneDeep,
  randomIndex,
  spacesAreEqual,
};
