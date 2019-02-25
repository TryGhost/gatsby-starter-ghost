import _ from 'lodash'
import BaseMapGenerator from './BaseSiteMapGenerator'

export default class PostMapGenerator extends BaseMapGenerator {
    constructor(opts) {
        super()

        this.name = `posts`

        _.extend(this, opts)
    }
}
