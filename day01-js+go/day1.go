package main

import (
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

func abs(x int) int {
	return x < 0 {
		return -x
	}
	return x
}

func main() {
	data, err := os.ReadFile("input.txt")
	if err != nil {
		fmt.Println("Error reading file:", err)
		return
	}

	lines := strings.Split(strings.TrimSpace(string(data)), "\n")
	aValues, bValues := make([]int, len(lines)), make([]int, len(lines))

	for i, line := range lines {
		parts := strings.Fields(line)
		aValues[i], _ = strconv.Atoi(parts[0])
		bValues[i], _ = strconv.Atoi(parts[1])
	}

	sort.Ints(aValues)
	sort.Ints(bValues)

	task1Result := 0
	for i := range aValues {
		task1Result += abs(aValues[i] - bValues[i])
	}

	bAppearances := map[int]int{}
	for _, b := range bValues {
		bAppearances[b]++
	}

	task2Result := 0
	for _, a := range aValues {
		task2Result += a * bAppearances[a]
	}

	fmt.Printf("Score for task 1 is %d\n", task1Result)
	fmt.Printf("Score for task 2 is %d\n", task2Result)
}
