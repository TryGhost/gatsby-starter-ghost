import React from 'react'
import PropTypes from 'prop-types'
import url from 'url'

import config from '../../../utils/siteConfig'
import ArticleMeta from './ArticleMeta'
import WebsiteMeta from './WebsiteMeta'

const MetaData = ({
    data,
    type,
    title,
    description,
    image,
    location,
}) => {
    const canonical = url.resolve(config.siteUrl, location.pathname, `/`)

    if (type === `article`) {
        return (
            <ArticleMeta
                data={data}
                canonical={canonical}
            />
        )
    } else if (type === `website` || type === `series` || type === `profile`) { // TODO add profile/author meta data
        return (
            <WebsiteMeta
                data={data}
                canonical={canonical}
                title={title}
                description={description}
                image={image}
                type={type}
            />
        )
    }

    return null
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
    type: PropTypes.oneOf([`website`, `series`, `article`, `profile`]).isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
}

export default MetaData
