const { createNodeField } = require(`gatsby-source-filesystem`)
const get = require(`lodash/get`)
const babel = require(`babel-core`)

exports.onCreateNode = async (
    { node, actions },
    options
) => {
    const { createNodeField } = actions
    const {
        nodeType,
        htmlPath,
        name = `jsx`,
    } = options

    if (node.internal.type === nodeType) {
        const html = get(node, htmlPath)
        
        const jsx = babel.transform(html).code
        //        

        await createNodeField({
            node,
            name: name,
            value: jsx,
        })
    }
}
