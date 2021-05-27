import React from 'react'
import { Display, scatter } from '../backgrounds'

export default function XY({width, height}) {
  return <Display width={width} height={height} draw={draw}/>
}

function draw(display, theme) {
  if (!display)
    return

  display.clear()
  const { width, height } = display.getOptions()

  // Calculate center points for our two distributions
  const m = {
    x: Math.floor(Math.random() * 5 + width - 10),
    y: Math.floor(Math.random() * 5 + 9),
  }

  const f = {
    x: Math.floor(Math.random() * 5 + 10),
    y: Math.floor(Math.random() * 5 + height - 13),
  }

  const c = { x: width/2, y: height/2-5 }

  // Create a probability distribution function with a multimodal appearance
  const axisLen = Math.sqrt(dist2(m,f))
  const distribution = (m, f, p) => {
    const amplitude = 0.275
    const std = axisLen*0.2 // standard deviation
    const x = normal(f, { x: std*1.1, y: std }, p)
    const y = normal(m, { x: std*0.75, y: std*0.7 }, p)
    // Additional distribution in the center so the two poles blend more
    const z = normal(c, { x: std, y: std*0.4 }, p)
    return amplitude*Math.max(x, y, z)
  }

  for (let x = 0; x < width - 0; ++x) {
    for (let y = 0; y < height - 0; ++y) {
      const p = {x,y}

      if (Math.random() < distribution(m,f,p)) {
        if (dist2(m, p) < dist2(f, p)) {
          display.draw(x, y, "+", theme.bg2)
        } else {
          display.draw(x, y, "*", theme.bg2)
        }
      } else {
        display.draw(x, y, scatter(Math.random()), theme.fg)
      }
    }
  }

  display.draw(m.x, m.y, "y", theme.fg2, theme.blue)
  display.draw(f.x, f.y, "x", theme.fg2, theme.purple)
}

// Squared distance utility function
const dist2 = ({x: x1, y: y1}, {x: x2, y: y2}) => {
  const dx = x2 - x1
  const dy = y2 - y1
  return dx*dx + dy*dy
}


// 2D normal distribution with independent std deviations
const normal = (center, sigma, p) => {
  const x = normalExp(p.x, center.x, sigma.x)
  const y = normalExp(p.y, center.y, sigma.y)
  return Math.exp(x+y)
}

// Exponent of the normal distribution
const normalExp = (x,u,s) => -(x-u)*(x-u) / (2*s*s)
