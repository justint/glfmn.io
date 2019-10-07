import React, { useState, useEffect } from 'react'
import ResizeObserver from 'resize-observer-polyfill';

export const ResizeContext = React.createContext({});

export function ResizeProvider({ track, children }) {

  const rect = useResize(track)

  return (
    <ResizeContext.Provider value={rect}>
      { children }
    </ResizeContext.Provider>
  )
}

export function useResize(ref) {
  const [rect, setRect] = useState(null)
  const [current, setCurrent] = useState(null)
  const [observer,] = useState(
    new ResizeObserver((entries, observer) => {
      for (const entry of entries) {
        setRect(entry.contentRect)
      }
    }))

  useEffect(() => {
    let old = current
    ref && ref.current && setCurrent(ref.current)
    current && observer.observe(current)
    return () => old && observer.unobserve(old)
  }, [ref, current, observer])

  return rect
}
