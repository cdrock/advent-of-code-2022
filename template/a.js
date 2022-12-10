const fs = require('fs');

const data = fs.readFileSync('input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let sum = 0;
let x = 1;
let cycle = 0

function incCycle() {
  cycle++;
  console.log(cycle);

  if((cycle + 20) % 40 == 0) {
    console.log(x);
  }
}

lines.forEach(line => {
  console.log('wut');
  const [a, b] = line;
  console.log({a, b});

  if (a == 'addx') {
    incCycle();
    x += b;
    incCycle();
  } else {
    incCycle();
  }
});

console.log(sum);