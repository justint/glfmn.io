import React from 'react'
import style from './text-ui.module.scss'

export function Progress(props) {
    const left = '╢'
    const right = '╟'
    const filler = '░'
    const full = '▒'

    const labelSize = props.label? props.label.length + 1 : 0

    const { columns, progress } = props
    const width = columns - labelSize - 2;
    const finished = Math.floor(Math.max(0, Math.min(width, progress * width)))
    return (
        <div className={style.uiContainer}>
            { props.label && <span className={style.label}>{props.label + ' '}</span> }
            <span className={style.uiDecorative}>{left}</span>
            <span>{full.repeat(finished)}</span>
            <span className={style.uiDecorative}>{filler.repeat(width - finished)}</span>
            <span className={style.uiDecorative}>{right}</span>
        </div>
    )
}

export function Range(props) {
    const left = '╢'
    const right = '╟'
    const bar = '┄'
    const handle = '█'

    const labelSize = props.label? props.label.length + 1: 0

    const { columns, value } = props
    const width = columns - labelSize - 1- 2;
    const h = Math.floor(Math.max(0, Math.min(width, value * width)))
    return (
        <div className={style.uiContainer}>
            { props.label && <span className={style.label}>{props.label + ' '}</span> }
            <span className={style.uiDecorative}>{left}</span>
            <span className={style.uiDecorative}>{bar.repeat(h)}</span>
            <span className={style.uiInteractive}>{handle}</span>
            <span className={style.uiDecorative}>{bar.repeat(width - h)}</span>
            <span className={style.uiDecorative}>{right}</span>
        </div>
    )
}
