import React, { useState, useContext, useRef } from 'react'
import ResizeProvider from '../resize'
import Pane, { LinkBox } from './pane'
import classNames from 'classnames'
import Background from '../components/backgrounds'
import useVisibility from 'react-use-visibility'
import Loadable from 'react-loadable'

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

export const BgContext = React.createContext({});

export const BgProvider = ({ initial, children }) => {
    const container = useRef()

    const [Bg, setBgState] = useState(initial)
    const setBg = bg => setBgState(bg || initial)
    function resetBg() { setBgState(initial) }

    return (
        <BgContext.Provider value={{ resetBg, setBg, Bg }}>
            <div ref={container} className={style.background}>
                {Bg && <ResizeProvider track={container}><Background bg={Bg} /></ResizeProvider>}
            </div>
            {children}
        </BgContext.Provider>
    )
}

const SetBgImpl = ({ item, bg }) => {
    const isVisible = useVisibility(item.current)
    const { setBg } = useContext(BgContext)
    if (isVisible) { setBg(bg) }

    return (<></>)
}

export const SetBg = Loadable({
    loader: () => new Promise((resolve, reject) => resolve(SetBgImpl)),
    loading: () => <></>
})

export const ListPane = ({ className, itemClass, itemStyle, bg, children, ...props }) => {
    const childStyle = { ...itemStyle, display: 'flex', alignItems: 'center', }
    const itemProps = { className: classNames(itemClass, style.listItem), style: childStyle }

    return <Pane className={className} {...props}>
        <BgProvider initial={bg}>
            <ul className={style.list}>
                {React.Children.map(
                    children,
                    ({ key, ...child }) => <li key={key}  {...itemProps}>{child}</li>
                )}
            </ul>
        </BgProvider>
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
