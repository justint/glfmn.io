import React, { useState, useContext } from 'react'
import style from './pushd.module.scss'
import { Link } from 'gatsby'
import classNames from 'classnames'

export const PushDContext = React.createContext();

export function PushDProvider({children}) {
    const [ links, setLinks ] = useState(['/'])

    const pushD = (link) => {
        const filtered = links.filter(l => l !== link)
        setLinks([link, ...filtered])
    }

    const popD = (link) => {
        const filtered = links.filter(l => l !== link)
        setLinks(filtered)
    }

    const cd = (to, current) => {
        const reduced = [current, ...(links.filter(l => l !== to && l !== current))]
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
