import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Tags } from '@tryghost/helpers-gatsby'

const PostCard = ({ post }) => {
    const url = `${post.slug}/`

    return (
        <Link to={url} className="post-card">
            <header className="post-card-header">
                {post.feature_image ? 
                    <div className="post-card-image" style={{
                        backgroundImage: `url(${post.feature_image})` ,
                    }}></div> : null}
                {post.tags ? <div className="post-card-tags"> <Tags post={post} visibility="public" autolink={false} /></div> : null}
                {post.featured ? <span>Featured</span> : null}
                <h2 className="post-card-title">{post.title}</h2>
            </header>
            <section className="post-card-excerpt">{post.excerpt}</section>
            <footer className="post-card-footer">
                <div className="post-card-footer-left">
                    {post.primary_author.name}
                </div>
                <div className="post-card-footer-right">
                    {/* Todo: replace with reading time helper */}
                    2 min read
                </div>
            </footer>
        </Link>
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        featured: PropTypes.bool,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
            })
        ),
        excerpt: PropTypes.string.isRequired,
        primary_author: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
}

export default PostCard
