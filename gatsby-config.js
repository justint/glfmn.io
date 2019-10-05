module.exports = {
  siteMetadata: {
    title: `glfmn`,
    description: `A tech blog written by Gwen Lofman`,
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
    `gatsby-transformer-remark`,
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
