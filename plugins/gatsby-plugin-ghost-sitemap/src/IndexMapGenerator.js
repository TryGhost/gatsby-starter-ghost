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

    getXml(options) {
        const urlElements = this.generateSiteMapUrlElements(options)
        const data = {
            // Concat the elements to the _attr declaration
            sitemapindex: [XMLNS_DECLS].concat(urlElements),
        }

        // Return the xml
        return localUtils.getDeclarations(options) + xml(data)
    }

    generateSiteMapUrlElements({ siteUrl, resourcesOutput, mapping }) {
        return _.map(mapping, (resourceType) => {
            const filePath = resourcesOutput.replace(/:resource/, resourceType.name)
            const siteMapUrl = url.resolve(siteUrl, filePath)
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
