const fs = require('fs');

const data = fs.readFileSync('input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let mountain = [];
let rowIndex = 0;
let start, end;

const HIGHEST = 26;

// Read input
lines.forEach(line => {
  const row = line.split('').map(x => ({ value: x.charCodeAt(0) - 96, visited: false, steps: Infinity }));
  const startIndex = line.indexOf("S");
  const endIndex = line.indexOf("E");
  if (startIndex >= 0) {
    row[startIndex].value = 1;
    start = {
      x: startIndex,
      y: rowIndex,
    };
  }
  if (endIndex >= 0) {
    row[endIndex].value = HIGHEST;
    end = {
      x: endIndex,
      y: rowIndex,
    };
  }

  mountain.push(row);
  rowIndex++;
});

// Do stuff
function findPath(position, steps) {
  const mountainValue = mountain[position.y][position.x];
  mountainValue.visited = true;
  mountainValue.steps = steps;
  // position.length = Math.min(steps, position.length);

  // console.log({position, start});
  if (position.x == start.x && position.y == start.y) {
    // shortestPath = Math.min(shortestPath, steps.length);
    console.log('finish', steps);
    return;
  } else {
    const adjacent = [
      { x: position.x + 1, y: position.y },
      { x: position.x - 1, y: position.y },
      { x: position.x, y: position.y + 1 },
      { x: position.x, y: position.y - 1 },
    ]

    const adjacentPositions = adjacent.filter(({ x, y }) => {
      return y >= 0 && y <= mountain.length - 1
        && x >= 0 && x <= mountain[0].length - 1
        && mountainValue.value >= mountain[y][x].value - 1
        && mountain[y][x].steps >= steps + 1;
    });

    console.log({adjacentPositions});
    // directions.sort((a, b) => a.value-b.value);
    adjacentPositions.forEach((d) => findPath(d, steps+1));
  }
}

findPath(end, 0);

console.log(mountain);
// console.log({start, end})
// console.log(mountain[start.y][start.x].length);
