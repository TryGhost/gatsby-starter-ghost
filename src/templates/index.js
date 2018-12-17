import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import { Layout, PostCard, Pagination } from '../components/common'
import { MetaData } from '../components/common/meta'

const IndexPage = ({ data, location, pageContext }) => {
    const posts = data.allGhostPost.edges

    return (
        <>
            <MetaData location={location} />
            <Layout>
                <div className="container">
                    <Img fixed={data.file.childImageSharp.fixed} alt="Ghost" />
                    <section>
                        {posts.map(({ node }) => (
                            <PostCard key={node.id} post={node} />
                        ))}
                    </section>
                </div>
                <Pagination pageContext={pageContext} />
            </Layout>
        </>
    )
}

IndexPage.propTypes = {
    data: PropTypes.shape({
        allGhostPost: PropTypes.object.isRequired,
        file: PropTypes.shape({
            childImageSharp: PropTypes.object.isRequired,
        }).isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
}

export default IndexPage

export const pageQuery = graphql`
  query GhostPostQuery($limit: Int!, $skip: Int!) {
    file(relativePath: {eq: "ghost-icon.png"}) {
        childImageSharp {
            fixed(width: 30, height: 30) {
                ...GatsbyImageSharpFixed
            }
        }
    }
    allGhostPost(
        sort: { order: DESC, fields: [published_at] },
        limit: $limit,
        skip: $skip,
        filter: { slug: {ne: "data-schema"}}
    ) {
      edges {
        node {
          ...GhostPostListFields
        }
      }
    }
  }
`
