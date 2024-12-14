import { readFileSync, writeFileSync } from 'fs'
const inputFile = './input.txt'
const input = readFileSync(inputFile, "utf-8")
const lines = input.split('\n').map(line => line.trim())

const width = 101 - 1
const height = 103 - 1

class Robot {
  constructor(p, v) {
    this.p = p
    this.v = v
    this.mapWidth = width
    this.mapHeight = height
    this.v[0] = this.v[0] < 0 ? this.mapWidth + this.v[0] + 1 : this.v[0]
    this.v[1] = this.v[1] < 1 ? this.mapHeight + this.v[1] + 1 : this.v[1]
  }

  move() {
    this.p[0] = (this.p[0] + this.v[0]) % (this.mapWidth + 1)
    this.p[1] = (this.p[1] + this.v[1]) % (this.mapHeight + 1)
  }

  getQuad() {
    if (this.p[0] == this.mapWidth / 2) { return 0 }
    if (this.p[1] == this.mapHeight / 2) { return 0 }
    const isLeft = this.p[0] < this.mapWidth / 2
    const isUp = this.p[1] < this.mapHeight / 2
    if (isLeft && isUp) { return 1 }
    if (!isLeft && isUp) { return 2 }
    if (!isLeft && !isUp) { return 3 }
    if (isLeft && !isUp) { return 4 }
  }
}

const robots = lines.map(line => {
  let p = line.split(" ")[0]
  p = p.split('p=')[1].split(",").map(val => 1 * val)
  let v = line.split(" ")[1]
  v = v.split('v=')[1].split(",").map(val => 1 * val)
  return new Robot(p, v)
})

const numOfMoves = 11000

draw(robots, "origin.txt")

for (let i = 0; i < numOfMoves; i++) {
  robots.forEach(robot => robot.move())
  const map = draw(robots)
  const lines = map.split("\n")
  for (let line of lines) {
    let found = false
    let count = 0
    for (let c of line) {
      if (c == "#") { count++ }
    }
    if (count > 30) {
      console.warn(i)
      console.log(map)
      found = true;
      break 
    }
    if (found) { break }
  }
}

// P1
// let quads = {
//   1: 0,
//   2: 0,
//   3: 0,
//   4: 0,
//   0: 0
// }

// robots.forEach(robot => {
//   const quad = robot.getQuad()
//   quads[quad] += 1
// })

// console.log(quads)
// console.log(quads[1] * quads[2] * quads[3] * quads[4])

// P2
function draw(robots) {
  let map = []
  for (let i = 0; i < height + 1; i++) {
    map.push([])
    for (let j = 0; j < width + 1; j++) {
      map[i].push(0)
    }
  }

  robots.forEach(robot => {
    const p = robot.p
    map[p[1]][p[0]] += 1
    if (map[p[1]][p[0]] >= 10) {
      console.warn('really?')
    }
  })

  map = map.map(line => line.join(""))
  map = map.join("\n")
  map = map.replace(/0/g, ".")
  map = map.replace(/1/g, "#")
  map = map.replace(/2/g, "#")
  map = map.replace(/3/g, "#")
  map = map.replace(/4/g, "#")
  return map
}