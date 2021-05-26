module.exports = {
  siteMetadata: {
    title: `glfmn`,
    description: `Gwen Lofman's tech blog`,
    author: `@glfmn`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts`,
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [{
          resolve: `gatsby-remark-vscode`,
          options: {
             theme: 'Gruvbox Dark Medium',
             extensions: ['gruvbox']
          }
        }]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-yaml`,
      options: {
        typeName: ({ node }) => node.name,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./content/data/`,
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/context.jsx`),
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `glfmn-io`,
        short_name: `glfmn`,
        start_url: `/`,
        background_color: `#fbf1c7`,
        theme_color: `#282828`,
        display: `minimal-ui`,
        // This path is relative to the root of the site.
        icon: `src/images/icon.png`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline
    // functionality, to learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
