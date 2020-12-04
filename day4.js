const fs = require("fs");
const input = fs.readFileSync("./input/day4.input").toString();

const testInput1 = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`;

const invalidTestInput2 = `eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007`;

const validTestInput2 = `pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`;

function isValidField({ key, value }) {
  const maybeNumericValue = parseInt(value);
  switch (key) {
    case "byr":
      // byr (Birth Year) - four digits; at least 1920 and at most 2002.
      return maybeNumericValue >= 1920 && maybeNumericValue <= 2002;
    case "iyr":
      // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
      return maybeNumericValue >= 2010 && maybeNumericValue <= 2020;
    case "eyr":
      // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
      return maybeNumericValue >= 2020 && maybeNumericValue <= 2030;
    case "hgt":
      // hgt (Height) - a number followed by either cm or in:
      // If cm, the number must be at least 150 and at most 193.
      // If in, the number must be at least 59 and at most 76.
      return value.includes("cm")
        ? maybeNumericValue >= 150 && maybeNumericValue <= 193
        : maybeNumericValue >= 59 && maybeNumericValue <= 76;
    case "hcl":
      // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
      return value[0] === "#" && !!/^[0-9a-fA-F]+$/.test(value.substring(1));
    case "ecl":
      // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
      return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(value);
    case "pid":
      // pid (Passport ID) - a nine-digit number, including leading zeroes.
      return value.length === 9 && !isNaN(value);
    default:
      // cid (Country ID) - ignored, missing or not.
      return true;
  }
}

const formatInput = (input, validFields, additionalValidation) =>
  input.split("\n\n").map((row) =>
    row
      .split("\n")
      .join(" ")
      .split(" ")
      .map((entry) => {
        const [key, value] = entry.split(":");
        return { key, value };
      })
      .filter(
        (entry) =>
          validFields.includes(entry.key) &&
          (additionalValidation ? isValidField(entry) : true)
      )
  );

const day4part1 = (input) => {
  const validFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  const formattedInput = formatInput(input, validFields);
  return formattedInput.filter((row) => row.length === validFields.length)
    .length;
};

const day4part2 = (input) => {
  const validFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  const formattedInput = formatInput(input, validFields, true);
  return formattedInput.filter((row) => row.length === validFields.length)
    .length;
};

console.log("RES test input part 1:", day4part1(testInput1));

console.log("RES part 1:", day4part1(input));

console.log(
  "RES test input part 2:",
  "invalid:",
  day4part2(invalidTestInput2),
  "valid: ",
  day4part2(validTestInput2)
);

console.log("RES part 2:", day4part2(input));
