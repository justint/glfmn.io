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
  const theme = useRef(colors(tile.current))

  const [display,] = useState(new Display({
    fontFamily: 'Source Code Pro',
    // support serverside rendering with display
    layout: typeof document !== 'undefined' ? 'rect' : 'term',
  }))

  useEffect(() => {
    display.setOptions(opts(tile, width, height))
    theme.current = colors(tile.current)
    const canvas = display.getContainer()
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
    if (draw) draw(display, theme.current)
  }, [draw, display, height, width])

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
        const loop = setInterval(draw, interval, display, theme.current)
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

const opts = (tile, width, height) => {
  if (tile && tile.current) {
    // Get the device pixel ratio, falling back to 1.
    const dpr = window.devicePixelRatio || 1
    const fontSize = getComputedStyle(tile.current).getPropertyValue('font-size')
    const tileWidth = tile.current.clientWidth
    const tileHeight = tile.current.clientHeight
    return {
      fontSize: parseInt(fontSize) * dpr,
      width: width / tileWidth,
      height: height / tileHeight,
      fg: getComputedStyle(tile.current).getPropertyValue('--gray'),
      bg: getComputedStyle(tile.current).getPropertyValue('--bg0'),
    }
  }

  return {
    tileWidth: 9,
    tileHeight: 15,
    width: width / 9,
    height: height / 15,
    fg: '#928374', // dark gray
    bg: '#282828', // dark bg0
  }
}

const colors = node => {
  if (!node) return {}
  return [
    'fg', ...enumerate('fg'),
      'bg', ...enumerate('bg'),
      'gray', 'purple', 'blue',
    ].reduce((theme, color) => {
      theme[color] = lookup(node, color)
      return theme
    }, {})
}

function enumerate(pre) {
  return [0, 1, 2, 3, 4].map(n => `${pre}${n}`)
}

function lookup(node, color) {
  return getComputedStyle(node).getPropertyValue(`--${color}`)
}
