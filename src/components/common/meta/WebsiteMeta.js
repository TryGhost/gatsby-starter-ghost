import React from 'react'
import Helmet from "react-helmet"
import PropTypes from 'prop-types'
import url from 'url'

import ImageMeta from './ImageMeta'
import config from '../../../utils/siteConfig'

const WebsiteMeta = ({ data, canonical, title, description, image, type }) => {
    const publisherLogo = url.resolve(config.siteUrl, config.siteIcon)

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={canonical} />
                <meta property="og:site_name" content={config.siteTitle} />
                <meta property="og:type" content="website" />
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
                        "@type": ${type && type === `series` ? `"Series"` : `"WebSite"`},
                        "url": "${canonical}",
                        "image": {
                            "@type": "ImageObject",
                            "url": "${image}",
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
            <ImageMeta image={image} />
        </>
    )
}

WebsiteMeta.propTypes = {
    data: PropTypes.shape({
        ghostTag: PropTypes.object,
        ghostAuthor: PropTypes.object,
        ghostPage: PropTypes.object,
    }).isRequired,
    canonical: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    type: PropTypes.oneOf([`website`, `series`, `profile`]).isRequired,
}

export default WebsiteMeta
