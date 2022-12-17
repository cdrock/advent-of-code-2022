const fs = require('fs');

const data = fs.readFileSync('input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let highest = Infinity;
let lowest = 0;
let rightest = 0;
let leftest = Infinity;

const pointsToAdd = [];

lines.forEach(line => {
  const points = line.split(' -> ');
  for(let i = 1; i < points.length; i++) {
    const [fromX, fromY] = points[i-1].split(',');
    const [toX, toY] = points[i].split(',');
    highest = Math.min(fromY, toY, highest);
    lowest = Math.max(fromY, toY, lowest);
    rightest = Math.max(fromX, toX, rightest);
    leftest = Math.min(fromX, toX, leftest);

    if (fromX == toX) {
      for(let j = Math.min(fromY, toY); j <= Math.max(fromY, toY); j++) {
        pointsToAdd.push({x: parseInt(fromX), y: j});
      }
    } else {
      for(let j = Math.min(fromX, toX); j <= Math.max(fromX, toX); j++) {
        pointsToAdd.push({x: j, y: parseInt(fromY)});
      }
    }
  }
});

let cave = [];
for(let i = 0; i <= lowest; i++) {
  let row = [];
  for (let j = 0; j <= rightest - leftest; j++) {
    row.push('.');
  }
  cave.push(row);
}

pointsToAdd.forEach(({x, y}) => {
  cave[y][x-leftest] = '#';
});

let count = 0;
let overflowed = false;

while(!overflowed) {
  let x = 500-leftest;
  let y = 0;
  let foundRest = false;
  while (!foundRest) {
    if (cave[y+1][x] == '.') {
      y++;
    } else if (x-1 < 0) {
      foundRest = true;
      overflowed = true;
    } else if (cave[y+1][x-1] == '.') {
      y++;
      x--;
    } else if (cave[y+1][x+1] == '.') {
      y++;
      x++;
    } else {
      cave[y][x] = 'O';
      foundRest = true;
    }
  }
  count++;
}

console.log(count-1);