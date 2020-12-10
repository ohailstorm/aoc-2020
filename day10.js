const fs = require("fs");
const realInput = fs.readFileSync("./input/day10.input").toString();

const testInput = `16
10
15
5
1
11
7
19
6
12
4`;

const testInput2 = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`;

function day10part1(input) {
  const joltArray = input.split("\n").map((row) => parseInt(row, 10));
  const results = joltArray
    .sort((a, b) => a - b)
    .reduce(
      (acc, joltage) => {
        if (acc.usedAdapters.includes(joltage)) {
          return acc;
        }
        const possibleNextAdapters = joltArray.filter(
          (v) =>
            v - joltage > 0 && v - joltage <= 3 && !acc.usedAdapters.includes(v)
        );
        const nextAdapter = Math.min(...possibleNextAdapters);
        if (nextAdapter - joltage === 1) acc.oneDiff++;
        if (nextAdapter - joltage === 3) acc.threeDiff++;
        // acc.usedAdapters.push(nextAdapter)
        return acc;
      },
      { oneDiff: 1, threeDiff: 1, usedAdapters: [] }
    );
  return results.oneDiff * results.threeDiff;
}

function part2RecSlow(adapter, rest, endValue, acc = 0, result) {
  const copy = [...rest];
  if (adapter === endValue) {
    return acc + 1;
  }

  if (rest.length === 0) {
    return acc;
  }

  return (
    acc +
    (copy[0] - adapter === 1
      ? part2RecSlow(copy.shift(), copy, endValue, acc)
      : 0) +
    (copy[0] - adapter === 2
      ? part2RecSlow(copy.shift(), copy, endValue, acc)
      : 0) +
    (copy[0] - adapter === 3 ? part2RecSlow(copy.shift(), copy, endValue, acc) : 0)
  );
}

function day10part2(input) {
  const joltArray = input.split("\n").map((row) => parseInt(row, 10));
  joltArray.push(0);
  joltArray.push(Math.max(...joltArray) + 3);
  const [adapter, ...rest] = joltArray.sort((a, b) => a - b);
  const sortedArray = joltArray.sort((a, b) => a - b);
  const numberOfWaysForward = sortedArray
    .map((adapter) => {
      const possibleNextAdapters = sortedArray.filter(
        (v) => v - adapter > 0 && v - adapter <= 3
      );
      return possibleNextAdapters.length || 1;
    }).reverse()
   

  const combos = new Array(numberOfWaysForward.length).fill(0);
  for (let index = 0; index < numberOfWaysForward.length; index++) {
    const element = numberOfWaysForward[index];
    if (index === 0 || index === 1) {
      combos[index] = numberOfWaysForward[index];
    }

    if (element === 3) {
      combos[index+1] = combos[index - 2] + combos[index - 1] + combos[index]
    }
    if (element === 2) {
      combos[index+1] = combos[index - 1] + combos[index];
    }
    if (element === 1) {
      combos[index+1] = combos[index];
    }

  }
  return Math.max(...combos);
}

console.log("Day 10 Part 1 TEST:",day10part1(testInput));
console.log("Day 10 Part 1 TEST:",day10part1(testInput2));
console.log("Day 10 Part 1 REAL:",day10part1(realInput));

console.log("Day 10 Part 2 TEST:",day10part2(testInput));
console.log("Day 10 Part 2 TEST:",day10part2(testInput2));
console.log("Day 10 Part 2 REAL:",day10part2(realInput));
