import React from 'react'
import style from './footer.module.scss'

export default function Footer({ children }) {
    return (
        <footer className={style.container}>
            <nav className={style.links}><ul>
                {React.Children.toArray(children).map((link) => {
                    const { key } = link
                    return (<li className={style.link} key={key}>{link}</li>)
                })}
            </ul></nav>
            <p class={style.contact}>Email <b>me@glfmn.io</b></p>
            <p class={style.copyright}>© {new Date().getFullYear()}</p>
        </footer>
    )
}
