import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import CookingTime from "../../images/clock-regular.svg"
import Servings from "../../images/user-solid.svg"

const PostCard = ({ post }) => {
    const url = `/${post.slug}/`

    return (
        <Link to={url} className="post-card">
            <header className="post-card-header">
                {post.image && post.image[0] ?
                    <div className="post-card-image" style={{
                        backgroundImage: `url(${process.env.GATSBY_FLOTIQ_BASE_URL}/image/260x0/${post.image[0].id}.${post.image[0].extension})` ,
                    }}/> : <div className="post-card-image" />}
                <h2 className="post-card-title">{post.name}</h2>
            </header>
            <section className="post-card-tags">
                <div><img className="post-card-tag-icon" alt="Servings" src={Servings}/> {post.servings}</div>
                <div><img className="post-card-tag-icon" alt="Cooking time" src={CookingTime}/> {post.cookingTime} </div>
            </section>
            <footer className="post-card-footer">
                <div className="post-card-footer-left">
                </div>
                <div className="post-card-footer-right">
                </div>
            </footer>
        </Link>
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.object,
        description: PropTypes.string.isRequired,
    }).isRequired,
}

export default PostCard
