import React, { useContext } from "react"
import { graphql, Link } from "gatsby"
import classNames from 'classnames'
import Pane, { Box, LineBox, Title, PushD, PushDContext } from '../components/pane'
import { Progress } from '../components/text-ui/progress'

import style from './post.module.scss'

export default function Template({
    data, // this prop will be injected by the GraphQL query below.
}) {
    const { markdownRemark } = data // data.markdownRemark holds our post data
    const { frontmatter, html } = markdownRemark
    const { author, title, date, path } = frontmatter
    console.log(frontmatter)

    const {cd} = useContext(PushDContext)

    const onClick = (from, to) => () => cd(to, from)

    return (
        <div className="blog-post-container">
            <Pane foot={
                <React.Fragment>
                    <Progress label='read' progress={0.8} width={400}/>
                    <PushD current={path}/>
                </React.Fragment>
            }>
                <LineBox className={style.postContainer} heading={
                    <Title author={author} date={date}>{title}</Title>
                }>
                    { frontmatter.draft && <DraftNotice/> }
                    <article
                        className={style.postContent}
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                    <Link onClick={onClick(path, '/')} tabIndex="0" className={style.goBack} to="/">Go back</Link>
                </LineBox>
            </Pane>
        </div>
    )
}

const DraftNotice = () => (
    <Box style={{ margin: '2em', marginLeft: '2em', paddingLeft: '1em' }}>
        <strong>Congratulations, you have found a draft aticle!  This article is incomplete and is here for proofreading and testing.</strong>
    </Box>
)

export const pageQuery = graphql`
    query($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
                date(formatString: "YYYY-MM-DD")
                path
                title
                author
                draft
            }
        }
    }
`
