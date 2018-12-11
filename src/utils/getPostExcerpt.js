import PropTypes from 'prop-types'

export const getPostExcerpt = (post) => {
    if (post.custom_excerpt) {
        return post.custom_excerpt
    }

    if (post.excerpt) {
        return post.excerpt
    }

    if (post.plaintext) {
        return `${post.plaintext.substring(0, 200)}...`
    }

    if (post.body) {
        return `${post.body.body.substring(0, 200)}...`
    }

    return null
}

getPostExcerpt.proptypes = {
    post: PropTypes.shape({
        custom_excerpt: PropTypes.string,
        excerpt: PropTypes.string,
        plaintext: PropTypes.string,
        body: PropTypes.string.isRequired,
    }).isRequired,
}

export default getPostExcerpt
