const get = require(`lodash/get`)
const converter = require(`@tryghost/html-to-mobiledoc`)

exports.onCreateNode = async (
    { node, actions },
    options
) => {
    const { createNodeField } = actions
    const {
        nodeType,
        htmlPath,
        name = `md`,
    } = options

    if (node.internal.type === nodeType) {
        const html = get(node, htmlPath)
        
        
        const md = JSON.stringify(converter.toMobiledoc(html))
        

        await createNodeField({
            node,
            name: name,
            value: md,
        })
    }
}
