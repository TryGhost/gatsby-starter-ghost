import _ from 'lodash'
import BaseMapGenerator from './BaseSiteMapGenerator'

export default class UserMapGenerator extends BaseMapGenerator {
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
