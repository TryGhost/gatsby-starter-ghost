import _ from 'lodash'
import BaseMapGenerator from './BaseSiteMapGenerator'

export default class TagsMapGenerator extends BaseMapGenerator {
    constructor(opts) {
        super()

        this.name = `tags`
        _.extend(this, opts)
    }
}
