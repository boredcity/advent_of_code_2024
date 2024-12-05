import { readFileSync } from "fs";

const [rules, sequences] = await readFileSync("./input.txt", "utf-8")
    .split("\n\n")

const beforeByAfter = {}

for (const rule of rules.split("\n")) {
    const [before, after] = rule.split("|").map(Number)
    beforeByAfter[after] ??= []
    beforeByAfter[after].push(before)
}

const getMiddlePageOfValidSequence = (pages) => {
    const forbiddenPages = new Set()
    for (const page of pages) {
        const pagesThatShouldComeBefore = beforeByAfter[page]
        if (forbiddenPages.has(page)) {
            return undefined
        }
        pagesThatShouldComeBefore?.forEach(pageThatShouldComeBefore => forbiddenPages.add(pageThatShouldComeBefore))
    }
    const middlePage = pages.at((pages.length - 1) / 2)
    return middlePage
}

const getCorrectedSequenceMiddlePage = (pages) => {
    const ordered = []
    const pagesSet = new Set(pages)
    while (pagesSet.size) {
        for (const page of pagesSet) {
            const pagesThatShouldComeBefore = beforeByAfter[page]
            if (!pagesThatShouldComeBefore || pagesThatShouldComeBefore.every(pageThatShouldComeBefore => !pagesSet.has(pageThatShouldComeBefore))) {
                ordered.push(page)
                pagesSet.delete(page)
                break
            }
        }
    }
    return ordered.at((ordered.length - 1) / 2)
    
}

let result1 = 0
let result2 = 0

for (const sequence of sequences.split("\n")) {
    const pages = sequence.split(",").map(Number)
    const middlePage = getMiddlePageOfValidSequence(pages)
    if (middlePage !== undefined) {
        result1 += middlePage
    } else {
        result2 += getCorrectedSequenceMiddlePage(pages)
    }
}

console.log("Task 1", result1)
console.log("Task 2", result2)