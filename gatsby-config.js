// TODO: solve this with siteConfig
require(`dotenv`).config({
    path: `.env.${process.env.NODE_ENV}`,
})

if (!process.env.GHOST_API_URL || !process.env.GHOST_API_KEY) {
    throw new Error(
        `GHOST_API_URL and GHOST_API_KEY are required to build. Check the CONTRIBUTING guide.`
    )
}

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
        {
            resolve: `gatsby-source-ghost`,
            options: {
                apiUrl: `${process.env.GHOST_API_URL}`,
                clientId: `ghost-frontend`,
                clientSecret: `${process.env.GHOST_API_KEY}`,
            },
        },
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
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
                icon: `src/assets/ghost-icon.png`,
            },
        },
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-offline`,
    ],
}
