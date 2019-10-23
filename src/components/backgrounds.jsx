import React, { useContext, useState } from 'react'
import { ResizeContext } from '../resize'
import useInterval from '../interval'
import Loadable from 'react-loadable'

const Background = ({ bg }) => {
  let rect = useContext(ResizeContext)

  const width = rect ? rect.width : 720
  const height = rect ? rect.height : 480

  switch (bg) {
    case 'noise':
      return <Display width={width} height={height} draw={noise} interval={66} />
    default:
      return <Display width={width} height={height} draw={arrows} />
  }
}

export default Background

const Display = Loadable({
  loader: () => import('./rot'),
  loading: () => <Spinner type='circle' />,
  render: (loaded, props) => {
    const Component = loaded.default
    return <Component {...props} />
  }
})

const Spinner = ({ type, items, rate, pastDelay }) => {
  const spinners = {
    'dots': ['⠁', '⠂', '⠄', '⡀', '⢀', '⠠', '⠐', '⠈'],
    'bar': ['/', '|', '\\', '-'],
    'elipsis': ['   ', '.  ', '.. ', '...', ' ..', '  .'],
    'elipsis bar': ['⋰', '⋮', '⋱', '⋯'],
    'circle': ['◜', '◠', '◝', '◞', '◡', '◟'],
  }
  const selection = type in spinners ? spinners[type] : spinners['dots']
  const spin = items ? items : selection
  const [index, setIndex] = useState(0)
  const inc = () => setIndex((index + 1) % spin.length)
  useInterval(inc, rate || 250)
  if (pastDelay)
    return <pre style={{ padding: 0, margin: 0 }}>{spin[index]}</pre>
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

const arrows = (display) => {
  if (!display)
    return

  display.clear()
  const { height, width } = display.getOptions()

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
