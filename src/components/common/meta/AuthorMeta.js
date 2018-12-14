import React from 'react'
import Helmet from "react-helmet"
import PropTypes from 'prop-types'

import ImageMeta from './ImageMeta'
import getAuthorProperties from './getAuthorProperties'
import config from '../../../utils/siteConfig'

const AuthorMeta = ({ data, canonical }) => {
    const author = getAuthorProperties(data)
    const shareImage = author.image || config.shareImage
    const title = `${data.name} - ${config.siteTitle}`
    const description = data.bio || config.siteDescriptionMeta || config.siteDescription

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={canonical} />
                <meta property="og:site_name" content={config.siteTitle} />
                <meta property="og:type" content="profile" />
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
                        "@type": "Person,
                        "name": "${data.name}",
                        ${author.sameAsArray ? `"sameAs": ${author.sameAsArray},` : ``}
                        "url": "${canonical}",
                        "image": {
                            "@type": "ImageObject",
                            "url": "${shareImage}",
                            "width": "${config.shareImageWidth}",
                            "height": "${config.shareImageHeight}"
                        },
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": "${config.siteUrl}"
                        },
                        "description": "${data.bio}"
                    }
                `}</script>
            </Helmet>
            <ImageMeta image={shareImage} />
        </>
    )
}

AuthorMeta.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string,
        bio: PropTypes.string,
        profile_image: PropTypes.string,
        website: PropTypes.string,
        twitter: PropTypes.string,
        facebook: PropTypes.string,
    }).isRequired,
    canonical: PropTypes.string.isRequired,
}

export default AuthorMeta
