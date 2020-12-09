const fs = require("fs");
const realInput = fs.readFileSync("./input/day9.input").toString();

const testInput = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`;

function findNumberRangeForInvalid(number, numbers) {
  for (let index = 0; index < numbers.length - 1; index++) {
    const element1 = numbers[index];
    let sum = element1;

    for (
      let itemsToSum = index + 1;
      itemsToSum < numbers.length;
      itemsToSum++
    ) {
      const element2 = numbers[itemsToSum];
      sum = sum + element2;
      if (sum > number) {
        break;
      }
      if (sum === number) {
        return numbers.slice(index, itemsToSum);
      }
    }
  }
  return [];
}
function checkValidNumber(number, array) {
  let validSum;
  for (let index = 0; index < array.length; index++) {
    const element1 = array[index];
    for (let index = 0; index < array.length; index++) {
      const element2 = array[index];
      const sum = element1 + element2;
      if (!array.includes(sum) && element2 !== element1 && sum === number) {
        validSum = sum;
      }
    }
  }
  return [!!validSum];
}
function day9part1(input, step = 25) {
  const numbers = input.split("\n").map((v) => parseInt(v, 10));
  for (let index = 0; index + step < numbers.length; index++) {
    const number = numbers[index + step];
    const [isValid, sum] = checkValidNumber(
      number,
      [...numbers].slice(index, index + step)
    );
    if (!isValid) {
      return number;
    }
  }
}

function day9part2(input, step = 25) {
  const numbers = input.split("\n").map((v) => parseInt(v, 10));
  for (let index = 0; index + step < numbers.length; index++) {
    const number = numbers[index + step];
    const [isValid, sum] = checkValidNumber(
      number,
      [...numbers].slice(index, index + step)
    );
    if (!isValid) {
      const numberArray = findNumberRangeForInvalid(
        number,
        numbers.filter((n) => n !== number)
      );
      return Math.max(...numberArray) + Math.min(...numberArray);
    }
  }
}

console.log("DAY 9 PART 1 TEST:", day9part1(testInput, 5));
console.log("DAY 9 PART 1 REAL:", day9part1(realInput));

console.log("DAY 9 PART 2 TEST:", day9part2(testInput, 5));
console.log("DAY 9 PART 2 REAL:", day9part2(realInput));
