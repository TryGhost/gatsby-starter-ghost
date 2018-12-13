import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import { Layout } from '../components/common/layout'
import { PostCard } from '../components/common'
import { MetaData } from '../components/common/meta'

const IndexPage = ({ data, location }) => {
    // Add meta title, description, and image for this page here to overwrite the site meta data as set in the config
    const title = ``
    const description = ``
    const image = ``

    const posts = data.allGhostPost.edges

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="website"
                title={title || data.site.siteMetadata.title}
                description={description || data.site.siteMetadata.description}
                image={image}
            />
            <Layout>
                <Img fixed={data.file.childImageSharp.fixed} alt="Ghost" />
                <div>
                    <section>
                        {posts.map(({ node }) => (
                            <PostCard key={node.id} post={node} />
                        ))}
                    </section>
                </div>
            </Layout>
        </>
    )
}

IndexPage.propTypes = {
    data: PropTypes.shape({
        site: PropTypes.shape({
            siteMetadata: PropTypes.shape({
                siteUrl: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
}

export default IndexPage

export const pageQuery = graphql`
  query GhostPostQuery {
    site {
        ...SiteMetaFields
    }
    file(relativePath: {eq: "ghost-icon.png"}) {
        childImageSharp {
            fixed(width: 30, height: 30) {
                ...GatsbyImageSharpFixed
            }
        }
    }
    allGhostPost(
        sort: { order: DESC, fields: [published_at] },
        limit: 50,
    ) {
      edges {
        node {
          ...GhostPostListFields
        }
      }
    }
  }
`
