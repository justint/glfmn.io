import React from 'react'
import Footer from '../components/footer'
import Pane, { Box, LinkBox, Title } from '../components/pane'
import SEO from '../components/seo'
import { Link } from 'gatsby'

import style from './series.module.scss'

export default function Template(
  { data: { series, allMarkdownRemark } }
) {
  const { name, description, color } = series
  console.log('series: ', series)
  const pages = allMarkdownRemark.group[0].nodes
  return (<div className={style.page}>
    <SEO description={description} title={name} />
    <Pane className={style.posts}>
      <div className={style.postTitleContainer}>
        <Box className={style.postTitle}>
          <Label color={color}>{name}</Label>
          <br />
          <p>{description}</p>
        </Box>
      </div>
      <Items items={pages} />
    </Pane>
    <Footer className={style.footer}>
      <Link to='/'>/home/glfmn</Link>
    </Footer>
  </div >)
}

const Label = ({ color, children }) => (
  <header className={style.seriesTitle + ' ' + style[color]}>{children}</header>
)

const Items = ({ items }) => (<ul style={{ listStyleType: 'none' }}>
  {items.map(({ id, frontmatter }) => <Item key={id} {...frontmatter} />)}
</ul>)

const Item = ({ path, title, author, date, summary }) => (
  <li className={style.postTitleContainer}>
    <LinkBox className={style.postTitle} to={path} linkText={`open ${path}.md`}>
      <Title author={author} date={date} excerpt={summary}>
        {title}
      </Title>
    </LinkBox>
  </li>
)

export const pageQuery = graphql`
query groupSeries($series: String!) {
  allMarkdownRemark(
      filter: {frontmatter: {series: {eq: $series}}},
      sort: {fields: frontmatter___date, order: DESC}
  ) {
    group(field: frontmatter___series) {
      nodes {
        frontmatter {
          title
          author
          date
          path
          summary
          draft
        }
        id
      }
    }
  }
  series(name: {eq: $series}) {
    description
    name
    color
  }
}`