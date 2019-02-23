const _ = require(`lodash`),
    BaseMapGenerator = require(`./BaseSiteMapGenerator`)

class TagsMapGenerator extends BaseMapGenerator {
    constructor(opts) {
        super()

        this.name = `tags`
        _.extend(this, opts)
    }
}

module.exports = TagsMapGenerator
