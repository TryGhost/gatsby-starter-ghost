import _ from 'lodash'
import xml from 'xml'
import moment from 'moment'
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

    getXml() {
        const urlElements = this.generateSiteMapUrlElements(),
            data = {
                // Concat the elements to the _attr declaration
                sitemapindex: [XMLNS_DECLS].concat(urlElements),
            }

        // Return the xml
        return localUtils.getDeclarations() + xml(data)
    }

    generateSiteMapUrlElements() {
        return _.map(this.types, (resourceType) => {
            const url = `http://localhost:9000/sitemap-${resourceType.name}.xml`
            const lastModified = resourceType.lastModified

            return {
                sitemap: [
                    { loc: url },
                    { lastmod: moment(lastModified).toISOString() },
                ],
            }
        })
    }
}
