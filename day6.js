const fs = require("fs");
const input = fs.readFileSync("./input/day6.input").toString();

const testInput = `abc

a
b
c

ab
ac

a
a
a
a

b`;

function day6part1(input) {
  const inputArray = input.split("\n\n");
  return inputArray
    .map((answers) => {
      const answerArray = answers.split("\n").join("").split("");
      return [...new Set(answerArray)].length;
    })
    .reduce((a, b) => a + b, 0);
}

function day6part2(input) {
  const inputArray = input.split("\n\n");
  return inputArray.map((answers) => {
    const answerArray = answers.split("\n");
    const v = answerArray.reduce((acc, answer) => {
      answer
        .trim()
        .split("")
        .map((letter) => {
          acc[letter] = (parseInt(acc[letter]) || 0) + 1;
          return letter;
        });
      return acc;
		}, {})
		return Object.values(v).filter(value=> value === answerArray.length)
  })
  .reduce((a,b) => a+b.length, 0)
}

console.log('TEST Day 6 part 1:', day6part1(testInput))
console.log('RES Day 6 part 1:', day6part1(input))
console.log("TEST Day 6 part 2:", day6part2(testInput));
console.log("TEST Day 6 part 2:", day6part2(input));
