import React, { useState, useContext, useRef, useEffect } from 'react'
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

    const [bg, setCtx] = useState(initial)
    function setBg(bg) { setCtx(bg || initial) }
    function resetBg() { setCtx(initial) }

    return (
        <BgContext.Provider value={{ bg, setBg, resetBg }}>
            <div ref={container} className={style.background}>
                <ResizeProvider track={container}>
                    <Background bg={bg} />
                </ResizeProvider>
            </div>
            {children}
        </BgContext.Provider>
    )
}

const SetBgImpl = ({ item, bg }) => {
    const isVisible = useVisibility(item.current)
    const { setBg } = useContext(BgContext)

    // For some reason, simply setting the BG without checking visibility
    // works this way; HACK: this prevents issues where clicking a link
    // within the page causes some issue with getting effects to properly
    // run.  Backgrounds werent getting set at all, and the visibility
    // never appears to update without setBg being called.
    useEffect(() => { setBg(bg) }, [isVisible, bg])

    return null
}

export const SetBg = Loadable({
    loader: () => new Promise((resolve, reject) => resolve(SetBgImpl)),
    loading: () => null
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

