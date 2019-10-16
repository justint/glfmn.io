import React from 'react'
import { Link } from 'gatsby'
import classNames from 'classnames'

import style from './pane.module.scss'

const Pane = React.forwardRef(({ className, foot, children, ...props }, ref) =>
  (
    <section
      ref={ref}
      {...props}
      className={classNames(style.paneContainer, style.terminalTheme, className)}
    >
      <div>
        { children }
      </div>
      <footer className={style.footer}>{foot}</footer>
    </section>
  )
)

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

export const LinkBox = React.forwardRef(({ className, linkText, children, ...props }, ref) => (
  <Link
    ref={ref}
    {...props}
    className={classNames(style.box, style.linkBox, className)}
  >
    { children }
    <span className={style.linkBoxLinkText}>
      {linkText}
    </span>
  </Link>
))

export const LineBox = ({ className, heading, children, ...props }) => (
  <div { ...props } className={classNames(style.lineBox, className)}>
    {heading && <header className={style.lineHeading}>{heading}</header>}
    <div className={style.textArea}>
      {children || <p></p>}
    </div>
  </div>
)