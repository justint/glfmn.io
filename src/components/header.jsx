import React, { useState } from "react"
import PropTypes from "prop-types"

import classNames from 'classnames'
import styles from "./header.module.scss"

export default function Header({ className, siteTitle }) {
  return (
    <header className={classNames(className, styles.container)}>
      <h1 className={styles.title}>
        <span className={styles.user}>{siteTitle}</span>
        <span>@</span>
        <span className={styles.host}>blog</span>
        <span className={styles.path}>~</span>
        <span className={styles.prompt}>$</span>
      </h1>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}
