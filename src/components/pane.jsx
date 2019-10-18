import React from 'react'
import { Link } from 'gatsby'
import classNames from 'classnames'

import style from './pane.module.scss'

const Pane = React.forwardRef(({ className, foot, children, ...props }, ref) =>
  (
    <article
      ref={ref}
      {...props}
      className={classNames(style.paneContainer, className)}
    >
      <div>{children}</div>
      <footer className={style.footer}>{foot}</footer>
    </article>
  )
)

export default Pane

export const Box = ({ className, children, ...props }) => (
  <div {...props} className={classNames(style.box, className)}>{children}</div>
)

export const LinkBox = React.forwardRef(({ className, linkText, children, ...props }, ref) => (
  <Link
    ref={ref}
    {...props}
    className={classNames(style.box, style.linkBox, className)}
  >
    {children}
    <span className={style.linkBoxLinkText}>
      {linkText}
    </span>
  </Link>
))

export const LineBox = ({ className, heading, children, ...props }) => (
  <div {...props} className={classNames(style.lineBox, className)}>
    {heading && <header className={style.lineHeading}>{heading}</header>}
    <div className={classNames(style.textArea, style.terminalTheme)}>
      {children || <p></p>}
    </div>
  </div>
)