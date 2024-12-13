import { readFileSync } from 'fs'
const inputFile = './input.txt'
const input = readFileSync(inputFile, "utf-8").split('\n').map(line => line.trim())

const extra = 10000000000000

function handleInput(input) {
  const x1 = 1 * input[0].split("X+")[1].split(",")[0]
  const y1 = 1 * input[0].split("Y+")[1]
  const x2 = 1 * input[1].split("X+")[1].split(",")[0]
  const y2 = 1 * input[1].split("Y+")[1]
  const x = 1 * input[2].split("X=")[1].split(",")[0] + extra
  const y = 1 * input[2].split("Y=")[1] + extra
  // a * x1 + b * x2 = x
  // a * y1 + b * y2 = y
  // find a and b
  // (ax1 + bx2) * y1 = x * y1
  // (ay1 + by2) * x1 = y * x1
  // ax1y1 + bx2y1 = x * y1
  // ay1x1 + by2x1 = y * x1
  // b(x2y1 - y2x1) = xy1 - yx1
  // b = (xy1 - yx1) / (x2y1 - y2x1)
  const b = (x * y1 - y * x1) / (x2 * y1 - y2 * x1)
  if (b == parseInt(b)) {
    const a = (x - b * x2) / x1
    console.warn(a, b)
    return a * 3 + b
  } else {
    return 0
  }
}

let sum = 0
for (let i = 0; i < input.length; i += 4) {
  let inp = input.slice(i, i+4)
  const tokens = handleInput(inp)
  sum += tokens
}

console.log(sum)