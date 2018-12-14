import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from '../components/common/layout'
import { MetaData } from '../components/common/meta'

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
