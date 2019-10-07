import React from 'react'

import { PushD } from './pane'

import style from './footer.module.scss'

export default function Footer({ className, children, ...props }) {
    return (
        <footer {...props} className={className}>
            <PushD className={style.pushd} />
            <div className={style.container}>
                <nav className={style.links}><ul>
                    {React.Children.toArray(children).map((link) => {
                        const { key } = link
                        return (<li className={style.link} key={key}>{link}</li>)
                    })}
                </ul></nav>
                <span>
                    <p className={style.contact}>Email <b>me@glfmn.io</b></p>
                    <p className={style.copyright}>© {new Date().getFullYear()}</p>
                </span>
            </div>
        </footer>
    )
}
