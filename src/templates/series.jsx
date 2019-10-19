import React, { useRef } from 'react'
import { Box } from '../components/pane'
import Preview, { Label, SetBg } from '../components/preview'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { graphql } from 'gatsby'

import styles from './series.module.scss'

export default function Template(
  { data: { series, allMarkdownRemark } }
) {
  const { name, description, color } = series
  const pages = allMarkdownRemark.group[0].nodes

  return (<div className={styles.page}>
    <SEO description={description} title={name} />
    <Layout>
      <Box className={styles.postTitle}>
        <Label className={styles.label} color={color}>{name}</Label>
        <br />
        <p>{description}</p>
      </Box>
      {pages.map(({ id, frontmatter }) => <Item key={id} {...frontmatter} />)}
    </Layout>
  </div>)
}

const Item = ({ bg, ...props }) => {
  const item = useRef()
  return <div ref={item} style={{ padding: 0, margin: 0, with: '100%' }}>
    <SetBg item={item} bg={bg} />
    <Preview className={styles.postTitle} {...props} />
  </div>
}

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
  }
}`