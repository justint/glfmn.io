import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { ListPane } from './preview'

import Footer from './footer'

import './layout.scss'

const Layout = ({ header, children }) => {
  const listStyle = { textAlign: 'center', position: 'relative' }
  const itemStyle = { height: '100vh' }
  return (
    <div className='page-container'>
      <header className='page-header'>{header}</header>
      <main className='page-content'>
        <ListPane style={listStyle} itemStyle={itemStyle}>
          {children}
        </ListPane>
      </main>
      <Footer className='page-footer'>
        <Link to='/'>/home/glfmn</Link>
        <a href='https://GitHub.com/glfmn'>GitHub://glfmn/</a>
      </Footer>
    </div >
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
