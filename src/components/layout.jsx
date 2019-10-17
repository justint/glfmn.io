import React from "react"
import PropTypes from "prop-types"
import { Link, useStaticQuery, graphql } from "gatsby"

import Header from './header'
import Footer from './footer'

import './layout.scss'

const Layout = ({ children }) => {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `)

    const { title } = data.site.siteMetadata

    return (
        <div className='page-container'>
            <Header className='page-header' siteTitle={title} />
            <main className='page-content'>{children}</main>
            <Footer className='page-footer'>
                <Link to='/'>/home/glfmn</Link>
                <a href='https://GitHub.com/glfmn'>GitHub://glfmn/</a>
            </Footer>
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
