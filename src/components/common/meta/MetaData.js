import React from 'react'
import PropTypes from 'prop-types'
import url from 'url'

import config from '../../../utils/siteConfig'
import ArticleMeta from './ArticleMeta'
import WebsiteMeta from './WebsiteMeta'
import AuthorMeta from './AuthorMeta'

const MetaData = ({
    data,
    title,
    description,
    image,
    location,
}) => {
    const canonical = url.resolve(config.siteUrl, location.pathname, `/`)
    const { ghostPost, ghostTag, ghostAuthor, ghostPage } = data

    if (ghostPost) {
        return (
            <ArticleMeta
                data={ghostPost}
                canonical={canonical}
            />
        )
    } else if (ghostTag) {
        return (
            <WebsiteMeta
                data={ghostTag}
                canonical={canonical}
                type="Series"
            />
        )
    } else if (ghostAuthor) {
        return (
            <AuthorMeta
                data={ghostAuthor}
                canonical={canonical}
            />
        )
    } else if (ghostPage) {
        return (
            <WebsiteMeta
                data={ghostPage}
                canonical={canonical}
                type="WebSite"
            />
        )
    } else {
        title = title || config.siteTitleMeta
        description = description || config.siteDescriptionMeta
        image = url.resolve(config.siteUrl, image || config.shareImage)

        return (
            <WebsiteMeta
                data={{}}
                canonical={canonical}
                title={title}
                description={description}
                image={image}
                type="WebSite"
            />
        )
    }
}

MetaData.defaultProps = {
    data: {},
}

MetaData.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.object,
        ghostTag: PropTypes.object,
        ghostAuthor: PropTypes.object,
        ghostPage: PropTypes.object,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
}

export default MetaData
