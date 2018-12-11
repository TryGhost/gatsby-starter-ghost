import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Layout } from '../components/common/layout'
import { PostCard } from '../components/common'
// import { MetaData } from '../components/common/meta'

const IndexPage = ({ data, location }) => {
    // Add meta title and description for this page here to overwrite the site meta data as set in the config
    const title = ``
    const description = ``

    const posts = data.allGhostPost.edges

    return (
        <>
            {/* <MetaData
                data={data}
                location={location}
                type="website"
                title={title || data.site.siteMetadata.title}
                description={description || data.site.siteMetadata.description}
            /> */}
            <Layout>
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
