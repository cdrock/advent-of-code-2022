const fs = require('fs');

const data = fs.readFileSync('input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

const hasNoDupes = function(a) {
  return (a.length === new Set(a).size);
}

const DISTINCT = 4;

lines.forEach(line => {
  const a = line.split('');

  for(let i = 0; i < line.length - DISTINCT + 1; i++) {
    const splicey = a.slice(i, i+DISTINCT);
    if (hasNoDupes(splicey)) {
      console.log(i+DISTINCT);
      break;
    }
  }
});