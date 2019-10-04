import React, { useContext } from 'react'
import { Link } from 'gatsby'
import classNames from 'classnames'
import Layout from '../components/layout'
import Pane, { Box, Title, PushDContext } from '../components/pane'
import SEO from '../components/seo'

import style from './index.module.scss'

export default function IndexPage({ data }) {
    const { edges: posts } = data.allMarkdownRemark
    const { links, cd } = useContext(PushDContext)

    const onClick = to => () => {
        cd(to, '/')
    }

    return (
        <Layout>
        <SEO title="Home" />
        {posts
            .filter(post => post.node.frontmatter.title.length > 0)
            .map(({ node: { id, frontmatter: { Bg, path, author, date, summary, title } } }) => (
                <div key={id} className={style.postContainer}>
                    <Pane foot={<span className={style.pagePath}>{path}.md</span>}>
                        <div style={{ textAlign: 'center', position: 'relative' }}>
                            <div className={style.postBackground}>{ Bg && <Bg/> }</div>
                            <Link onClick={onClick(path)} to={path} tabIndex='0'className='plain'>
                                <Box className={style.postTitle}>
                                    <Title
                                        excerpt={summary}
                                        author={author}
                                        date={date}
                                    >
                                        {title}
                                    </Title>
                                    <span className={style.postLink} to={path}>
                                        open {path}.md
                                    </span>
                                </Box>
                            </Link>
                        </div>
                    </Pane>
                </div>
            ))
        }
        </Layout>
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
