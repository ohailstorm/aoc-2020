const fs = require("fs");
const input = fs.readFileSync("./input/day5.input").toString();
const testInput = `BFFFBBFRRR
FFFBBBFRRR
BBFFBBFRLL`;

function day5part1(input) {
  const inputArray = input.split("\n");

  return inputArray.map((boardingPass) => {
    let row, col, id;
    const rows = boardingPass.substring(0, 7).split("");
    const cols = boardingPass.substring(7).split("");
    for (
      let upperLimit = 128, lowerLimit = 0, index = 0;
      index < rows.length;
      index++
    ) {
      const letter = rows[index];
      const nextRange = upperLimit - (upperLimit - lowerLimit) / 2;
      if (letter === "F") {
        upperLimit = nextRange;
      } else {
        lowerLimit = nextRange;
      }
      if (lowerLimit === upperLimit - 1) {
        row = lowerLimit;
      }
    }
    for (
      let upperLimit = 8, lowerLimit = 0, index = 0;
      index < rows.length;
      index++
    ) {
      const letter = cols[index];
      const nextRange = upperLimit - (upperLimit - lowerLimit) / 2;
      if (letter === "L") {
        upperLimit = nextRange;
      } else {
        lowerLimit = nextRange;
      }
      if (lowerLimit === upperLimit - 1) {
        col = lowerLimit;
      }
    }
    return {
      row,
      col,
      id: row * 8 + col,
    };
  });
}

console.log(
  "DAY 5 PART 1 TEST:",
  day5part1(testInput),
  "MAX:",
  Math.max(...day5part1(testInput).map((boardingPass) => boardingPass.id))
);

console.log(
  "DAY 5 PART 1 REAL:",
  Math.max(...day5part1(input).map((boardingPass) => boardingPass.id))
);

console.log(
  "PART 2:",
  day5part1(input)
    .map((bp) => bp.id)
    .sort((a, b) => a - b)
    .reduce((acc, id, index, array) => {
      if (array[index - 1]) {
        if (array[index] - array[index - 1] === 2) {
          acc = id - 1;
        }
      }
      return acc;
    }, null)
);
