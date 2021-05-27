import React, { useContext, useState } from 'react'
import { ResizeContext } from '../resize'
import useInterval from '../interval'
import Loadable from 'react-loadable'

import Cave from './backgrounds/cave'
import XY from './backgrounds/xy'

const Background = ({ bg }) => {
  let rect = useContext(ResizeContext)

  const width = rect ? rect.width : 720
  const height = rect ? rect.height : 480

  console.log("using background", bg)

  switch (bg) {
    case 'cave-generator':
      return <Cave width={width} height={height} />
    case 'xy':
      return <XY width={width} height={height} />
    case 'noise':
      return <Display width={width} height={height} draw={noise} interval={66} />
    case 'arrows':
    default:
      return <Display width={width} height={height} draw={arrows} />
  }
}

export default Background

export const Display = Loadable({
  loader: () => import('./rot'),
  loading: () => <Spinner type='dots' rate='100' />,
  render: (loaded, props) => {
    const Component = loaded.default
    return <Component {...props} />
  }
})

const scatterGlyphs = ['~', '`', '.']

// Produce a random glyph based on t from 0 to 1
export const scatter = (t) => {
  return scatterGlyphs[Math.floor(t * scatterGlyphs.length)]
}

const Spinner = ({ type, items, rate, pastDelay }) => {
  const spinners = {
    'square dots': ['⠁', '⠂', '⠄', '⡀', '⢀', '⠠', '⠐', '⠈'],
    'dots': ['⢄', '⢂', '⢁', '⡁', '⡈', '⡐', '⡠'],
    'bar': ['\\', '|', '/', '-'],
    'ellipsis': ['   ', '.  ', '.. ', '...', ' ..', '  .'],
    'circle': ['◜', '◠', '◝', '◞', '◡', '◟'],
  }
  const selection = type in spinners ? spinners[type] : spinners['dots']
  const spin = items ? items : selection
  const [index, setIndex] = useState(0)
  const inc = () => setIndex((index + 1) % spin.length)
  useInterval(inc, rate || 250)
  const style = {
    padding: 0,
    margin: 0,
    position: 'absolute',
    right: '1em',
    fontSize: '2em',
  }
  if (pastDelay)
    return <pre style={style}>{spin[index]}</pre>
  else
    return <></>
}

const noise = (display) => {
  if (!display) return

  display.clear()
  const { height, width } = display.getOptions()

  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++)
      if (Math.random() > 0.9)
        display.draw(Math.floor(width * Math.random()), y, '.')
}

const arrows = (display, theme) => {
  if (!display)
    return

  display.clear()
  const { height, width } = display.getOptions()

  for (let x = 0; x < width; ++x) {
    for (let y = 0; y < height; ++y) {
      display.draw(x, y, scatter(Math.random()), theme.fg)
    }
  }

  if (width < 1.5 * height) {
    for (let x = 4; x < width; x += 5) {
      display.draw(x - 4, 0, '─')
      display.draw(x - 3, 0, '▬')
      display.draw(x - 2, 0, '─')
      display.draw(x - 3, 1, '⁘')
    }
  } else {
    for (let y = 8; y < height; y += 5) {
      display.draw(3, y - 4, '│')
      display.draw(3, y - 3, '❚')
      display.draw(3, y - 2, '│')
      display.draw(5, y - 3, '⁘')
    }
  }
}

const xy = (display, theme) => {
  if (!display)
    return

  display.clear()
  const { width, height } = display.getOptions()

  const m = {
    x: Math.floor(Math.random() * 5 + width - 10),
    y: Math.floor(Math.random() * height/2 + height/4),
  }

  const f = {
    x: Math.floor(Math.random() * 5 + 10),
    y: Math.floor(Math.random() * height/2 + height/4),
  }

  const dist2 = ({x: x1, y: y1}, {x: x2, y: y2}) => {
    const dx = x2 - x1
    const dy = y2 - y1
    return dx*dx + dy*dy
  }

  const maxDist = Math.sqrt(dist2({x: 0.0, y: 0.0}, {x: width, y: height}))

  const normal = (center, sigma, p) => {
    const x = dist2(center,p)
    return Math.exp(-x*x/(2*sigma*sigma))/(sigma*Math.sqrt(2)*Math.PI)
  }

  let distribution = (m, f, p) => {
    const sigma = maxDist / 5 // standard deviation
    const chance = Math.random()
    return chance < normal(m,p,sigma) / normal(f,p,sigma)
  }

  for (let x = 2; x < width - 2; ++x) {
    for (let y = 2; y < height - 2; ++y) {
      const p = {x,y}
      if (!distribution(m,f,p)) continue
      if (dist2(m, p) < dist2(f, p)) {
        display.draw(x, y, "+", theme.bg2)
      } else {
        display.draw(x, y, "*", theme.bg2)
      }
    }
  }

  display.draw(m.x, m.y, "x", theme.fg2)
  display.draw(m.x+1, m.y, "y", theme.fg2, theme.blue)
  display.draw(f.x, f.y, "x", theme.fg2)
  display.draw(f.x+1, f.y, "x", theme.fg2, theme.purple)
}
