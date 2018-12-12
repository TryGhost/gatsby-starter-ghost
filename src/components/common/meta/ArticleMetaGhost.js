import React from 'react'
import Helmet from "react-helmet"
import PropTypes from 'prop-types'
import _ from 'lodash'

import getPostExcerpt from '../../../utils/getPostExcerpt'
import { removeInternalTags, getPrimaryTag } from '../../../utils/tag-utils'
import getAuthorProperties from './getAuthorProperties'
import ImageMeta from './ImageMeta'

// TODO: add publisher info back?

const ArticleMetaGhost = ({ data, canonical }) => {
    const { ghostPost } = data
    const { siteMetadata } = data.site

    const excerpt = getPostExcerpt(ghostPost)
    const author = getAuthorProperties(ghostPost.primary_author)
    const publicTags = _.map(removeInternalTags(ghostPost.tags), `name`)
    const primaryTag = getPrimaryTag(publicTags)
    const seoImage = ghostPost.feature_image ? ghostPost.feature_image : `../../../assets/ghost-icon.png` // TODO: set fallback image in config

    return (
        <>
            <Helmet>
                <title>{ghostPost.meta_title || ghostPost.title}</title>
                <meta name="description" content={ghostPost.meta_description || excerpt} />
                <link rel="canonical" href={canonical} />

                <meta property="og:site_name" content={siteMetadata.title} />
                <meta name="og:type" content="article" />
                <meta name="og:title"
                    content={
                        ghostPost.og_title ||
                        ghostPost.meta_title ||
                        ghostPost.title
                    }
                />
                <meta name="og:description"
                    content={
                        ghostPost.og_description ||
                        excerpt ||
                        ghostPost.meta_description
                    }
                />
                <meta property="og:url" content={canonical} />
                <meta property="article:published_time" content={ghostPost.published_at} />
                <meta property="article:modified_time" content={ghostPost.updated_at} />
                {publicTags.map((keyword, i) => (<meta property="article:tag" content={keyword} key={i} />))}
                <meta property="article:author" content="https://www.facebook.com/ghost/" />

                <meta name="twitter:title"
                    content={
                        ghostPost.twitter_title ||
                        ghostPost.meta_title ||
                        ghostPost.title
                    }
                />
                <meta name="twitter:description"
                    content={
                        ghostPost.twitter_description ||
                        excerpt ||
                        ghostPost.meta_description
                    }
                />
                <meta name="twitter:url" content={canonical} />
                <meta name="twitter:label1" content="Written by" />
                <meta name="twitter:data1" content={author.name} />
                {primaryTag ? <meta name="twitter:label2" content="Filed under" /> : null}
                {primaryTag ? <meta name="twitter:data2" content={primaryTag} /> : null}
                {/* TODO: get sites twitter handle */}
                <meta name="twitter:site" content="@tryghost" />
                <meta name="twitter:creator" content="@tryghost" />
                <script type="application/ld+json">{`
                    {
                        "@context": "https://schema.org/",
                        "@type": "Article",
                        "author": {
                            "@type": "Person",
                            "name": "${author.name}",
                            ${author.image ? author.sameAsArray ? `"image": "${author.image}",` : `"image": "${author.image}"` : ``}
                            ${author.sameAsArray ? `"sameAs": ${author.sameAsArray}` : ``}
                        },
                        ${publicTags.length ? `"keywords": "${_.join(publicTags, `, `)}",` : ``}
                        "headline": "${ghostPost.meta_title || ghostPost.title}",
                        "url": "${canonical}",
                        "datePublished": "${ghostPost.published_at}",
                        "dateModified": "${ghostPost.updated_at}",
                        "image": {
                            "@type": "ImageObject",
                            "url": "${seoImage}",
                            "width": 1000,
                            "height": 563
                        },
                        "description": "${ghostPost.meta_description || excerpt}",
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": "${siteMetadata.siteUrl}"
                        }
                    }
                `}</script>
            </Helmet>
            <ImageMeta image={seoImage} />
        </>
    )
}

ArticleMetaGhost.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            title: PropTypes.string.isRequired,
            published_at: PropTypes.string.isRequired,
            updated_at: PropTypes.string.isRequired,
            meta_title: PropTypes.string,
            meta_description: PropTypes.string,
            primary_author: PropTypes.object.isRequired,
            feature_image: PropTypes.string,
            tags: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string,
                    slug: PropTypes.string,
                    visibility: PropTypes.string,
                })
            ),
            primaryTag: PropTypes.shape({
                name: PropTypes.string,
            }),
            og_title: PropTypes.string,
            og_description: PropTypes.string,
            twitter_title: PropTypes.string,
            twitter_description: PropTypes.string,
        }).isRequired,
        site: PropTypes.shape({
            siteMetadata: PropTypes.shape({
                siteUrl: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
    }).isRequired,
    canonical: PropTypes.string.isRequired,
}

export default ArticleMetaGhost
