import React, { Component, useRef } from 'react'
import PropTypes from 'prop-types'
import style from './pane.module.scss'
import { Progress } from "./text-ui/progress"
import { useWidth } from '../hooks'


export default function Pane({foot, children}) {
    return (
        <section tabIndex='0' className={style.paneContainer + ' ' + style.terminalTheme}>
            <div>
                { children }
            </div>
            <footer className={style.footer}>{foot}</footer>
        </section>
    )
}


export const Title = ({ excerpt, author, date, children }) => (
    <React.Fragment>
        {children && <h2 className={style.title}> {children}</h2>}
        {author && <span className={style.author}> {author}</span>}
        {date && <span className={style.date}> {date}</span>}
        {excerpt && <span className={style.excerpt}>{excerpt}</span>}
    </React.Fragment>
)


export const Box = ({ small, children }) => (
    <div className={style.boxContainer}>
        <div className={style.box}>
            {children}
        </div>
    </div>
)


export const LineBox = ({heading, title, author, date, children}) => (
    <div className={style.lineBox}>
        {heading && <header className={style.lineHeading}>{heading}</header>}
        <div className={style.textArea}>
            {children || <p></p>}
        </div>
    </div>
)
