const fs = require('fs');

const data = fs.readFileSync('input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

const positions = [];

const knots = [];
for (let i = 0; i < 10; i++) {
  knots.push({ x: 0, y: 0 });
}

function checkForPosition() {
  const tail = knots[knots.length-1];
  if (!positions.some(({x, y}) => x === tail.x && y === tail.y)) {
    positions.push({ x: tail.x, y: tail.y });
  }
}

lines.forEach(line => {
  [a, b] = line.split(' ');

  for (let i = 0; i < b; i++) {
    if (a == 'R') {
      knots[0].x++;
    } else if (a == 'L') {
      knots[0].x--;
    } else if (a == 'U') {
      knots[0].y++;
    } else {
      knots[0].y--;
    }  

    for (let j = 0; j < knots.length-1; j++) {
      const head = knots[j];
      const tail = knots[j+1];

      if (head.x - tail.x > 1) {
        tail.x = head.x - 1;
        tail.y = head.y;
      } else if (tail.x - head.x > 1) {
        tail.x = head.x + 1;
        tail.y = head.y;
      } else if (head.y - tail.y > 1) {
        tail.x = head.x;
        tail.y = head.y - 1;
      } else if (tail.y - head.y > 1) {
        tail.x = head.x;
        tail.y = head.y + 1;
      }  
    }
    
    checkForPosition();
  }
});

// console.log(positions);
console.log(positions.length);