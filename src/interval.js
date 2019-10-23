import { useRef, useEffect } from 'react'

export default function useInterval(fn, delay, ...args) {
  const loop = useRef()

  // Remember the latest callback.
  useEffect(() => loop.current = () => fn(...args), [fn, args])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      loop.current()
    }
    if (delay !== null && delay !== undefined) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}