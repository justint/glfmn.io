import React from 'react'

export const Background = ({ bg }) => {
  switch (bg) {
    case 'cave-generator':
      return <pre>hello world</pre>
    case 'test':
      return <pre>test</pre>
    default:
      console.log(`${bg} is unrecognized`)
  }

  return <></>;
}

export default Background