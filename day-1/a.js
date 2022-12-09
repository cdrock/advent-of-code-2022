const fs = require('fs');

let highest = 0;
let sum = 0;

const data = fs.readFileSync('input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

lines.forEach(line => {
  if (line == "") {
    highest = Math.max(highest, sum);
    sum = 0;
  } else {
    sum += parseInt(line);
  }
});

console.log(highest);