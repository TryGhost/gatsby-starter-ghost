import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'

import config from '../../utils/siteConfig'

// Additional styles
import '../../styles/app.css'

const DefaultLayout = ({ children, bodyClass }) => (
    <React.Fragment>

        <Helmet>
            <html lang={config.lang} />
            <body className={bodyClass} />
        </Helmet>

        <header className="site-head">
            <nav className="site-nav container">
                <div>
                    <a href="https://ghost.org">
                        <img src="/assets/ghost-icon.png" />
                    </a>
                    <Link to="/" >Home</Link>
                </div>
                <div>
                    <Link to="/about">About</Link>
                    <Link to="#">Page 2</Link>
                </div>
            </nav>
        </header>

        <main className="site-main">

            {children}

        </main>

        <footer className="site-foot">
            <div className="site-foot-content container">
                <ul>
                    <li><a href="https://forum.ghost.org">Forum</a></li>
                    <li><a href="https://twitter.com/tryghost">@TryGhost</a></li>
                </ul>
            </div>
        </footer>

    </ React.Fragment>
)

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
}

export default DefaultLayout
