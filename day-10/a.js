const fs = require('fs');

const data = fs.readFileSync('input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let sum = 0;
let x = 1;
let cycle = 0

function incCycle() {
  cycle++;

  if((cycle + 20) % 40 == 0) {
    console.log({cycle, x});
    sum += cycle * x;
  }
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

console.log(sum);