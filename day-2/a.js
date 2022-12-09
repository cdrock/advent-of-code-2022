const fs = require('fs');

const data = fs.readFileSync('input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

const gameMap = {
  A: {
    X: 3,
    Y: 6,
    Z: 0,
  },
  B: {
    X: 0,
    Y: 3,
    Z: 6,
  },
  C: {
    X: 6,
    Y: 0,
    Z: 3,
  },
};

const playMap = {
  X: 1,
  Y: 2,
  Z: 3,
}

let sum = 0;

lines.forEach(line => {
  const [opponent, me] = line.split(' ');

  sum += gameMap[opponent][me] + playMap[me];
});

console.log(sum);