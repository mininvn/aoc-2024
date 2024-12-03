import { readFileSync } from 'fs'
const inputFile = './input.txt'
const input = readFileSync(inputFile, "utf-8")
const regex = /mul\((\d+),(\d+)\)/g
const muls = input.matchAll(regex)
let sum = 0
muls.forEach(mul => {
  mul = mul[0]
  const v1 = mul.split('mul(')[1].split(',')[0]
  const v2 = mul.split(',')[1].split(')')[0]
  sum += v1 * v2
});
console.log(sum)