import React, { useRef } from 'react'
import style from './text-ui.module.scss'
import { useWidth } from '../../hooks'

export function Progress({ label, width, progress }) {
    const left = '╢'
    const right = '╟'
    const filler = '░'
    const full = '▒'

    const leftEl = useRef(null)
    const columnWidth = useWidth(leftEl)

    const columns = Math.floor((width - columnWidth)/Math.max(columnWidth, 1));

    const labelSize = label? label.length + 1 : 0
    const barWidth = Math.max(columns - labelSize - 2, 5);
    const finished = Math.floor(Math.max(0, Math.min(barWidth, progress * barWidth)))
    return (
        <div className={style.uiContainer}>
            { label && labelSize < columns-5 && <span className={style.label}>{label + ' '}</span> }
            <span ref={leftEl} className={style.uiDecorative}>{left}</span>
            <span>{full.repeat(finished)}</span>
            <span className={style.uiDecorative}>{filler.repeat(barWidth - finished)}</span>
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
