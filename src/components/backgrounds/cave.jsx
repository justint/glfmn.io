import React from 'react'
import { Display } from '../backgrounds'
import { Map } from 'rot-js'

export default function ({ width, height }) {
  return <Display width={width} height={height} draw={draw} />
}

function draw(display) {
  const { width, height } = display.getOptions()
  const map = new Map.Cellular(width, height, { connected: true })

  map.randomize(0.5)
  map.create()
  map.create()
  map.create()
  map.create()
  map.create((x, y, wall) => {
    if (wall)
      display.draw(x, y, '─', '#3C3836')
    else
      display.draw(x, y, '.', '#504945')
  })
}