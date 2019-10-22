import React, { useContext } from 'react'
import Rot from './rot'
import { ResizeContext } from '../resize'

export const Background = ({ bg }) => {
  let rect = useContext(ResizeContext)

  const width = rect ? rect.width : 720
  const height = rect ? rect.height : 480

  const arrows = (display) => {
    display.clear()

    const { height, width } = display.getOptions()
    if (width < 80) {
      for (let x = 0; x < width; x += 5) {
        display.draw(x - 1, 0, '─')
        display.draw(x, 0, '▬')
        display.draw(x + 1, 0, '─')
        display.draw(x, 1, '⁘')
      }
    } else {
      for (let y = 0; y < height; y += 5) {
        display.draw(3, y - 1, '│')
        display.draw(3, y, '❚')
        display.draw(3, y + 1, '│')
        display.draw(5, y, '⁘')
      }
    }
  }

  switch (bg) {
    default:
      return <Rot width={width} height={height} draw={arrows} />
  }
}

export default Background