import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Layout, Mobiledoc } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
* Single page (/:slug)
*
* This file renders a single page and loads all the content.
*
*/
const Page = ({ data, location }) => {
    const page = data.ghostPage
    const files = data.allFile.edges

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="website"
            />
            <Layout>
                <div className="container">
                    <article className="content">
                        <h1 className="content-title">{page.title}</h1>

                        {/* The main page content */}
                        <section
                            className="content-body load-external-scripts">
                            <Mobiledoc mobiledoc={page.parsed_mobiledoc.mobiledoc} files={files}/>
                        </section>
                    </article>
                </div>
            </Layout>
        </>
    )
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
        ghostPage(slug: { eq: $slug }) {
            ...GhostPageFields
        }
        allFile {
          edges {
            node {
              id
              publicURL
              childImageSharp {
                id
                fluid(maxWidth: 1000, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                  presentationWidth
                }
              }
            }
          }
        }
    }
`
