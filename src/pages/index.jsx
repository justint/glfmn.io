import React, { useState, useContext } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Preview, { PostBg, LinkLabel } from '../components/preview'
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
  const colors = data.allSeries.nodes.reduce(
    (a, { name, color }) => {
      a[name] = color
      return a
    },
    {}
  )

  const [bg, setBg] = useState(null)

  return (<>
    <SEO title="Home" />
    <Layout bg={<PostBg bg={bg} />} header={<Header siteTitle={siteMetadata.title} />}>
      {posts
        .filter(({ node: { frontmatter: { title } } }) => title.length > 0)
        .map(({ node: { id, frontmatter: { series, bg, ...f } } }) => (
          <Preview
            key={id}
            onVisible={() => { setBg(bg) }}
            tabIndex='0'
            onClick={onClick(f.path)}
            {...f}>
            {series && <SeriesLabel series={series} colors={colors} />}
          </Preview>
        ))
      }
    </Layout>
  </>)
}

const SeriesLabel = ({ series, colors }) => (
  <LinkLabel to={`/s/${series}`} className={style.label} color={colors[series]}>
    {series}
  </LinkLabel>
)

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
