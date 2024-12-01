import { open } from 'node:fs/promises';

const file = await open('input.txt');

const aValues = [];
const bValues = [];

for await (const line of file.readLines()) {
    const [aValue, bValue] = line.split('   ').map(Number);
    aValues.push(aValue);
    bValues.push(bValue);
}

aValues.sort((a1, a2) => a1 - a2);
bValues.sort((b1, b2) => b1 - b2);
const distances = aValues.map((a, i) => Math.abs(a - bValues[i]));
const task1Result = distances.reduce((acc, el) => acc + el);

console.log(`Score for task 1 is ${task1Result}`);

const bAppearances = bValues.reduce((acc, val) => {
    acc[val] ??= 0;
    acc[val]++;
    return acc;
}, {});
const task2Result = aValues.reduce(
    (acc, val) => acc + val * (bAppearances[val] ?? 0),
    0
);

console.log(`Score for task 2 is ${task2Result}`);
