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
            colorTheme: 'Gruvbox Dark (Medium)',
            extensions: [
              {
                identifier: 'tomphilbin.gruvbox-themes',
                version: '1.0.0'
              },
              {
                identifier: 'bmalehorn.vscode-fish',
                version: '1.0.9'
              },
              {
                identifier: 'ms-vscode.PowerShell',
                version: '2019.9.0'
              }
            ]
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
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
