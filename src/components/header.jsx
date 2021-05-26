import React from "react"
import PropTypes from "prop-types"

import classNames from 'classnames'
import * as styles from "./header.module.scss"

export default function Header({ className, siteTitle }) {
  return (
    <header className={classNames(className, styles.container)}>
      <h1 className={styles.title}>{siteTitle}</h1>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}
