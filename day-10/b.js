const fs = require('fs');

const data = fs.readFileSync('input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let x = 1;
let cycle = 0

function setCharAt(str,index,chr) {
  if(index > str.length-1) return str;
  return str.substring(0,index) + chr + str.substring(index+1);
}

const monitor = [];
for (let i = 0; i < 6; i++) {
  let str = '';
  for (let j = 0; j < 40; j++) {
    str += '.';
  }
  monitor.push(str);
}

function incCycle() {
  const position = cycle % 40;
  const row = Math.floor(cycle / 40);

  if(Math.abs(x - position) <= 1) {
    monitor[row] = setCharAt(monitor[row], position, '#');
  }
  cycle++;
}

lines.forEach(line => {
  const [a, b] = line.split(' ');

  if (a == 'addx') {
    incCycle();
    incCycle();
    x += parseInt(b);
  } else {
    incCycle();
  }
});

console.log(monitor);