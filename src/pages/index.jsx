import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { Preview } from '../components/pane'
import { PushDContext } from '../components/pushd'
import SEO from '../components/seo'
import Header from '../components/header'

import style from './index.module.scss'

export default function IndexPage({ data }) {
  const { edges: posts } = data.allMarkdownRemark
  const { cd } = useContext(PushDContext)

  const onClick = to => () => {
    cd(to, '/')
  }

  const { site: { siteMetadata } } = data

  return (<>
    <SEO title="Home" />
    <Layout header={<Header siteTitle={siteMetadata.title} />}>
      {posts
        .filter(({ node: { frontmatter: { title } } }) => title.length > 0)
        .map(({ node: { id, frontmatter } }) => (
          <Item key={id} onClick={onClick} {...frontmatter} />
        ))
      }
    </Layout>
  </>)
}

function Item({ onClick, path, ...props }) {
  return (
    <Preview
      path={path} to={path}
      tabIndex='0'
      onClick={onClick(path)}
      className={style.postTitle}
      {...props} />
  )
}

export const pageQuery = graphql`query IndexQuery {
  allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date] }) {
    edges {
      node { 
        id
        frontmatter {
          title
          author
          date(formatString: "YYYY-MM-DD")
          path
          summary
        }
      }
    }
  }
  site {
    siteMetadata {
      title
    }
  }
}`
