const fs = require('fs');

const data = fs.readFileSync('input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let sum = 0;
let monkeys = [];

lines.forEach(line => {
  const [a, b, c, d, e, f] = line.trim().split(' ');

  if (a == 'Monkey') {
    monkeys.push({ count: 0 });
  } else if (a == 'Starting') {
    const items = line.split(':')[1];
    const itemsA = items.split(',').map((x) => BigInt(x.trim()));
    monkeys[monkeys.length-1].items = itemsA;
  } else if (a == 'Operation:') {
    monkeys[monkeys.length-1].operation = {
      operator: e,
      number: f,
    };
  } else if (a == 'Test:') {
    monkeys[monkeys.length-1].testDivisor = BigInt(d);
  } else if (b == 'true:') {
    monkeys[monkeys.length-1].trueMonkey = BigInt(f);
  } else if (b == 'false:') {
    monkeys[monkeys.length-1].falseMonkey = BigInt(f);
  }
});

const lcm = 9699690

const rounds = 10000;
for (let i = 0; i < rounds; i++) {
  for (let j = 0; j < monkeys.length; j++) {
    const monkey = monkeys[j];

    for (let k = 0; k < monkey.items.length; k++) {
      let item = monkey.items[k];

      const multiplier = monkey.operation.number == 'old' ? item : BigInt(monkey.operation.number);
      if (monkey.operation.operator == '+') {
        item += multiplier;
      } else {
        item *= multiplier;
      }

      const newMonkey = item % monkey.testDivisor == 0 ? monkey.trueMonkey : monkey.falseMonkey;
      item = item % BigInt(lcm);
      monkeys[newMonkey].items.push(item);
      
      monkey.count++;
    }

    monkey.items = [];
  }
}

const counts = monkeys.map((x) => x.count).sort((a, b) => b - a);
console.log(counts[0] * counts[1]);