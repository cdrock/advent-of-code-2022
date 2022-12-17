const fs = require('fs');

const data = fs.readFileSync('input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let signals = [];
let sigs = [];
lines.forEach(line => {
  if (line != '') {
    signals.push(line);
  }
});

signals.forEach((signal) => {
  let listQueue = [];
  let str = '';

  signal.split('').forEach((char) => {
    if (char == '[') {
      listQueue.push([]);
    } else if (char == ']') {
      if (str.length) {
        listQueue[listQueue.length-1].push(parseInt(str));
        str = '';
      }

      const last = listQueue.pop();

      if (listQueue.length) {
        listQueue[listQueue.length-1].push(last);
      } else {
        sigs.push(last);
      }
    } else if (char == ',') {
      if (str.length) {
        listQueue[listQueue.length-1].push(parseInt(str));
        str = '';
      }
    } else {
      str += char;
    }
  });
});

function compareLists(list1, list2) {
  if (!Array.isArray(list1) && !Array.isArray(list2)) {
    if (list1 > list2) {
      return 1;
    }
    
    if (list2 > list1) {
      return -1;
    }

    return null;
  } else {
    if (!Array.isArray(list1)) {
      list1 = [list1];
    }

    if (!Array.isArray(list2)) {
      list2 = [list2];
    }

    for (let i = 0; i < Math.min(list1.length, list2.length); i++) {
      let result = compareLists(list1[i], list2[i]);
      if (result != null) return result;
    }

    if (list1.length < list2.length) return -1;
    else if (list1.length > list2.length) return 1;
    return null;
  }
}

const d1 = [[2]];
const d2 = [[6]];
sigs.push(d1);
sigs.push(d2);
sigs.sort(compareLists);

console.log((sigs.indexOf(d1) + 1) * (sigs.indexOf(d2) + 1));