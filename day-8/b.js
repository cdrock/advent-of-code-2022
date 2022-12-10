const fs = require('fs');

const data = fs.readFileSync('input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

const trees = []
let answer = 0;

lines.forEach(line => {
  const nums = line.split('');
  nums.map(x => parseInt(x));
  trees.push(nums);
});

for (let i = 0; i < trees.length; i++) {  
  for (let j = 0; j < trees[0].length; j++) {
    const n = trees[i][j];

    // Check Left
    let leftNum = 0;
    for (let k = j-1; k >= 0; k--) {
      const m = trees[i][k];
      leftNum++;

      if (m >= n) {
        break;
      }
    }

    // Check Right
    let rightNum = 0;
    for (let k = j+1; k < trees[0].length; k++) {
      const m = trees[i][k];
      rightNum++;

      if (m >= n) {
        break;
      }
    }

    // Check Top
    let topNum = 0;
    for (let k = i-1; k >= 0; k--) {
      const m = trees[k][j];
      topNum++;

      if (m >= n) {
        break;
      }
    }

    // Check Bottom
    let bottomNum = 0;
    for (let k = i+1; k < trees.length; k++) {
      const m = trees[k][j];
      bottomNum++;

      if (m >= n) {
        break;
      }
    }

    const num = leftNum * rightNum * topNum * bottomNum;
    // console.log({leftNum, rightNum, topNum, bottomNum});
    answer = Math.max(answer, num);
  }
}

console.log(answer);