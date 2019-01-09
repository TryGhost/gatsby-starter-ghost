import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Layout, PostCard, Pagination } from '../components/common'
import { MetaData } from '../components/common/meta'
import config from '../utils/siteConfig'

const Author = ({ data, location, pageContext }) => {
    const author = data.ghostAuthor
    const posts = data.allGhostPost.edges

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="profile"
            />
            <Layout>
                <div className="container">
                    <header className="author-header">
                        <div className="author-header-content">
                            <h1>{author.name}</h1>
                            {author.bio ? <p>{author.bio}</p> : null }
                            <div className="author-header-meta">
                                {author.website ? <a className="author-header-item" href={author.website} target="_blank" rel="noopener noreferrer">Website</a> : null}
                                {/* Todo: twitter url helper */}
                                {author.twitter ? <a className="author-header-item" href={author.twitter} target="_blank" rel="noopener noreferrer">Twitter</a> : null}
                                {/* Todo: facebook url helper */}
                                {author.facebook ? <a className="author-header-item" href={author.facebook} target="_blank" rel="noopener noreferrer">Facebook</a> : null}
                            </div>
                        </div>
                        <div className="author-header-image">
                            {author.profile_image ? <img src={author.profile_image} alt={author.name} /> : null}
                        </div>
                    </header>
                    <section className="post-feed">
                        {posts.map(({ node }) => (
                            // The tag below includes the markup for each post - components/common/PostCard.js
                            <PostCard key={node.id} post={node} />
                        ))}
                    </section>
                    <Pagination pageContext={pageContext} />
                </div>
            </Layout>
        </>
    )
}

Author.propTypes = {
    data: PropTypes.shape({
        ghostAuthor: PropTypes.shape({
            name: PropTypes.string.isRequired,
            cover_image: PropTypes.string,
            profile_image: PropTypes.string,
            website: PropTypes.string,
            bio: PropTypes.string,
            location: PropTypes.string,
            facebook: PropTypes.string,
            twitter: PropTypes.string,
        }),
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
}

export default Author

export const pageQuery = graphql`
    query GhostAuthorQuery($slug: String!, $limit: Int!, $skip: Int!) {
        ghostAuthor(slug: { eq: $slug }) {
            ...GhostAuthorFields
        }
        allGhostPost(
            sort: { order: DESC, fields: [published_at] },
            filter: {authors: {elemMatch: {slug: {eq: $slug}}}},
            limit: $limit,
            skip: $skip
        ) {
            edges {
                node {
                ...GhostPostFields
                }
            }
        }
    }
`
