const _ = require(`lodash`),
    // validator = require(`validator`),
    BaseMapGenerator = require(`./BaseSiteMapGenerator`)

class UserMapGenerator extends BaseMapGenerator {
    constructor(opts) {
        super()

        this.name = `authors`
        _.extend(this, opts)
    }

    validateImageUrl(imageUrl) {
        // && validator.isURL(imageUrl, { protocols: [`http`, `https`], require_protocol: true })
        return imageUrl
    }
}

module.exports = UserMapGenerator
