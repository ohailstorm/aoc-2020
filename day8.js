const fs = require("fs");
const realInput = fs.readFileSync("./input/day8.input").toString();

const testInput = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;

function day8part1(input) {
  const instructions = input.split("\n");
  let acc = 0;
  const visited = {};
  for (let index = 0; index < instructions.length; index++) {
    const element = instructions[index];
    const [action, increment] = element.split(" ");
    if (visited[index]) {
      return "INFINITE LOOP " + acc;
    }
    visited[index] = true;
    switch (action) {
      case "acc":
        acc = acc + parseInt(increment);
        break;
      case "jmp":
        index = index + parseInt(increment) - 1;
        break;
      default:
        break;
    }
  }
  return acc;
}

function part2Rec(instructions, index, acc, visited, changedOne) {
  if (index < instructions.length) {
    const visitedCopy = { ...visited };
    const element = instructions[index];
    const [action, increment] = element.split(" ");
    if (visited[index]) {
      return "null";
    }
    visited[index] = true;
    switch (action) {
      case "acc":
        return part2Rec(
          instructions,
          index + 1,
          acc + parseInt(increment),
          visited,
          changedOne
        );
      case "jmp": {
        const newIndex = index + parseInt(increment) - 1;
        const maybeAcc = part2Rec(
          instructions,
          newIndex + 1,
          acc,
          visited,
          changedOne
        );
        if (typeof maybeAcc === "string" && !changedOne) {
          //do nothing, make this a "nop"
          return part2Rec(instructions, index + 1, acc, visited, true);
        }
        return maybeAcc;
      }
      case "nop": {
        const newIndex2 = index + parseInt(increment) - 1;
        const maybeAcc = part2Rec(
          instructions,
          index + 1,
          acc,
          visited,
          changedOne
        );
        if (typeof maybeAcc === "string" && !changedOne) {
          //do nothing, make this a "nop"
          changedOne = true;
          index = newIndex2;
          return part2Rec(instructions, newIndex2 + 1, acc, visited, true);
        }
        return maybeAcc;
      }
      default:
        break;
    }
  }
  return acc;
}

function day8part2(input) {
  const instructions = input.split("\n");
  return part2Rec(instructions, 0, 0, {}, false);
}

console.log("TEST day 8 part 1:", day8part1(testInput));
console.log("REAL day 8 part 1:", day8part1(realInput));

console.log("TEST day 8 part 2:", day8part2(testInput));
console.log("REAL day 8 part 2:", day8part2(realInput));
