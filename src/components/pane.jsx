import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './pane.module.scss'


class Pane extends Component {
  render() {
    const { foot, children } = this.props

    return (
      <section className={style.paneContainer}>
         <div className={style.inner}>
            { children }
         </div>
         <footer className={style.path}>{foot}</footer>
      </section>
    )
  }
}

export function Title({ title, author, date, children }) {
    return (
        <div className={style.boxContainer}>
            <header className={style.titleContainer + ' ' + style.box} id={`${author}-${title}-${date}`}>
                <h2 className={style.title}> {title}</h2>
                <span className={style.author}> {author}</span>
                <p className={style.date}> {date}</p>
                {children && <p className={style.excerpt}>{children}</p>}
            </header>
        </div>
    )
}

export const LineBox = ({heading, title, author, date, children}) => (
    <div className={style.boxContainer}>
        <div className={style.box + ' ' + style.lineNumbered}>
            {(heading || title || author || date) && <header className={style.lineHeading}>
                {heading}
                {title && <h2 className={style.title}> {title}</h2>}
                {author && <span className={style.author}> {author}</span>}
                {date && <p className={style.date}> {date}</p>}
            </header>}
            <div className={style.textArea}>
                {children || <p></p>}
            </div>
        </div>
    </div>
)


export default Pane
