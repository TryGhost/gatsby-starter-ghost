import PropTypes from 'prop-types'
import _ from 'lodash'
const tagsHelper = require(`@tryghost/helpers/tags`)

/* getPrimaryTag
* Takes an array of tags (Ghost post) and returns the first tag from
* it. If `fallback` is passed, we return a dummy tag called `General`
*/
export const getPrimaryTag = function getPrimaryTag(tags, fallback) {
    if (!tags.length) {
        if (fallback) {
            return {
                name: `General`,
                slug: `general`,
            }
        } else {
            return []
        }
    } else {
        return tags[0]
    }
}

getPrimaryTag.defaultProps = {
    fallback: false,
}

getPrimaryTag.proptypes = {
    tags: PropTypes.array.isRequired,
    fallback: PropTypes.bool,
}

/* getTagsforPostCollection
* Takes a Ghost post object and a link prefix and returns the used tags
* array for a passed post collection. The tags will not contain internal tags,
* duplicates, and are sorted ascending by name. The tags array can be used to
* programmatically generate a tags cloud or menu.
*/
// TODO: rename linkPrefix to permalink and use with `:slug`?
export const getTagsforPostCollection = function getTagsforPostCollection(posts, linkPrefix) {
    const tags = []
    // remove any added `/`, as we add them later again
    linkPrefix = /^(?:\/?)([a-zA-Z\d-]*)(?:\/?)/i.exec(linkPrefix)[1]

    _.forEach(posts, ({ node }) => {
        _.map(node.tags, (tag) => {
            tag.link = linkPrefix ? `/${linkPrefix}/${tag.slug}/` : `/${tag.slug}/`
        })

        tags.push(node.tags)
    })
    const sortedTags = _.sortBy(_.flattenDeep(tags), `name`)
    return _.sortedUniqBy(tagsHelper({ tags: sortedTags }, { visibility: `public`, fn: tag => tag }), `name`)
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
    linkPrefix: PropTypes.string,
}
