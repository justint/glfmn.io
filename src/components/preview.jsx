import React, { useState, useRef } from 'react'
import ResizeProvider from '../resize'
import Pane, { LinkBox } from './pane'
import classNames from 'classnames'

import style from './preview.module.scss'

const Preview = ({ path, title, author, date, summary, children, ...props }) => (
    <LinkBox className={style.preview} to={path} linkText={`open ${path}.md`} {...props}>
        <Title author={author} date={date} excerpt={summary}>
            {title}
        </Title>
        {children}
    </LinkBox>
)

export default Preview

export const Label = ({ className, color, children, hover, ...props }) => {
    const c = classNames(className, style.label, style[color], hover && style.hover)
    return (
        <span {...props} className={c}>
            {children}
        </span>
    )
}

export const ListPane = ({ className, itemClass, itemStyle, bg, children, ...props }) => {
    const container = useRef(null)
    const childStyle = { ...itemStyle, display: 'flex', alignItems: 'center', }
    const itemProps = { className: classNames(itemClass, style.listItem), style: childStyle }
    const [Bg,] = useState(bg)
    return <Pane classNames={className} {...props}>
        <div ref={container} className={style.background}>
            {Bg && <ResizeProvider track={container}><Bg /></ResizeProvider>}
        </div>
        <ul className={style.list}>
            {React.Children.map(
                children,
                ({ key, ...child }) => <li key={key}  {...itemProps}>{child}</li>
            )}
        </ul>
    </Pane>
}

export const Title = ({ excerpt, author, date, children }) => (
    <>
        {children && <h2 className={style.title}> {children}</h2>}
        {author && <span className={style.author}> {author}</span>}
        {date && <span className={style.date}> {date}</span>}
        {excerpt && <span className={style.excerpt}>{excerpt}</span>}
    </>
)
