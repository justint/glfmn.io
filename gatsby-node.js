const path = require(`path`)

exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions
    const postTemplate = path.resolve(`src/templates/post.jsx`)
    const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }`)
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
        path: node.frontmatter.path,
        component: postTemplate,
        context: {},
    })
  })

  const seriesTemplate = path.resolve(`src/templates/series.jsx`)
  const series = await graphql(`{
    allMarkdownRemark(
      sort: {fields: frontmatter___date, order: DESC}
    ) {
      group(field: frontmatter___series) {
        fieldValue
      }
    }
  }`)
  if (series.errors) {
    reporter.panicOnBuild(`Error while querying for series`)
    return
  }
  series.data.allMarkdownRemark.group.forEach(async ({fieldValue}) => {
    createPage({
      path: `/s/${fieldValue}`,
      component: seriesTemplate,
      context: {
        series: fieldValue,
      }
    })
  })
}