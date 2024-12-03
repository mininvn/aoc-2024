import { readFileSync } from 'fs'
const inputFile = './input.txt'
const input = readFileSync(inputFile, "utf-8").split('\n')

function isSafe(arr) {
  let prev = arr[0]
  const increase = 1 * arr[1] - arr[0] > 0
  for (let i = 1; i < arr.length; i++) {
    if (1 * arr[i] == 1 * prev) { return false }
    if (increase) {
      if (1 * arr[i] < 1 * prev) { return false }
      if (1 * arr[i] - prev > 3) { 
        console.warn('increase more than 3', prev, arr[i])
        return false
      }
    } else {
      if (1 * arr[i] > 1 * prev) { return false }
      if (1 * prev - arr[i] > 3) {        
        console.warn('decrease more than 3', prev, arr[i])
        return false
      }
    }
    prev = arr[i]
  }
  return true
}

let sum = 0
input.forEach(line => {
  const levels = line.split(' ')
  sum += isSafe(levels) ? 1 : 0
})

console.log(sum)