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
                <header>
                    <div>
                        {author.profile_image ? <img src={author.profile_image} alt={author.name} /> : null}
                        <h1>{author.name}</h1>
                        {author.bio ? <h2>{author.bio}</h2> : null}
                        <div>
                            {author.location ? <div>{author.location} <span>&bull;</span></div> : null}
                            {author.website ? <a href={author.website} target="_blank" rel="noopener noreferrer">Website</a> : null}
                            {/* Todo: twitter url helper */}
                            {author.twitter ? <a href={author.twitter} target="_blank" rel="noopener noreferrer">Website</a> : null}
                            {/* Todo: facebook url helper */}
                            {author.facebook ? <a href={author.facebook} target="_blank" rel="noopener noreferrer">Website</a> : null}
                            <a href={`https://feedly.com/i/subscription/feed/${config.siteUrl}/author/${author.slug}/rss/`} target="_blank" rel="noopener noreferrer">RSS</a>
                        </div>
                    </div>
                </header>
                <main>
                    <div>
                        {posts.map(({ node }) => (
                            <PostCard key={node.id} post={node} />
                        ))}
                    </div>
                    <Pagination pageContext={pageContext} />
                </main>
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
