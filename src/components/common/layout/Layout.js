import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from './Header'
import Footer from './Footer'

// Additional styles
import '../../../styles/app.css'

const DefaultLayout = ({ children, bodyClass }) => (
    <React.Fragment>
        <Helmet>
            <html lang="en" />
            <link type="text/css" href="https://cloud.typography.com/6076934/6704592/css/fonts.css" rel="stylesheet" />
            <body className={bodyClass} />
        </Helmet>
        <Header />
        <main>
            {children}
        </main>
        <Footer />
    </ React.Fragment>
)

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
}

export default DefaultLayout
