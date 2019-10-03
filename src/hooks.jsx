import { useState, useEffect } from 'react'

export function useWidth(ref) {
    const [width, setWidth] = useState(0)
    const [timer, setTimer] = useState(null)
    useEffect(() => {
        setWidth(ref.current? ref.current.offsetWidth : 0)
        function onChange() {
            clearTimeout(timer)
            setTimer(setTimeout(() => {
                setWidth(ref.current? ref.current.offsetWidth : 0)
            }, 200))
        }
        window.addEventListener('resize', onChange)
        return () => window.removeEventListener('resize', onChange)
    }, [ref.current])

    return width
}
