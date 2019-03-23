module.exports = {
  siteMetadata: {
    title: `Gatsby Typescript Starter`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     path: `${__dirname}/src/pages`,
    //     name: "pages"
    //   }
    // },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: []
      }
    }
  ]
};
