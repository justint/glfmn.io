import React, { useState, useRef } from 'react'
import { Link } from 'gatsby'
import classNames from 'classnames'
import ResizeProvider from '../resize'

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

export default Pane;

export const ListPane = ({ className, itemClass, itemStyle, bg, children, ...props }) => {
  const container = useRef(null)
  const childStyle = { ...itemStyle, display: 'flex', alignItems: 'center', }
  const itemProps = { className: itemClass, style: childStyle }
  const [Bg,] = useState(bg)
  return <Pane classNames={className} {...props}>
    <div ref={container} className={style.background}>
      {Bg && <ResizeProvider track={container}><Bg /></ResizeProvider>}
    </div>
    <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
      {React.Children.map(
        children,
        ({ key, ...child }) => <li key={key} {...itemProps}>{child}</li>
      )}
    </ul>
  </Pane>
}

export const Preview = ({ path, title, author, date, summary, ...props }) => (
  <LinkBox className={style.preview} to={path} linkText={`open ${path}.md`} {...props}>
    <Title author={author} date={date} excerpt={summary}>
      {title}
    </Title>
  </LinkBox>
)

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