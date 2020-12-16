const realInput = [5, 2, 8, 16, 18, 0, 1];

const testinput1 = [0, 3, 6];
const testinput2 = [1, 3, 2];
const testinput3 = [2, 1, 3];
const testinput4 = [1, 2, 3];
const testinput5 = [2, 3, 1];
const testinput6 = [3, 2, 1];
const testinput7 = [3, 1, 2];

function day15(input, numberToSpeak = 2020) {
  const lastSpoken = input
    .slice(0, input.length - 1)
    .reduce((a, b, index) => ({ ...a, [b]: index + 1 }), {});
  for (let index = input.length - 1; index < numberToSpeak - 1; index++) {
    // console.log(index, "---", lastSpoken, input, index);
    if (!lastSpoken[input[index]]) {
      // console.log(input[index] + " was spoken not before", index);
      input.push(0);
    } else {
      // console.log(input[index] + " was spoken before", index, lastSpoken[input[index]]);
      input.push(index + 1 - lastSpoken[input[index]]);
    }
    lastSpoken[input[index]] = index + 1;
    // console.log(index);
    // console.log(input[index-1]);
  }
  return input.pop();
}

console.log("DAY 15 PART 1 TEST 1", day15(testinput1));
console.log("DAY 15 PART 1 TEST 2", day15(testinput2));
console.log("DAY 15 PART 1 TEST 3", day15(testinput3));
console.log("DAY 15 PART 1 TEST 4", day15(testinput4));
console.log("DAY 15 PART 1 TEST 5", day15(testinput5));
console.log("DAY 15 PART 1 TEST 6", day15(testinput6));
console.log("DAY 15 PART 1 TEST 7", day15(testinput7));

console.log("DAY 15 PART 1 REAL", day15(realInput));

console.log("DAY 15 PART 2 REAL", day15(realInput, 30000000));

console.log("DAY 15 PART 2 TEST 1", day15(testinput1, 30000000));
console.log("DAY 15 PART 2 TEST 2", day15(testinput2, 30000000));
console.log("DAY 15 PART 2 TEST 3", day15(testinput3, 30000000));
console.log("DAY 15 PART 2 TEST 4", day15(testinput4, 30000000));
console.log("DAY 15 PART 2 TEST 5", day15(testinput5, 30000000));
console.log("DAY 15 PART 2 TEST 6", day15(testinput6, 30000000));
console.log("DAY 15 PART 2 TEST 7", day15(testinput7, 30000000));