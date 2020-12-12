const fs = require("fs");
const realInput = fs.readFileSync("./input/day11.input").toString();

const testInput = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;

function day11part1(input) {
  const seating = input.split("\n").map((row) => row.split(""));
  let i = false;
  let count=0;
  while (!i) {
    const results = [...seating.map((v) => [...v])];

    for (let rowIndex = 0; rowIndex < seating.length; rowIndex++) {
      const row = results[rowIndex];
      const nextRow = results[rowIndex + 1];
      const prevRow = results[rowIndex - 1];
      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const seat = row[colIndex];
        const occupiedCount = [
          //same row
          row[colIndex + 1] === "#",
          row[colIndex - 1] === "#",
          //next row
          nextRow ? nextRow[colIndex] === "#" : false,
          nextRow ? nextRow[colIndex + 1] === "#" : false,
          nextRow ? nextRow[colIndex - 1] === "#" : false,
          //row before
          prevRow ? prevRow[colIndex] === "#" : false,
          prevRow ? prevRow[colIndex + 1] === "#" : false,
          prevRow ? prevRow[colIndex - 1] === "#" : false,
        ];
        if (seat === "L") {
          if (occupiedCount.filter((v) => !!v).length === 0) {
            seating[rowIndex][colIndex] = "#";
          }
        } else if (seat === "#") {
          if (occupiedCount.filter((v) => !!v).length >= 4) {
            seating[rowIndex][colIndex] = "L";
          }
        }
      }
    }
    i=results.toString() === seating.toString();
    count++
  }

 return seating.reduce((a,row)=> a+row.filter(letter=> letter ==="#").length, 0);
}

const getVisibleSeat = (seating, rowIndex, colIndex, yStep, xStep) => {
    const row= seating[rowIndex+yStep];
    if(!row) return false;
    const col = row[colIndex+xStep];
    if(col===".") return getVisibleSeat(seating, rowIndex+yStep, colIndex+xStep, yStep, xStep)
    return col === "#"
}

function day11part2(input) {
  const seating = input.split("\n").map((row) => row.split(""));
  let i = false;
  let count=0;
  while (!i) {
    const results = [...seating.map((v) => [...v])];

    for (let rowIndex = 0; rowIndex < seating.length; rowIndex++) {
      const row = results[rowIndex];
      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const seat = row[colIndex];
        const occupiedCount = [
          //same row
          getVisibleSeat(results,rowIndex, colIndex,0,1),
          getVisibleSeat(results,rowIndex, colIndex,0,-1),
          //next row
          getVisibleSeat(results,rowIndex, colIndex,1,0),
          getVisibleSeat(results,rowIndex, colIndex,1,1),
          getVisibleSeat(results,rowIndex, colIndex,1,-1),
          //row before
          getVisibleSeat(results,rowIndex, colIndex,-1,0),
          getVisibleSeat(results,rowIndex, colIndex,-1,1),
          getVisibleSeat(results,rowIndex, colIndex,-1,-1),
        ];
        if (seat === "L") {
          if (occupiedCount.filter((v) => !!v).length === 0) {
            seating[rowIndex][colIndex] = "#";
          }
        } else if (seat === "#") {
          if (occupiedCount.filter((v) => !!v).length >= 5) {
            seating[rowIndex][colIndex] = "L";
          }
        }
      }
    }
    i=results.toString() === seating.toString();
    count++
  }

 return seating.reduce((a,row)=> a+row.filter(letter=> letter ==="#").length, 0);
}
console.log("DAY 11 PART 1 TEST: ",day11part1(testInput));
console.log("DAY 11 PART 1 REAL: ",day11part1(realInput));
console.log("DAY 11 PART 2 TEST: ",day11part2(testInput))
console.log("DAY 11 PART 2 REAL: ",day11part2(realInput))