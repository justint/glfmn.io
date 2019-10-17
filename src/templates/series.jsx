import React from 'react'
import SEO from '../components/seo'
import { Link } from 'gatsby'

export default function Template(
    { data: { series, allMarkdownRemark } }
) {
    const { name, description, ...rest } = series
    const pages = allMarkdownRemark.group[0].nodes
    return (<div>
        <SEO description={description} title={name} />
        <h1>{name}</h1>
        <p>{description}</p>
        <Items items={pages} />
        <pre>{JSON.stringify(rest, null, 2)}</pre>
    </div >)
}

const Items = ({ items }) => (<ul>
    {items.map(({ id, frontmatter }) => <Item key={id} {...frontmatter} />)}
</ul>)

const Item = ({ path }) => (<Link to={path}><li>{path}</li></Link>)

export const pageQuery = graphql`
query groupSeries($series: String!) {
  allMarkdownRemark(
      filter: {frontmatter: {series: {eq: $series}}},
      sort: {fields: frontmatter___date, order: DESC}
  ) {
    group(field: frontmatter___series) {
      nodes {
        frontmatter {
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
  }
}`