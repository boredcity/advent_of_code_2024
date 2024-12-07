import { readFileSync } from "fs";

const canBeSolved = ({ result, numbers }, allowConcatenation) => {
  if (numbers.length < 2) {
    return numbers[0] === result;
  }
  const multiplied = numbers[0] * numbers[1];
  const summed = numbers[0] + numbers[1];
  const concatenated = allowConcatenation
    ? Number(numbers[0].toString() + numbers[1].toString())
    : -1;

  if (numbers.length === 2) {
    return (
      multiplied === result || summed === result || concatenated === result
    );
  }

  return (
    canBeSolved(
      {
        result,
        numbers: [multiplied, ...numbers.slice(2)],
      },
      allowConcatenation
    ) ||
    canBeSolved(
      {
        result,
        numbers: [summed, ...numbers.slice(2)],
      },
      allowConcatenation
    ) ||
    (allowConcatenation
      ? canBeSolved(
          {
            result,
            numbers: [concatenated, ...numbers.slice(2)],
          },
          allowConcatenation
        )
      : false)
  );
};

const equations = await readFileSync("./test-input.txt", "utf-8")
  .split("\n")
  .map((row) => {
    const [res, parts] = row.split(": ");
    return { result: Number(res), numbers: parts.split(" ").map(Number) };
  });

let result1 = 0;
let result2 = 0;
for (const equation of equations) {
  if (canBeSolved(equation, false)) {
    result1 += equation.result;
  }
  if (canBeSolved(equation, true)) {
    result2 += equation.result;
  }
}

console.log("Task 1", result1)
console.log("Task 2", result2)