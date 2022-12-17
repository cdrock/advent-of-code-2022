const fs = require('fs');

const data = fs.readFileSync('input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let sum = 0;

let signals = [];
let a = []
lines.forEach(line => {
  if (line == '') {
    signals.push(a);
    a = [];
  } else {
    a.push(line);
  }
});

signals.forEach((signals, i) => {
  let sigs = [];

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
        return false;
      }
      
      if (list2 > list1) {
        return true;
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

      if (list1.length < list2.length) return true;
      else if (list1.length > list2.length) return false;
      return null;
    }
  }

  const [s1, s2] = sigs;
  const inOrder = compareLists(s1, s2);
  if (inOrder) {
    sum += i + 1;
  }
});

console.log(sum);