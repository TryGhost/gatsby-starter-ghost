import url from 'url'

const sitemapsUtils = {
    getDeclarations: function ({ siteUrl }) {
        let baseUrl = url.resolve(siteUrl, `/sitemap.xsl`)
        baseUrl = baseUrl.replace(/^(http:|https:)/, ``)
        return `<?xml version="1.0" encoding="UTF-8"?>` +
            `<?xml-stylesheet type="text/xsl" href="` + baseUrl + `"?>`
    },
}

export default sitemapsUtils
