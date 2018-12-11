import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import { getPostExcerpt } from '../../utils/getPostExcerpt'
import { removeInternalTags } from '../../utils/tag-utils'

const PostCard = ({ post }) => {
    const excerpt = getPostExcerpt(post)
    const tags = removeInternalTags(post.tags)

    return (
        <Link to={post.slug}>
            <div>
                <header>
                    <h2>{post.title}</h2>
                </header>
                {excerpt ? <section>{excerpt}</section> : null}
            </div>
            <footer>
                <div>
                    {post.featured ? <span>Featured</span> : null}
                    {/* TODO: replace with Ghost SDK tag helper */}
                    {tags ? tags.map((tag, i) => <span key={i}>{tag.name}</span>) : null}
                </div>
            </footer>
        </Link>
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        featured: PropTypes.bool,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
            })
        ),
    }).isRequired,
}

export default PostCard
