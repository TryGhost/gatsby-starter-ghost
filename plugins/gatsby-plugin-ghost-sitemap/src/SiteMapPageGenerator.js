import _ from 'lodash'
import BaseSiteMapGenerator from './BaseSiteMapGenerator'

export default class SiteMapPageGenerator extends BaseSiteMapGenerator {
    constructor(opts) {
        super()

        this.name = `pages`

        _.extend(this, opts)
    }
}
