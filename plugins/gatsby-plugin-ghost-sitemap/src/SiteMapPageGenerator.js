const _ = require(`lodash`)
const BaseSiteMapGenerator = require(`./BaseSiteMapGenerator`)

class SiteMapPageGenerator extends BaseSiteMapGenerator {
    constructor(opts) {
        super()

        this.name = `pages`

        _.extend(this, opts)
    }
}

module.exports = SiteMapPageGenerator
