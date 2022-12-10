const fs = require('fs');

const data = fs.readFileSync('input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

const trees = []
let sum = 0;

lines.forEach(line => {
  const nums = line.split('');
  nums.map(x => parseInt(x));
  trees.push(nums);
});
// console.log(trees);

for (let i = 0; i < trees.length; i++) {  
  for (let j = 0; j < trees[0].length; j++) {
    const n = trees[i][j];

    // Check Left
    let isLeftVisible = true;
    for (let k = 0; k < j; k++) {
      const m = trees[i][k];
      if (m >= n) {
        isLeftVisible = false;
        break;
      }
    }

    // Check right
    let isRightVisible = true;
    for (let k = trees[0].length-1; k > j; k--) {
      const m = trees[i][k];
      if (m >= n) {
        isRightVisible = false;
        break;
      }
    }

    // Check top
    let isTopVisible = true;
    for (let k = 0; k < i; k++) {
      const m = trees[k][j];
      if (m >= n) {
        isTopVisible = false;
        break;
      }
    }

    // Check bottom
    let isBottomVisible = true;
    for (let k = trees.length-1; k > i; k--) {
      const m = trees[k][j];
      if (m >= n) {
        isBottomVisible = false;
        break;
      }
    }

    if (isLeftVisible || isRightVisible || isTopVisible || isBottomVisible) {
      sum++;
    }
  }
}

console.log(sum);