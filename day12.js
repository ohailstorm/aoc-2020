const fs = require("fs");
const realInput = fs.readFileSync("./input/day12.input").toString();

const testInput = `F10
N3
F7
R90
F11`;

function getNextDirection(currentDir, turn, degrees) {
  const turnLeftArrays = {
    N: ["W", "S", "E"],
    S: ["E", "N", "W"],
    E: ["N", "W", "S"],
    W: ["S", "E", "N"],
  };

  const returnArray =
    turn === "L"
      ? turnLeftArrays[currentDir]
      : turnLeftArrays[currentDir].reverse();
  return returnArray[degrees/360*4-1];
}
function day12part1(input) {
  const instructions = input.split("\n");
  const dir = { N: 0, S: 0, E: 0, W: 0 };
  let currentDirection = "E";
  for (let index = 0; index < instructions.length; index++) {
    const element = instructions[index];
    const direction = element.substring(0, 1);
    const value = parseInt(element.substring(1));
    switch (direction) {
      case "N":
      case "S":
      case "E":
      case "W":
        dir[direction] = dir[direction] + value;
        break;
      case "L":
      case "R":
				currentDirection = getNextDirection(currentDirection, direction, value);
        break;
      case "F":
        dir[currentDirection] = dir[currentDirection] + value;
        break;
      default:
        break;
    }
  }
	const returnObj= { ...dir, ew: dir["E"] - dir["W"], ns: dir["N"] - dir["S"] };
	return {...returnObj, res: Math.abs(returnObj.ew) + Math.abs(returnObj.ns)}
}

function day12part1(input) {
  const instructions = input.split("\n");
  const dir = { N: 0, S: 0, E: 0, W: 0 };
  let currentDirection = "E";
  for (let index = 0; index < instructions.length; index++) {
    const element = instructions[index];
    const direction = element.substring(0, 1);
    const value = parseInt(element.substring(1));
    switch (direction) {
      case "N":
      case "S":
      case "E":
      case "W":
        dir[direction] = dir[direction] + value;
        break;
      case "L":
      case "R":
				currentDirection = getNextDirection(currentDirection, direction, value);
        break;
      case "F":
        dir[currentDirection] = dir[currentDirection] + value;
        break;
      default:
        break;
    }
  }
	const returnObj= { ...dir, ew: dir["E"] - dir["W"], ns: dir["N"] - dir["S"] };
	return {...returnObj, res: Math.abs(returnObj.ew) + Math.abs(returnObj.ns)}
}

function day12part2(input) {
  const instructions = input.split("\n");
	const dir = { N: 0, S: 0, E: 0, W: 0 };
	let waypoint = {N: 1, S: 0, E: 10, W: 0};
  
  for (let index = 0; index < instructions.length; index++) {
    const element = instructions[index];
    const direction = element.substring(0, 1);
    const value = parseInt(element.substring(1));
    switch (direction) {
      case "N":
      case "S":
      case "E":
      case "W":
        waypoint[direction] = waypoint[direction] + value;
        break;
      case "L":
      case "R":
				waypoint = {
					[getNextDirection("E", direction, value)]: waypoint["E"],
					[getNextDirection("W", direction, value)]: waypoint["W"],
					[getNextDirection("N", direction, value)]: waypoint["N"],
					[getNextDirection("S", direction, value)]: waypoint["S"]
				};
        break;
      case "F":
				for (let index = 0; index < value; index++) {				
						dir["E"]= dir["E"] + waypoint["E"],
						 dir["W"]= dir["W"] + waypoint["W"],
						 dir["N"]= dir["N"] + waypoint["N"],
						 dir["S"]= dir["S"] + waypoint["S"]
				}
        break;
      default:
        break;
		}
  }
	const returnObj= { ...dir, ew: dir["E"] - dir["W"], ns: dir["N"] - dir["S"] };
	return {...returnObj, res: Math.abs(returnObj.ew) + Math.abs(returnObj.ns)}
}

console.log("Day 12 Part 1 TEST:", day12part1(testInput));
console.log("Day 12 Part 1 REAL:", day12part1(realInput));

console.log("Day 12 Part 2 TEST:", day12part2(testInput));
console.log("Day 12 Part 2 REAL:", day12part2(realInput));
