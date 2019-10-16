import React, { useContext, useRef } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Pane, { LinkBox, Title } from '../components/pane'
import { PushDContext } from '../components/pushd'
import SEO from '../components/seo'
import ResizeProvider from '../resize'

import style from './index.module.scss'

export default function IndexPage({ data }) {
  const { edges: posts } = data.allMarkdownRemark
  const { cd } = useContext(PushDContext)

  const onClick = to => () => {
    cd(to, '/')
  }

  return (
    <Layout>
      <SEO title="Home" />
      {posts
        .filter(post => post.node.frontmatter.title.length > 0)
        .map(({ node: { id, frontmatter } }) => (
          <Preview key={id} onClick={onClick} {...frontmatter} />
        ))
      }
    </Layout>
  )
}

function Preview({ path, onClick, title, author, date, summary, Bg }) {
  const container = useRef(null)
  return (
    <div className={style.postContainer}>
      <Pane foot={<span className={style.pagePath}>{path}.md</span>}>
        <div style={{ textAlign: 'center', position: 'relative' }}>
          <div ref={container} className={style.postBackground}>
            { Bg && <ResizeProvider track={container}><Bg/></ResizeProvider> }
          </div>
          <LinkBox
            linkText={`open ${path}.md`}
            to={path} tabIndex='0'
            onClick={onClick(path)}
            className={style.postTitle}>
            <Title
              excerpt={summary}
              author={author}
              date={date}
            >
              {title}
            </Title>
          </LinkBox>

        </div>
      </Pane>
    </div>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
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
  }`
