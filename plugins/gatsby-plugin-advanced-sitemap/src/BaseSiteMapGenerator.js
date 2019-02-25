import _ from 'lodash'
import xml from 'xml'
import moment from 'moment'
import path from 'path'

import localUtils from './utils'

// Sitemap specific xml namespace declarations that should not change
const XMLNS_DECLS = {
    _attr: {
        xmlns: `http://www.sitemaps.org/schemas/sitemap/0.9`,
        'xmlns:image': `http://www.google.com/schemas/sitemap-image/1.1`,
    },
}

export default class BaseSiteMapGenerator {
    constructor() {
        this.nodeLookup = {}
        this.nodeTimeLookup = {}
        this.siteMapContent = null
        this.lastModified = 0
    }

    generateXmlFromNodes(options) {
        const self = this
        // Get a mapping of node to timestamp
        const timedNodes = _.map(this.nodeLookup, function (node, id) {
            return {
                id: id,
                // Using negative here to sort newest to oldest
                ts: -(self.nodeTimeLookup[id] || 0),
                node: node,
            }
        }, [])
        // Sort nodes by timestamp
        const sortedNodes = _.sortBy(timedNodes, `ts`)
        // Grab just the nodes
        const urlElements = _.map(sortedNodes, `node`)
        const data = {
            // Concat the elements to the _attr declaration
            urlset: [XMLNS_DECLS].concat(urlElements),
        }

        // Return the xml
        return localUtils.getDeclarations(options) + xml(data)
    }

    addUrl(url, datum) {
        const node = this.createUrlNodeFromDatum(url, datum)

        if (node) {
            this.updateLastModified(datum)
            this.updateLookups(datum, node)
            // force regeneration of xml
            this.siteMapContent = null
        }
    }

    removeUrl(url, datum) {
        this.removeFromLookups(datum)

        // force regeneration of xml
        this.siteMapContent = null
        this.lastModified = Date.now()
    }

    getLastModifiedForDatum(datum) {
        if (datum.updated_at || datum.published_at || datum.created_at) {
            return new Date(datum.updated_at) || new Date(datum.published_at) || new Date(datum.created_at)
        } else {
            return moment(new Date(), moment.ISO_8601).toISOString()
        }
    }

    updateLastModified(datum) {
        const lastModified = this.getLastModifiedForDatum(datum)

        if (!this.lastModified || lastModified > this.lastModified) {
            this.lastModified = lastModified
        }
    }

    createUrlNodeFromDatum(url, datum) {
        let node, imgNode

        node = {
            url: [
                { loc: url },
                { lastmod: moment(this.getLastModifiedForDatum(datum)).toISOString() },
            ],
        }

        imgNode = this.createImageNodeFromDatum(datum)

        if (imgNode) {
            node.url.push(imgNode)
        }

        return node
    }

    createImageNodeFromDatum(datum) {
        // Check for cover first because user has cover but the rest only have image
        const image = datum.cover_image || datum.profile_image || datum.feature_image
        let imageEl

        if (!image) {
            return
        }

        // Create the weird xml node syntax structure that is expected
        imageEl = [
            { 'image:loc': image },
            { 'image:caption': path.basename(image) },
        ]

        // Return the node to be added to the url xml node
        return { 'image:image': imageEl } //eslint-disable-line
    }

    validateImageUrl(imageUrl) {
        return !!imageUrl
    }

    getXml(options) {
        if (this.siteMapContent) {
            return this.siteMapContent
        }

        const content = this.generateXmlFromNodes(options)
        this.siteMapContent = content
        return content
    }

    /**
     * @NOTE
     * The url service currently has no url update event.
     * It removes and adds the url. If the url service extends it's
     * feature set, we can detect if a node has changed.
     */
    updateLookups(datum, node) {
        this.nodeLookup[datum.id] = node
        this.nodeTimeLookup[datum.id] = this.getLastModifiedForDatum(datum)
    }

    removeFromLookups(datum) {
        delete this.nodeLookup[datum.id]
        delete this.nodeTimeLookup[datum.id]
    }

    reset() {
        this.nodeLookup = {}
        this.nodeTimeLookup = {}
        this.siteMapContent = null
    }
}
