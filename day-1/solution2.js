import { readFileSync } from 'fs'
const inputFile = './input.txt'
const input = readFileSync(inputFile, "utf-8").split('\n')
const list1 = []
const list2 = []
for (let line of input) {
  const [v1, v2] = line.split("   ")
  list1.push(v1.trim())
  list2.push(v2.trim())
}

let counter = {}
for (let v of list2) {
  if (!counter[v]) { counter[v] = 0 }
  counter[v] += 1
}

let sum = 0
for (let v of list1) {
  sum += counter[v] ? parseInt(v) * counter[v] : 0
}

console.log(sum)