const fs = require("fs");
const input = fs.readFileSync("./input/day3.input").toString();

const inputArray = input.split("\n").map((row) => row.split(""));

const testInputMap = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`
  .split("\n")
  .map((row) => row.split(""));

function day3part1(input, xStep = 3, yStep = 1) {
  let x = 0;
  let numberOfTrees = 0;
  for (let y = yStep; y < input.length; y = y + yStep) {
    const row = input[y];
    x = x + xStep;
    const point = input[y][x % row.length];
    if (point === "#") {
      numberOfTrees++;
    }
  }
  return numberOfTrees;
}

function day3part2(input) {
  const results = [
    day3part1(input, 1, 1),
    day3part1(input, 3, 1),
    day3part1(input, 5, 1),
    day3part1(input, 7, 1),
    day3part1(input, 1, 2),
  ];
  return results.reduce((acc, result) => acc * result, 1);
}

console.log("day3 part 1 example input", day3part1(testInputMap));
console.log("day3 part 1 result", day3part1(inputArray));

console.log("day3 part 2 example input", day3part2(testInputMap));
console.log("day3 part 2 result", day3part2(inputArray));
