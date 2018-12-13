import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Layout } from '../components/common/layout'
import { PostCard } from '../components/common'
import { MetaData } from '../components/common/meta'

const Tag = ({ data, location }) => {
    const tag = data.ghostTag
    const posts = data.allGhostPost.edges

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="series"
            />
            <Layout>
                <header>
                    <div>
                        <h1>{tag.name}</h1>
                        <h2>
                            {tag.description ?
                                tag.description :
                                `A collection of posts`
                            }
                        </h2>
                    </div>
                </header>
                <main>
                    <div>
                        {posts.map(({ node }) => (
                            <PostCard key={node.id} post={node} />
                        ))}
                    </div>
                </main>
            </Layout>
        </>
    )
}

Tag.propTypes = {
    data: PropTypes.shape({
        site: PropTypes.shape({
            siteMetadata: PropTypes.shape({
                siteUrl: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
        ghostTag: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string,
        }),
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
}

export default Tag

export const pageQuery = graphql`
    query($slug: String!) {
        ghostTag(slug: { eq: $slug }) {
            ...GhostTagFields
        }
        allGhostPost(
            sort: { order: DESC, fields: [published_at] },
            filter: {tags: {elemMatch: {slug: {eq: $slug}}}}
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
