import React, { useState } from 'react'
import { Box } from '../components/pane'
import Preview, { Label, PostBg } from '../components/preview'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { graphql } from 'gatsby'

import styles from './series.module.scss'

export default function Template({ data: { series, allMarkdownRemark } }) {
  const { name, description } = series
  const pages = allMarkdownRemark.group[0].nodes

  const [bg, setBg] = useState(null)

  return (<div className={styles.page}>
    <SEO description={description} title={name} />
    <Layout bg={<PostBg bg={bg} />}>
      <Description onVisible={() => setBg(series.bg)} {...series} />
      {pages.map(({ id, frontmatter: f }) =>
        <Preview
          key={id}
          onVisible={() => { setBg(f.bg) }}
          className={styles.postTitle}
          {...f}
        />
      )}
    </Layout>
  </div>)
}

const Description = ({ name, onVisible, description, color }) => (
  <Box onVisible={onVisible} className={styles.postTitle}>
    <Label className={styles.label} color={color}>{name}</Label>
    <br />
    <p>{description}</p>
  </Box>
)

export const pageQuery = graphql`
query groupSeries($series: String!) {
  allMarkdownRemark(
      filter: {frontmatter: {series: {eq: $series}}},
      sort: {fields: frontmatter___date, order: ASC}
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
          bg
        }
        id
      }
    }
  }
  series(name: {eq: $series}) {
    description
    name
    color
    bg
  }
}`