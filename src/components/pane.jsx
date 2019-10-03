import React, { Component, useRef } from 'react'
import PropTypes from 'prop-types'
import style from './pane.module.scss'
import { Progress } from "./text-ui/progress"
import { useWidth } from '../hooks'


export default function Pane({foot, children}) {
    const columnSource = useRef(null)
    const columnWidth = 12
    const width = useWidth(columnSource)

    return (
        <section tabIndex='0' className={style.paneContainer}>
            <div ref={columnSource} className={style.inner}>
                { children }
                <Progress label='read' progress={0.8} width={width}/>
            </div>
            <footer className={style.path}>{foot}</footer>
        </section>
    )
}


export function Title({ title, author, date, children }) {
    return (
        <div className={style.boxContainer}>
            <header className={style.titleContainer + ' ' + style.box} id={`${author}-${title}-${date}`}>
                {title && <h2 className={style.title}> {title}</h2>}
                {author && <span className={style.author}> {author}</span>}
                {date && <p className={style.date}> {date}</p>}
                {children && <p className={style.excerpt}>{children}</p>}
            </header>
        </div>
    )
}

export const LineBox = ({heading, title, author, date, children}) => (
    <div className={style.boxContainer}>
        <div className={style.box + ' ' + style.lineNumbered}>
            {(heading || title || author || date) && <header className={style.lineHeading}>
                {heading}
                {title && <h2 role="title" className={style.title}> {title}</h2>}
                {author && <span role="author" className={style.author}> {author}</span>}
                {date && <p role="publish date" className={style.date}> {date}</p>}
            </header>}
            <div className={style.textArea}>
                {children || <p></p>}
            </div>
        </div>
    </div>
)
