import React from 'react'
import { Display } from '../backgrounds'
import { Map } from 'rot-js'

export default function Cave({ width, height }) {
  return <Display width={width} height={height} draw={draw} />
}

function draw(display, theme) {
  const { width, height } = display.getOptions()
  const map = new Map.Cellular(width, height, { connected: true })

  map.randomize(0.5)
  map.create()
  map.create()
  map.create()
  map.create()
  map.create((x, y, wall) => {
    if (wall)
      display.draw(x, y, '─', theme.bg1)
    else
      display.draw(x, y, '.', theme.bg2)
  })
}
