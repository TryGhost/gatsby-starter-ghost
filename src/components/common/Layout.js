import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import { Navigation } from '.'
import config from '../../utils/siteConfig'

// Styles
import '../../styles/app.css'

/**
* Main layout component
*
* The Layout component wraps around each page and tmeplate.
* It also provides the header, footer as well as the main
* styles, and meta data for each page.
*
*/
const DefaultLayout = ({ data, children, bodyClass, isHome }) => {
    const settings = data.allGhostSettings.edges[0].node
    const twitterUrl = settings.twitter ? `https://twitter.com/${settings.twitter.replace(/^@/, ``)}` : null
    const facebookUrl = settings.facebook ? `https://www.facebook.com/${settings.twitter.replace(/^\//, ``)}` : null

    return (
    <>
        <Helmet>
            <html lang={settings.lang} />
            <body className={bodyClass} />
        </Helmet>

        <div className="viewport">

            <div className="viewport-top">
                {/* The main header section on top of the screen */}
                <header className="site-head">
                    <div className="container">
                        <div className="site-mast">
                            <div className="site-mast-left">
                                <Link to="/">
                                    {/* The logoe in the top left corner. When no logo is defined we fall back to
                                    * a logo defined in /images using Gatsby image.
                                    * Further info 👉🏼 https://www.gatsbyjs.org/docs/working-with-images/#optimizing-images-with-gatsby-image
                                    */}
                                    {settings.logo ?
                                        <img className="site-logo" src={settings.logo} alt="logo" />
                                        : <Img fixed={data.file.childImageSharp.fixed} alt="Ghost" />
                                    }
                                </Link>
                            </div>
                            <div className="site-mast-right">
                                {settings.twitter && <a href={twitterUrl} className="site-nav-item" target="_blank" rel="noopener noreferrer">Twitter</a>}
                                {settings.facebook && <a href={facebookUrl} className="site-nav-item" target="_blank" rel="noopener noreferrer">Facebook</a>}
                                <a className="site-nav-item" href={`https://feedly.com/i/subscription/feed/${config.siteUrl}/rss/`} target="_blank" rel="noopener noreferrer">RSS</a>
                            </div>
                        </div>
                        { isHome ?
                            <div className="site-banner">
                                <h1 className="site-banner-title">{settings.title}</h1>
                                <p className="site-banner-desc">{settings.description}</p>
                            </div> :
                            null}
                        <nav className="site-nav">
                            <div className="site-nav-left">
                                {/* The navigation items as setup in Ghost */}
                                <Navigation data={settings.navigation} navClass="site-nav-item" />
                            </div>
                            <div className="site-nav-right">
                                <Link className="site-nav-item" to="/">Subscribe</Link>
                            </div>
                        </nav>
                    </div>
                </header>

                <main className="site-main">
                    {/* All the main content gets inserted here, index.js, post.js */}
                    {children}
                </main>

            </div>

            <div className="viewport-bottom">
                {/* The footer at the very bottom of the screen */}
                <footer className="site-foot">
                    <div className="site-foot-nav container">
                        <div className="site-foot-nav-left">
                    All content © 2019 London &mdash; Published with <a className="site-foot-nav-item" href="https://ghost.org" target="_blank" rel="noopener noreferrer">Ghost</a>
                        </div>
                        <div className="site-foot-nav-right">
                            <Navigation data={settings.navigation} navClass="site-foot-nav-item" />
                        </div>
                    </div>
                </footer>

            </div>
        </div>

    </>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
}

const DefaultLayoutSettingsQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSetttingsFields
                        }
                    }
                }
                file(relativePath: {eq: "ghost-icon.png"}) {
                    childImageSharp {
                        fixed(width: 30, height: 30) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        `}
        render={data => <DefaultLayout data={data} {...props} />}
    />
)

export default DefaultLayoutSettingsQuery
