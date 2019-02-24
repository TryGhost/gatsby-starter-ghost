import _ from 'lodash'
import xml from 'xml'
import moment from 'moment'
import url from 'url'
import localUtils from './utils'

const XMLNS_DECLS = {
    _attr: {
        xmlns: `http://www.sitemaps.org/schemas/sitemap/0.9`,
    },
}

export default class SiteMapIndexGenerator {
    constructor(options) {
        options = options || {}
        this.types = options.types
    }

    getXml(siteUrl) {
        const urlElements = this.generateSiteMapUrlElements(siteUrl),
            data = {
                // Concat the elements to the _attr declaration
                sitemapindex: [XMLNS_DECLS].concat(urlElements),
            }

        // Return the xml
        return localUtils.getDeclarations(siteUrl) + xml(data)
    }

    generateSiteMapUrlElements(siteUrl) {
        return _.map(this.types, (resourceType) => {
            const siteMapUrl = url.resolve(siteUrl, `sitemap-${resourceType.name}.xml`)
            const lastModified = resourceType.lastModified || moment(new Date(), moment.ISO_8601).toISOString()

            return {
                sitemap: [
                    { loc: siteMapUrl },
                    { lastmod: moment(lastModified).toISOString() },
                ],
            }
        })
    }
}
