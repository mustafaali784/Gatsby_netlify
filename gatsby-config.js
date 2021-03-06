module.exports = {
  siteMetadata: {
    title: `WP - Gatsby`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-source-wordpress",
      options: {
        baseUrl: "pwa.siplsolutions.com/wp",
        protocol: "https",
        hostingWPCOM: false,
        useACF: true,
        verboseOutput: false,
        includedRoutes: [

          "**/*/*/service",
          "**/*/*/pages",
          "**/*/*/gallery",
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/src/pages`,
      },
    },

    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `WP-App`,
    //     short_name: `WP`,
    //     start_url: `/`,
    //     background_color: `#663399`,
    //     theme_color: `#663399`,
    //     display: `standalone`,
    //     icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
    //   },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
