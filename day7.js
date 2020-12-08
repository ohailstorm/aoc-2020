const fs = require("fs");
const realInput = fs.readFileSync("./input/day7.input").toString();

const testInput = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

const testInput2 = `shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`;

function containsRecursiveUpwards(searchValue, allRules, returnArray) {
  Object.keys(allRules)
    .filter((v) => v.trim() !== searchValue || v.trim() !== searchValue)
    .map((key) => {
      const rulesList = allRules[key].map((s) => s.trim());
      if (rulesList.includes(searchValue)) {
        containsRecursiveUpwards(key, allRules, returnArray);
        returnArray.push(key);
      }
    });
  return returnArray;
}

function containsRecursiveInwards(searchValue, allRules, count) {
  const ruleSet = allRules[searchValue];
  if (ruleSet) {
    const sum = ruleSet
      .filter((v) => v.label.trim() !== searchValue)
      .map((rule) => {
        if (!rule.number) {
          return 0;
        }
        const secontainsRecursiveInward = containsRecursiveInwards(
          rule.label.trim(),
          allRules,
          count
        );
        return (1 + secontainsRecursiveInward) * rule.number;
      });
    count = count + sum.reduce((a, b) => a + b, 0);
  }
  return count;
}

function day7part1(input, searchValue) {
  const rules = input.split("\n").map((row) =>
    row
      .split("contain")
      .join(",")
      .split(",")
      .map((s) =>
        !parseInt(s) ? s.split("bag")[0] : s.substring(3, s.indexOf("bag"))
      )
  );
  const allRules = rules.reduce((acc, rule) => {
    const outerMost = rule.shift().trim();

    return { ...acc, [outerMost]: [...(acc[outerMost] || []), ...rule] };
  }, {});
  return [...new Set(containsRecursiveUpwards(searchValue, allRules, []))]
    .length;
}

function day7part2(input, searchValue) {
  const rules = input.split("\n").map((row) =>
    row
      .split("contain")
      .join(",")
      .split(",")
      .map((s) =>
        !parseInt(s)
          ? {
              label: s.split("bag")[0],
            }
          : {
              label: s.substring(3, s.indexOf("bag")),
              number: parseInt(s),
            }
      )
  );
  const allRules = rules.reduce((acc, rule) => {
    const outerMost = rule.shift().label.trim();

    return { ...acc, [outerMost]: [...(acc[outerMost] || []), ...rule] };
  }, {});
  return containsRecursiveInwards(searchValue, allRules, 0);
}

console.log("TEST DAY 7 Part 1:", day7part1(testInput, "shiny gold"));
console.log("DAY 7 Part 1:", day7part1(realInput, "shiny gold"));

console.log(
  "TEST DAY 7 Part 2:",
  day7part2(testInput, "shiny gold"),
  day7part2(testInput2, "shiny gold")
);
console.log("DAY 7 Part 2:", day7part2(realInput, "shiny gold"));
