import { readFileSync } from 'fs'
const inputFile = './input.txt'
const input = readFileSync(inputFile, "utf-8")
const regex = /mul\((\d+),(\d+)\)/g
const doRegex = /do\(\)/g
const dontRegex = /don\'t\(\)/g
const muls = input.matchAll(regex)
const dos = input.matchAll(doRegex)
const donts = input.matchAll(dontRegex)

const dosIndex = dos.map((el) => { return el.index }).toArray()
const dontsIndex = donts.map((el) => { return el.index }).toArray()

function shouldDo(index) {
  let minDo = 0
  for (let ind of dosIndex) {
    if (ind > index) {
      break
    }
    minDo = ind
  }
  let minDont = 0
  for (let ind of dontsIndex) {
    if (ind > index) {
      break
    }
    minDont = ind
  }
  console.log(index, minDo, minDont)
  return minDo >= minDont
}

let sum = 0
for (let mul of muls) {
  if (!shouldDo(mul.index)) { continue }
  mul = mul[0]
  const v1 = mul.split('mul(')[1].split(',')[0]
  const v2 = mul.split(',')[1].split(')')[0]
  sum += v1 * v2
}
console.log(sum)