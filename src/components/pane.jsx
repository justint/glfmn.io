import React, { useEffect } from 'react'
import { Link } from 'gatsby'
import classNames from 'classnames'

import useVisibility from '../visible'


import * as style from './pane.module.scss'

const Pane = React.forwardRef(({ className, foot, children, ...props }, ref) => (
  <article
    ref={ref}
    {...props}
    className={classNames(style.paneContainer, className)}
  >
    <div>{children}</div>
    <footer className={style.footer}>{foot}</footer>
  </article>
))

export default Pane

function useVisibleCallback(onVisible, rate = 250) {
  const [visible, ref] = useVisibility({ rate })
  useEffect(() => {
    if (visible && onVisible) { onVisible() }
  }, [ref, onVisible, visible])

  return ref
}

export const Box = ({ className, onVisible, children, ...props }) => {
  const ref = useVisibleCallback(onVisible)
  return <div ref={ref}{...props} className={classNames(style.box, className)}>
    {children}
  </div>
}

export const LinkBox = React.forwardRef(
  ({ className, onVisible, linkText, children, ...props }, ref) => {
    const vis = useVisibleCallback(onVisible)
    return <span ref={vis} style={{ padding: 0, margin: 0 }}>
      <Link
        ref={ref}
        {...props}
        className={classNames(style.box, className)}
      >
        {children}
        <span className={style.linkBoxLinkText}>
          {linkText}
        </span>
      </Link>
    </ span >
  }
)

export const LineBox = ({ className, heading, children, ...props }) => (
  <div {...props} className={classNames(style.lineBox, className)}>
    {heading && <header className={style.lineHeading}>{heading}</header>}
    <div className={classNames(style.textArea, style.terminalTheme)}>
      {children || <p></p>}
    </div>
  </div>
)