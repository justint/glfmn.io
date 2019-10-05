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
  const [observer,] = useState(
    new ResizeObserver((entries, observer) => {
      for (const entry of entries) {
        console.log(entry, entry.contentRect)
        setRect(entry.contentRect)
      }
    }))

  useEffect(() => {
    console.log(ref, observer)
    ref && ref.current && observer.observe(ref.current)
    return () => ref && ref.current && observer.unobserve(ref.current)
  }, [ref])

  return rect
}
