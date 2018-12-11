module.exports = {
    siteMetadata: {
        title: `Ghost Gatsby Starter`,
        author: `Ghost`,
        description: `Thoughts, stories and ideas`,
        siteUrl: `https://tryghost.github.io/gatsby-starter-ghost/`,
    },
    pathPrefix: `/gatsby-starter-ghost`,
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/pages`,
                name: `pages`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                //trackingId: `ADD YOUR TRACKING ID HERE`,
            },
        },
        `gatsby-plugin-feed`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Gatsby Starter Ghost`,
                short_name: `TryGhost`,
                start_url: `/`,
                background_color: `#ffffff`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/assets/gatsby-icon.png`,
            },
        },
        `gatsby-plugin-offline`,
        `gatsby-plugin-react-helmet`,
    ],
}
