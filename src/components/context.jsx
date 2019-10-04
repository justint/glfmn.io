import React from 'react'
import { PushDProvider } from './pane'

export default function Context({ children }) {
    return (
        <>
            <PushDProvider>
                { children }
            </PushDProvider>
        </>
    )
}
