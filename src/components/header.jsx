import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styles from "./header.module.scss"

const Header = ({ className, siteTitle }) => (
    <header className={className}>
        <h1 className={styles.title}><Link to='/'>{siteTitle}</Link></h1>
    </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

export default Header
