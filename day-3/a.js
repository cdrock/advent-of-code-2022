const fs = require('fs');

const data = fs.readFileSync('input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let sum = 0;

lines.forEach(line => {
  const r1 = line.substring(0, line.length / 2);
  const r2 = line.substring(line.length / 2);

  const a = r1.split('');

  for(let i = 0; i < a.length; i++) {
    const char = r1[i];

    if(r2.includes(char)) {
      sum += char.charCodeAt(0);

      if (char === char.toUpperCase()) {
        sum -= 38;
      } else {
        sum -= 96;
      }

      break;
    }
  }
});

console.log(sum);