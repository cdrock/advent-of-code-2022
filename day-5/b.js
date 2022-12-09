const fs = require('fs');

const data = fs.readFileSync('input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

const boxes = [[], [], [], [], [], [], [], [], []];

lines.forEach((line, i) => {
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

    const slicey = boxes[rowFrom-1].slice(boxes[rowFrom-1].length-numToMove);
    boxes[rowFrom-1].length = boxes[rowFrom-1].length-slicey.length;

    for(let i = 0; i < slicey.length; i++) {
      boxes[rowTo-1].push(slicey[i]);
    }
  }
});

let str = '';
for(let i = 0; i < boxes.length; i++) {
  str += boxes[i][boxes[i].length - 1];
}
console.log(str);
