import React from 'react'
import { withPrefix } from 'gatsby'
import defaultOptions from './defaults'

exports.onRenderBody = ({ setHeadComponents }, pluginOptions) => {
    let { indexOutput, createLinkInHead } = { ...defaultOptions, ...pluginOptions }

    if (!createLinkInHead) {
        return
    }

    if (indexOutput.charAt(0) !== `/`) {
        indexOutput = `/` + indexOutput
    }

    setHeadComponents([
        <link
            key={`gatsby-plugin-advanced-sitemap`}
            rel="sitemap"
            type="application/xml"
            href={withPrefix(indexOutput)}
        />,
    ])
}
