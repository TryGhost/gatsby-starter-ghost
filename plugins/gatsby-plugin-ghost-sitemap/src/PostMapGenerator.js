const _ = require(`lodash`),
    BaseMapGenerator = require(`./BaseSiteMapGenerator`)

class PostMapGenerator extends BaseMapGenerator {
    constructor(opts) {
        super()

        this.name = `posts`

        _.extend(this, opts)
    }
}

module.exports = PostMapGenerator
