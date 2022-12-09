const fs = require('fs');

const data = fs.readFileSync('input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

const gameMap = {
  A: {
    X: 3,
    Y: 1,
    Z: 2,
  },
  B: {
    X: 1,
    Y: 2,
    Z: 3,
  },
  C: {
    X: 2,
    Y: 3,
    Z: 1,
  },
};

const outcomeMap = {
  X: 0,
  Y: 3,
  Z: 6,
}

let sum = 0;

lines.forEach(line => {
  const [opponent, outcome] = line.split(' ');

  sum += gameMap[opponent][outcome] + outcomeMap[outcome];
});

console.log(sum);