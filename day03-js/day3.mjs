import { readFileSync } from "fs";

const program = await readFileSync("./input.txt", "utf-8")
    .replaceAll("\n", ""); // I expected `/regex/gm` to work around this but oh how naive I was

console.log("Task 1", program
    .matchAll(/mul\((\d+),(\d+)\)/g)
    .reduce((acc, [_, a, b]) => acc + (+a * +b), 0))

console.log("Task 2", Array
    .from(program.matchAll(/(?:^|do\(\))(.*?)(?:$|don't\(\))/g))
    .flatMap(([_, subString]) => [...subString.matchAll(/mul\((\d+),(\d+)\)/g)])
    .reduce((acc, [_, a, b]) => acc + (+a * +b), 0))