const fs = require('fs');

const data = fs.readFileSync('input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

const boxes = [[], [], [], [], [], [], [], [], []];

lines.forEach(line => {
  const firstChar = line.charAt(0);

  if(firstChar === '[') {
    for(let i = 0; i < boxes.length; i++) {
      const char = line[i*4+1];
      if(char !== ' ') {
        boxes[i].unshift(char);
      }
    }
  } else if (firstChar === 'm') {
    let [,numToMove,,rowFrom,,rowTo] = line.split(' ');
    numToMove = parseInt(numToMove);
    rowFrom = parseInt(rowFrom);
    rowTo = parseInt(rowTo);

    for(let i = 0; i < numToMove; i++) {
      const char = boxes[rowFrom-1].pop();
      boxes[rowTo-1].push(char);
    }
  }
});

let str = '';
for(let i = 0; i < boxes.length; i++) {
  str += boxes[i][boxes[i].length - 1];
}
console.log(str);