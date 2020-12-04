const fs = require("fs");
const input = fs.readFileSync("./input/day2.input").toString();

const inputArray = input.includes("\n") ? input.split("\n") : input.split(",");

const applyPolicies1 = (input) => {
  const [conditions, pw] = input.split(":");
  const letter = conditions.slice(-1);
  const [gte, lte] = conditions.split("-");
  const charArray = pw.split("");
  return (
    charArray.filter((char) => char === letter).length >= parseInt(gte) &&
    charArray.filter((char) => char === letter).length <= parseInt(lte)
  );
};

const applyPolicies2 = (input) => {
  const [conditions, pw] = input.split(":");
  const letter = conditions.slice(-1);
  const [firstIndex, secondIndex] = conditions.split("-");
  const charArray = pw.split("");
  const hasFirst = pw.charAt(parseInt(firstIndex)) === letter;
  const hasSecond = pw.charAt(parseInt(secondIndex)) === letter;
  return hasFirst ? !hasSecond : hasSecond;
};
const day2part1 = () => {
  const validInputs = inputArray.filter((input) => applyPolicies1(input));
  console.log(validInputs.length);
};

const day2part2 = () => {
  const validInputs = inputArray.filter((input) => applyPolicies2(input));
  console.log(validInputs.length);
};

day2part1();
day2part2();
