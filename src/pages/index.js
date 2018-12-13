import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import { Layout } from '../components/common/layout'
import { PostCard } from '../components/common'
import { MetaData } from '../components/common/meta'

const IndexPage = ({ data, location }) => {
    const posts = data.allGhostPost.edges

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="website"
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
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
}

export default IndexPage

export const pageQuery = graphql`
  query GhostPostQuery {
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
