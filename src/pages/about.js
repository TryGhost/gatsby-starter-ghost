import React from 'react'
import PropTypes from 'prop-types'

import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
* About page example
*
* There are two ways of creating pages with Ghost + Gatsby.js:
*
* 1. All pages created in Ghost, will be available as a page with Gatsby.
*    The slug determines the URL for the Gatsby frontend (e. g. slug `contact` will be available under `/contact/`)
*
* 2. All pages in the /src/pages directory will automatically be rendered.
*    The name of the page determines the URL for the Gatsby frontend (e. g. `/src/pages/about.js` will be
*    available under `/about/`)
*
* Important: if the same page URL exists in Ghost and in Gatsby, then the page created via Gatsby will be
* used instead of the page imported from Ghost.
*
*/
const AboutPage = ({ location }) => (
        <>
            <MetaData
                location={location}
                title="About Ghost + Gatsby"
                discription="Meta description for this page"
                image="/images/Ghost-Docs.jpg"
            />
            <Layout>
                <div>
                    <p>About this project...</p>
                </div>
            </Layout>
        </>
)

AboutPage.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
}

export default AboutPage
