import React, { useRef, useState, useEffect } from 'react'
import { Display } from 'rot-js'

export default function Rot({ width, height, draw, interval }) {
  const canvas = useRef()

  // place a span offscreen which we can use to calculate the height and
  // width of a single character
  const tileStyle = {
    padding: 0,
    position: 'absolute',
    top: '-100000px',
    lineHeight: 1,
  }
  const tile = useRef()

  const [display, setDisplay] = useState(null)

  if (display) {
    display.setOptions(dims(tile, width, height))
    draw && !interval && draw(display)
  } else {
    setDisplay(new Display({
      ...dims(tile, width, height),
      fontFamily: 'Source Code Pro',
      fg: '#928374', // gray
      bg: '#282828', // transparent background
      // support serverside rendering with display
      layout: typeof document !== 'undefined' ? 'rect' : 'term'
    }))
  }

  useEffect(
    () => {
      if (canvas.current) {
        const d = display.getContainer()
        canvas.current.appendChild(d)
        return () => d.remove()
      }
    },
    [display]
  )


  useEffect(
    () => {
      if (draw && interval) {
        const loop = setInterval(draw, interval, display)
        return () => clearInterval(loop)
      }
    },
    [display, interval, draw]
  )

  return (
    <div ref={canvas}>
      <span ref={tile} style={tileStyle}>x</span>
    </div>
  )
}

const dims = (tile, width, height) => {
  if (tile && tile.current) {
    const tileWidth = tile.current.clientWidth
    const tileHeight = tile.current.clientHeight

    return {
      tileWidth,
      tileHeight,
      width: width / tileWidth,
      height: height / tileHeight
    }
  }

  return {
    tileWidth: 9,
    tileHeight: 15,
    width: width / 9,
    height: height / 15
  }
}
