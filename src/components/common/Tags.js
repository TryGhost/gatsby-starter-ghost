import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import tagsHelper from '@tryghost/helpers/tags'

// TODO: this needs to be updated parallel to https://github.com/TryGhost/docs/pull/51 as it's still WIP

/*
* Tags helper
* Returns tags for a post
* Props:
*   - post [required, the post object]
*   - limit [optional, default undefined, limits the number of tags to be returned]
*   - separator [optional, default ", ", sets the separator to concat the tags]
*   - prefix [optional, default "", sets a prefix to appear before the tags]
*   - suffix [optional, default "", sets a suffix to appear after the tags]
*   - classes [optional, default """, classNames used for the html tags]
*   - separatorClasses [optional, default "", classNames used for the html separator tags]
*   - prefixClasses [optional, default "", classNames used for the html prefix tags]
*   - suffixClasses [optional, default "", classNames used for the html suffix tags]
*   - linkClasses [optional, default "", classNames used for the html link tags]
*   - autolink [optional, default true, whether to convert tags to links]
*   - permalink [optional, default "/:slug.", the pattern used for links]
*   - visibility [optional, default "all", the pattern used to control the if internal tags should be included]
*/
const Tags = (props) => {
    let opts = {
        limit: props.limit,
        from: props.from,
        to: props.to,
        fallback: props.fallback,
        visibility: props.visibility,
    }

    if (props.separator) {
        opts.separator = React.isValidElement(props.separator) ? props.separator :
            <><span className={props.separatorClasses}>{props.separator}</span></>
    }

    if (props.prefix) {
        opts.prefix = React.isValidElement(props.prefix) ? props.prefix :
            <><span className={props.prefixClasses}>{props.prefix}</span></>
    }

    if (props.suffix) {
        opts.suffix = React.isValidElement(props.suffix) ? props.suffix :
            <><span className={props.suffixClasses}>{props.suffix}</span></>
    }

    opts.fn = function process(tag) {
        let tagLink = props.permalink
        tagLink = tagLink.replace(/:slug/, tag.slug) || `/${tag.slug}/`

        return props.autolink ?
            <>
                <span className={props.classes} key={tag.slug}>
                    <Link to={tagLink} className={props.linkClasses}>{tag.name}</Link>
                </span>
            </> :
            <><span className={props.classes} key={tag.slug}>{tag.name}</span></>
    }

    return (
        tagsHelper(props.post, opts)
    )
}

Tags.defaultProps = {
    separator: `, `,
    from: 1,
    classes: ``,
    separatorClasses: ``,
    prefixClasses: ``,
    suffixClasses: ``,
    linkClasses: ``,
    permalink: `/:slug/`,
    autolink: true,
}

Tags.propTypes = {
    post: PropTypes.shape({
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                slug: PropTypes.string,
            })
        ).isRequired,
    }).isRequired,
    limit: PropTypes.number,
    from: PropTypes.number,
    to: PropTypes.number,
    fallback: PropTypes.object,
    visibility: PropTypes.oneOf([`public`, `all`, `internal`]),
    permalink: PropTypes.string,
    autolink: PropTypes.bool,
    classes: PropTypes.string,
    separatorClasses: PropTypes.string,
    prefixClasses: PropTypes.string,
    suffixClasses: PropTypes.string,
    linkClasses: PropTypes.string,
}

export default Tags
