import React, { useRef, useContext } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Preview, { Label, BgContext } from '../components/preview'
import { PushDContext } from '../components/pushd'
import SEO from '../components/seo'
import Header from '../components/header'
import useVisibility from 'react-use-visibility'

import style from './index.module.scss'

export default function IndexPage({ data }) {
  const { edges: posts } = data.allMarkdownRemark
  const { cd } = useContext(PushDContext)

  const onClick = to => () => {
    cd(to, '/')
  }

  const { site: { siteMetadata } } = data
  const colors = data.allSeries.nodes.reduce(
    (a, { name, color }) => {
      a[name] = color
      return a
    },
    {}
  )

  return (<>
    <SEO title="Home" />
    <Layout header={<Header siteTitle={siteMetadata.title} />}>
      {posts
        .filter(({ node: { frontmatter: { title } } }) => title.length > 0)
        .map(({ node: { id, frontmatter: f } }) => (
          <Item key={id} color={colors[f.series]} onClick={onClick} {...f} />
        ))
      }
    </Layout>
  </>)
}

function Item({ bg, onClick, allSeries, series, color, path, ...props }) {
  const item = useRef()
  const isVisible = typeof window !== 'undefined' ? useVisibility(item.current) : false
  const { setBg } = useContext(BgContext)
  if (isVisible) { setBg(bg) }

  return (
    <div ref={item} style={{ margin: 0, padding: 0, width: '100%' }}>
      <Preview
        path={path} to={path}
        tabIndex='0'
        onClick={onClick(path)}
        {...props}>
        {series && <Label className={style.label} color={color}>{series}</Label>}
      </Preview>
    </div>
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
          series
          bg
        }
      }
    }
  }
  allSeries {
    nodes {
      name
      color
    }
  }
  site {
    siteMetadata {
      title
    }
  }
}`
