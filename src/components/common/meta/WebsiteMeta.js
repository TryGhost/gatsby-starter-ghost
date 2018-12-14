import React from 'react'
import Helmet from "react-helmet"
import PropTypes from 'prop-types'
import url from 'url'

import ImageMeta from './ImageMeta'
import config from '../../../utils/siteConfig'

const WebsiteMeta = ({ data, canonical, title, description, image, type }) => {
    const publisherLogo = url.resolve(config.siteUrl, config.siteIcon)
    const shareImage = image || data.feature_image || data.profile_image

    description = description || data.description
    description = description || data.name || data.title

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={canonical} />
                <meta property="og:site_name" content={config.siteTitle} />
                <meta property="og:type" content={type === `Person` ? `profile` : `website`} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={canonical} />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:url" content={canonical} />
                <meta name="twitter:site" content="@tryghost" />
                <script type="application/ld+json">{`
                    {
                        "@context": "https://schema.org/",
                        "@type": ${type},
                        "url": "${canonical}",
                        "image": {
                            "@type": "ImageObject",
                            "url": "${shareImage}",
                            "width": "${config.shareImageWidth}",
                            "height": "${config.shareImageHeight}"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "${config.publisherName}",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "${publisherLogo}",
                                "width": 60,
                                "height": 60
                            }
                        },
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": "${config.siteUrl}"
                        },
                        "description": "${description}"
                    }
                `}</script>
            </Helmet>
            <ImageMeta image={shareImage} />
        </>
    )
}

WebsiteMeta.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.string,
        feature_image: PropTypes.string,
        description: PropTypes.string,
        bio: PropTypes.string,
        profile_image: PropTypes.string,
    }).isRequired,
    canonical: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    type: PropTypes.oneOf([`WebSite`, `Series`, `Person`]).isRequired,
}

export default WebsiteMeta
