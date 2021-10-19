import React, { useEffect, useRef } from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import ResizeProvider from '../resize'
import Pane, { LinkBox } from './pane'
import classNames from 'classnames'
import Background from '../components/backgrounds'

import * as style from './preview.module.scss'

const Preview = ({ path, title, author, date, summary, children, ...props }) => (
    <LinkBox to={path} linkText={`open ~${path}.md`} {...props}>
        <Title author={author} date={date} excerpt={summary}>
            {title}
        </Title>
        {children}
    </LinkBox>
)

export default Preview

export const Label = ({ className, color, children, hover, ...props }) => {
    const c = classNames(className, style.label, style[color], hover && style.hover)
    return <span {...props} className={c}>
        {children}
    </span>
}

export const LinkLabel = ({ to, children, ...props }) => (
    <Label {...props}>
        <Link to={to} className={style.linkLabel}>{children}</Link>
    </Label>
)

export const PostBg = ({ bg }) => {
    const container = useRef()
    return (
        <div ref={container} className={style.background}>
            <ResizeProvider track={container}>
                <Background bg={bg} />
            </ResizeProvider>
        </div>
    )
}

export const ListPane = ({ bg, className, children, ...props }) => {
    useEffect(() => {
        let currentLocation = 0
        const boxes = document.querySelectorAll('div[class="box-wrapper"] > ul > li')
        const maxScroll = window.innerHeight * (boxes.length - 1)

        let mounted = true
        document.addEventListener('keydown', e => {
            if (mounted) {
                switch(e.key) {
                    case "j":
                        // prevent current location to not hop beyond max height  
                        if (currentLocation < maxScroll) {
                            currentLocation += window.innerHeight
                            window.scrollTo(0, currentLocation)
                        }      
                        break
                    case "k":
                        if (currentLocation > 0) {
                            currentLocation -= window.innerHeight
                            window.scrollTo(0, currentLocation)
                        }
                        break
                }
            }
        })
        
        return () => mounted = false
    }, [])
    
    return (
        <Pane className={className} {...props}>
            {bg}
            <ul className={style.list}>
                {React.Children.map(
                    children,
                    ({ key, ...child }) =>
                      <li key={key} className={style.listItem}>{child}</li>
                )}
            </ul>
        </Pane>
    )
}

export const Title = ({ excerpt, author, date, children }) => (
    <>
        {children && <h2 className={style.title}> {children}</h2>}
        {author && <span className={style.author}> {author}</span>}
        {date && <span className={style.date}> {date}</span>}
        {excerpt && <span className={style.excerpt}>{excerpt}</span>}
    </>
)
