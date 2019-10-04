import React from "react"
import { graphql, Link } from "gatsby"
import Pane, { LineBox, Title } from '../components/pane'
import { Progress } from '../components/text-ui/progress'

export default function Template({
    data, // this prop will be injected by the GraphQL query below.
}) {
    const { markdownRemark } = data // data.markdownRemark holds our post data
    const { frontmatter, html } = markdownRemark
    const { author, title, date, path } = frontmatter;

    return (
        <div className="blog-post-container">
            <Pane foot={
                <React.Fragment>
                    <span>{path + '.md'}</span><Link to="/">/home/glfmn</Link>
                    <Progress label='read' progress={0.8} width={400}/>
                </React.Fragment>
            }>
                <LineBox heading={
                    <Title author={author} date={date}>{title}</Title>
                }>
                    <article
                        className="blog-post-content"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                </LineBox>
            </Pane>
        </div>
    )
}
export const pageQuery = graphql`
    query($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
                date(formatString: "YYYY-MM-DD")
                path
                title
                author
            }
        }
    }
`
