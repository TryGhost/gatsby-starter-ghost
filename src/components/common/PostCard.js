import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import { getPostExcerpt } from '../../utils/getPostExcerpt'
import { removeInternalTags } from '../../utils/tag-utils'

const PostCard = ({ post }) => {
    const excerpt = getPostExcerpt(post)
    const tags = removeInternalTags(post.tags)

    return (
        <Link to={post.slug} className="post-card">
            <header className="post-card-header">
                {tags ? <div className="post-card-tags"> {tags.map((tag, i) => <span key={i}>{tag.name}</span>)} </div> : null}
                {post.featured ? <span>Featured</span> : null}
                <h2 className="post-card-title">{post.title}</h2>
            </header>
            {excerpt ? <section className="post-card-excerpt">{excerpt}</section> : null}
            <footer className="post-card-footer">
                <div className="post-card-footer-left">
                    {post.primary_author.name}
                </div>
                <div className="post-card-footer-right">
                    2 min read
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
