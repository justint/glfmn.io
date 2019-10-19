import React from 'react'

export const Background = ({ bg }) => {
  switch (bg) {
    case 'cellular automata':
      break;
      return <pre>hello world</pre>
    default:
      console.log(`${bg} is unrecognized`)
  }

  return null;
}

export default Background