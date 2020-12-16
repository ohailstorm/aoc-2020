const fs = require("fs");
const realInput = fs.readFileSync("./input/day14.input").toString();

const testInput = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`;

const testInput2 = `mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`;

function day14part1(input) {
  return Object.values(
    input.split("mask = ").reduce((acc, inputArray, i) => {
      const [mask, ...rest] = inputArray.split("\n");
      const result = rest
        .filter((v) => !!v)
        .map((v) => v.split(" = "))
        .reduce((acc, v) => {
          return {
            ...acc,
            [v[0]]: [...mask]
              .reverse()
              .map((bit, index) =>
                bit === "X"
                  ? [...parseInt(v[1]).toString(2)].reverse()[index] || 0
                  : bit
              )
              .reverse()
              .join(""),
          };
        }, {});
      return { ...acc, ...result };
    }, {})
  ).reduce((a, b) => a + parseInt(b, 2), 0);
}

function day14part2(input) {
  const res = input.split("mask = ").reduce((acc, inputArray, i) => {
    const [mask, ...rest] = inputArray.split("\n");
    const result = rest
      .filter((v) => !!v)
      .map((v) => v.split("["))
      .reduce((acc, v) => {
        return {
          ...acc,
          [[...mask]
            .reverse()
            .map((bit, index) =>
              bit === "0"
                ? [...parseInt(v[1]).toString(2)].reverse()[index] || 0
                : bit
            )
            .reverse()
            .join("")]: parseInt(v[1].split("=")[1]),
        };
      }, {});

    return { ...acc, ...result };
  }, {});

  const res2 = Object.keys(res).reduce((acc, key) => {
    let oneArray = [""];
    for (let index = 0; index < key.length; index++) {
      if (key[index] === "X") {
        oneArray = [
          ...oneArray.map((v) => v + "0"),
          ...oneArray.map((v) => v + "1"),
        ];
      } else {
        oneArray = oneArray.map((v) => v + key[index]);
      }
    }

    return {
      ...acc,
      ...oneArray
        .filter((v) => v.length === key.length)
        .reduce((a, b) => ({ ...a, [b]: res[key] }), {}),
    };
  }, {});
  
  return Object.values(res2).reduce((a, b) => a + b, 0);
}


console.log("DAY 14 PART 1 TEST:", day14part1(testInput));
console.log("DAY 14 PART 1 REAL:", day14part1(realInput));

console.log("DAY 14 PART 2 TEST:", day14part2(testInput2));
console.log("DAY 14 PART 2 REAL:", day14part2(realInput));
