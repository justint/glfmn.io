import React, { useState, useEffect, useRef, useContext } from "react"
import { graphql, Link } from "gatsby"
import classNames from 'classnames'
import Pane, { Box, LineBox, Title, PushD, PushDContext } from '../components/pane'
import { Progress } from '../components/text-ui/progress'
import { ResizeProvider } from '../resize'

import style from './post.module.scss'

export default function Template({
    data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  const { author, title, date, path } = frontmatter

  const {cd} = useContext(PushDContext)
  const onClick = (from, to) => () => cd(to, from)

  // Set the element we will track for resizing
  const resize = useRef(null)

  const contentHeight = window.innerHeight
                    || document.documentElement.clientHeight
                    || document.body.clientHeight
                    || 300
  const scrollHeight =  document? document.body.scrollHeight : 0
  const height = scrollHeight > 0? scrollHeight - contentHeight : contentHeight

  const [scroll, setScroll] = useState(0)
  const [timer, setTimer] = useState(null)
  useEffect(() => {
    function onChange() {
      clearTimeout(timer)
      setTimer(setTimeout(() => {
        setScroll(window.pageYOffset)
      }, 20))
    }
    window.addEventListener('scroll', onChange)
    return () => window.removeEventListener('scroll', onChange)
  })

  return (
    <div className="blog-post-container">
      <ResizeProvider track={resize}>
        <Pane ref={resize} foot={
          <React.Fragment>
            <Progress label='read' progress={Math.max(0, scroll/height)} width={400}/>
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
      </ResizeProvider>
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
