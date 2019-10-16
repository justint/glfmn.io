import React from 'react'
import { PushDProvider } from './pushd'

export default function Context({ children }) {
    return (
        <>
            <PushDProvider>
                { children }
            </PushDProvider>
        </>
    )
}
