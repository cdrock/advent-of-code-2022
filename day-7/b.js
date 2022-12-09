const fs = require('fs');

const data = fs.readFileSync('input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

const files = {
  '/': 0
}

let currentDir = '';

lines.forEach(line => {
  const [a, b, c] = line.split(' ');

  if (a === '$') {
    if (b === 'cd') {
      if (c === '..') {
        currentDir = currentDir.substring(0, currentDir.lastIndexOf('/'));
      } else {
        currentDir = `${currentDir}/${c}`;
      }
    }
  } else if (a === 'dir') {
    const name = `${currentDir}/${b}`;
    files[name] = 0;
  } else {
    Object.keys(files).forEach((dir) => {
      if (currentDir.startsWith(dir)) {
        files[dir] += parseInt(a);
      }
    })
  }
});

const TOTAL_ALLOWED = 40000000;
const total = files['/'];
const toDelete = total - TOTAL_ALLOWED;
let deleting = total;

Object.values(files).forEach((size) => {
  if (size >= toDelete) {
    deleting = Math.min(deleting, size);
  }
});

console.log(deleting);