import { readFileSync } from "fs";

const rows = await readFileSync("./input.txt", "utf-8")
    .split("\n")

let xWordsFound = 0
const wordToFind = "XMAS"
const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
]
const findFromX = (rows, rowI, colI) => {
    for (const dir of directions) {
        let step = 0
        while (true) {
            step++
            const newRowI = rowI + dir[0] * step
            const newColI = colI + dir[1] * step
            if (rows[newRowI]?.[newColI] !== wordToFind[step]) {
                break
            }
            if (step === wordToFind.length - 1) {
                xWordsFound++
                break
            }
        }
    }
}

let aWordsFound = 0
const findFromA = (rows, rowI, colI) => {
    const diagonals = [
        [ rows[rowI - 1]?.[colI - 1], rows[rowI + 1]?.[colI + 1] ],
        [ rows[rowI - 1]?.[colI + 1], rows[rowI + 1]?.[colI - 1] ],
    ]

    let canBeX = true
    for (const diagonal of diagonals) {
        if (!(diagonal.includes("M") && diagonal.includes("S"))) {
            canBeX = false
        }
    }
    if (canBeX) {
        aWordsFound++
    }
}

for (let rowI = 0; rowI < rows.length; rowI++) {
    for (let colI = 0; colI < rows[0].length; colI++) {
        const char = rows[rowI][colI]
        if (char === "X") {
            findFromX(rows, rowI, colI)
        } if (char === "A") {
            findFromA(rows, rowI, colI)
        }
    }
}

console.log("Task 1", xWordsFound)
console.log("Task 2", aWordsFound)