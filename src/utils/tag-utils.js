import PropTypes from 'prop-types'
import _ from 'lodash'

export const removeInternalTags = function removeInternalTags(tags) {
    // Get rid of internal tags
    return tags.filter(tag => !tag.name.match(/^#/))
}

removeInternalTags.proptypes = {
    tags: PropTypes.array.isRequired,
}

export const getPrimaryTag = function getPrimaryTag(tags) {
    // If any tags left, use the first tag name and fallback to `General`
    if (!tags.length) {
        return {
            name: `General`,
            slug: `general`,
        }
    } else {
        return tags[0]
    }
}

getPrimaryTag.proptypes = {
    tags: PropTypes.array.isRequired,
}

export const getTagsforPostCollection = function getTagsforPostCollection(posts, linkPrefix) {
    const tags = []
    linkPrefix = /^(?:\/?)([a-zA-Z\d-]*)(?:\/?)/i.exec(linkPrefix)[1]

    _.forEach(posts, ({ node }) => {
        _.map(node.tags, (tag) => {
            tag.link = `/${linkPrefix}/${tag.slug}/`
        })

        tags.push(node.tags)
    })

    // Return an array of tags, which contains no internal tags, no duplicates and is sorted
    // ASC by tag name
    return _.sortedUniqBy(removeInternalTags(_.sortBy(_.flattenDeep(tags), `name`)), `name`)
}

getTagsforPostCollection.proptypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            node: PropTypes.shape({
                tags: PropTypes.arrayOf(
                    PropTypes.shape({
                        name: PropTypes.string.isRequired,
                        slug: PropTypes.string.isRequired,
                    })
                ).isRequired,
            }).isRequired,
        })).isRequired,
    linkPrefix: PropTypes.string.isRequired,
}
