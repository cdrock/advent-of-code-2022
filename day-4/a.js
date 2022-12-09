const fs = require('fs');

const data = fs.readFileSync('input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let sum = 0;

lines.forEach(line => {
  const [elf1, elf2] = line.split(',');
  let [min1, max1] = elf1.split('-');
  let [min2, max2] = elf2.split('-');
  min1 = parseInt(min1);
  max1 = parseInt(max1);
  min2 = parseInt(min2);
  max2 = parseInt(max2);

  if (min1 <= min2 && max1 >= max2 || min2 <= min1 && max2 >= max1) {
    sum++;
  }
});

console.log(sum);