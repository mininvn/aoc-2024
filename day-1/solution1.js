import { readFileSync } from 'fs'
const inputFile = './input.txt'
const input = readFileSync(inputFile, "utf-8").split('\n')
const list1 = []
const list2 = []
for (let line of input) {
  const [v1, v2] = line.split("   ")
  list1.push(v1)
  list2.push(v2)
}
const sortedList1 = list1.sort()
const sortedList2 = list2.sort()

let sum = 0
for (let i in sortedList1) {
  sum += Math.abs(parseInt(sortedList2[i]) - parseInt(sortedList1[i]))
}

console.log(sum)
