import p5 from 'p5'

const myP5 = new p5(p => {
  // background circles
  const circles = []
  for (let i = 0; i < 150; i++) {
    const x = p.random(p.windowWidth)
    const y = p.random(p.windowHeight)
    const size = p.random(10, 200)
    const r = p.random(50, 128)
    const g = p.random(50, 128)
    const b = p.random(50, 128)
    circles[i] = {x, y, size, r, b, g}
  }

  // pulses around mouse
  const pulses = [0]

  // goal
  const x = p.random(30, 470)
  const y = p.random(30, 470)

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight)
  }

  p.draw = () => {
    p.background(120)

    const xDistance = p.abs(x - p.mouseX)
    const yDistance = p.abs(y - p.mouseY)

    // background circles
    circles.forEach(data => {
      p.push()
      p.noStroke()
      p.translate(p.random(-2, 2), p.random(-2, 2))
      p.fill(data.r, data.b, data.g)
      p.ellipse(data.x, data.y, data.size)
      p.pop()
    })

    // pulses around mouse
    if (p.frameCount % 30 === 0) {
      pulses.push(0)
    }
    p.ellipse(p.mouseX, p.mouseY, 10)
    for (const i in pulses) {
      pulses[i] += 3
      p.push()
      p.noFill()
      p.strokeWeight(2)
      p.stroke(255 - xDistance, 255 - yDistance, 255 - xDistance - yDistance, 255 - pulses[i])
      p.ellipse(p.mouseX, p.mouseY, pulses[i])
      p.pop()
    }
    if (pulses[0] > 300) {
      pulses.shift()
    }

    // goal
    if (xDistance + yDistance < 15) {
      p.push()
      p.fill(255)
      p.noStroke()
      p.ellipse(x, y, 25)
      p.pop()
    }
  }
})
