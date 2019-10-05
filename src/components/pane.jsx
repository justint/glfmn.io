import React, { Component, useRef, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Progress } from "./text-ui/progress"
import classNames from 'classnames'

import style from './pane.module.scss'

const Pane = React.forwardRef(({ className, foot, children, ...props }, ref) => {
    return (
        <section
          {...props}
          ref={ref}
          className={classNames(style.paneContainer, style.terminalTheme, className)}
        >
            <div>
                { children }
            </div>
            <footer className={style.footer}>{foot}</footer>
        </section>
    )
})

export default Pane;

export const Title = ({ excerpt, author, date, children }) => (
    <>
        {children && <h2 className={style.title}> {children}</h2>}
        {author && <span className={style.author}> {author}</span>}
        {date && <span className={style.date}> {date}</span>}
        {excerpt && <span className={style.excerpt}>{excerpt}</span>}
    </>
)

export const Box = ({ className, children, ...props }) => (
    <div {...props} className={classNames(style.box, className)}>{children}</div>
)

export const LinkBox = ({ className, linkText, children, ...props }) => (
    <Link
        {...props}
        linkText={linkText}
        className={classNames(style.box, style.linkBox, className)}
    >
        { children }
        <span className={style.linkBoxLinkText}>
            {linkText}
        </span>
    </Link>
)

export const LineBox = ({ className, heading, children, ...props }) => (
    <div { ...props } className={classNames(style.lineBox, className)}>
        {heading && <header className={style.lineHeading}>{heading}</header>}
        <div className={style.textArea}>
            {children || <p></p>}
        </div>
    </div>
)

export const PushDContext = React.createContext();

export function PushDProvider({children}) {
    const [ links, setLinks ] = useState(['/'])

    const pushD = (link) => {
        const filtered = links.filter(l => l != link)
        setLinks([link, ...filtered])
    }

    const popD = (link) => {
        const filtered = links.filter(l => l != link)
        setLinks(filtered)
    }

    const cd = (to, current) => {
        const reduced = [current, ...(links.filter(l => l != to && l != current))]
        setLinks(reduced)
    }

    return (
        <PushDContext.Provider value={{ pushD, popD, cd, links }}>
            {children}
        </PushDContext.Provider>
    )
}

export function PushD({ className, max, current, children, ...props }) {
    const links = useContext(PushDContext)
    const home = <Link tabIndex='0' to='/'>/home/glfmn</Link>
    const linkName = link =>  link === '/'? '/home/glfmn' : `${link}.md`

    return (<nav {...props} className={classNames(style.pushd, className)}>
      { current && <span className={style.pushdCurrent}>~{linkName(current)}</span> }
      {links? links.links.slice(0, max || 5).map(link =>
        <Link onClick={() => links.popD(link)} key={link} tabIndex='0' to={link}>{linkName(link)}</Link>
      ) : home }
    </nav>)
}
