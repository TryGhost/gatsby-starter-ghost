import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Prism from 'prismjs'

import { Layout } from '../components/common/layout'
import { MetaData } from '../components/common/meta'

class Page extends React.Component {
    componentDidMount() {
    // TODO: Prism for Webpack currently supports basic languages. `handlebars`,
    // `yaml`, and `json` are not amongst those. To load those languages, you'd
    // need to load them specifically following the webpack instructions here:
    // https://prismjs.com/#examples and https://github.com/mAAdhaTTah/babel-plugin-prismjs
        Prism.highlightAll()
    }

    render() {
        const page = this.props.data.ghostPage

        return (
            <>
                <MetaData
                    data={this.props.data}
                    location={this.props.location}
                    type="website"
                    image={page.feature_image}
                />
                <Layout>
                    <div>
                        <article>
                            <h1>{page.title}</h1>
                            <section
                                className="external-scripts"
                                dangerouslySetInnerHTML={{ __html: page.html }}
                            />
                        </article>
                    </div>
                </Layout>
            </>
        )
    }
}

Page.propTypes = {
    data: PropTypes.shape({
        ghostPage: PropTypes.shape({
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Page

export const postQuery = graphql`
    query($slug: String!) {
        site {
            ...SiteMetaFields
        }
        ghostPage(slug: { eq: $slug }) {
            ...GhostPageFields
        }
    }
`
