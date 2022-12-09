const fs = require('fs');

const data = fs.readFileSync('input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let sum = 0;
let lineA = [];

lines.forEach(line => {
  lineA.push(line);

  if (lineA.length === 3) {
    const [r1, r2, r3] = lineA;
    const a = r1.split('');

    for(let i = 0; i < a.length; i++) {
      const char = r1[i];a
  
      if(r2.includes(char) && r3.includes(char)) {
        sum += char.charCodeAt(0);
  
        if (char === char.toUpperCase()) {
          sum -= 38;
        } else {
          sum -= 96;
        }
  
        break;
      }
    }

    lineA = [];
  }
});

console.log(sum);