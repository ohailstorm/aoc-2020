const fs = require("fs");
const day1input = fs.readFileSync("./input/day1.input").toString();

const day1part1 = (input) => {
  const inputArray = input.includes("\n")
    ? input.split("\n")
    : input.split(",");

  const product = inputArray.reduce((accumulator, currentNumberString) => {
    const currentNumber = parseInt(currentNumberString);
    const otherNumberArray = inputArray.filter(
      (num) => currentNumber + parseInt(num) === 2020
    )[0];
    if (accumulator === null && otherNumberArray && currentNumber) {
      accumulator = otherNumberArray * currentNumber;
    }
    return accumulator;
  }, null);
  return product;
};

const day1part2 = (input) => {
  const inputArray = input.includes("\n")
    ? input.split("\n")
    : input.split(",");

  const product = inputArray.reduce((accumulator, currentNumberString) => {
    const num1 = parseInt(currentNumberString);
    inputArray.map((num2String) => {
      const num2 = parseInt(num2String);
      const num3 = parseInt(
        inputArray.filter((num) => num1 + num2 + parseInt(num) === 2020)[0]
      );

      if (accumulator === null && num3 && num1) {
        accumulator = num3 * num2 * num1;
      }
    });
    return accumulator;
  }, null);
  return product;
};

console.log("RES part 1:", day1part1(day1input));
console.log("RES part 2:", day1part2(day1input));
