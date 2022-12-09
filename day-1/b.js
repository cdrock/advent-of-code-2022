const fs = require('fs');

let highest = [0, 0, 0];
let sum = 0;

const data = fs.readFileSync('input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

lines.forEach(line => {
  if (line == "") {
    highest[0] = Math.max(highest[0], sum);
    highest.sort();
    sum = 0;
  } else {
    sum += parseInt(line);
  }
});

console.log(highest[0] + highest[1] + highest[2]);