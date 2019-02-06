const get = require(`lodash/get`)
const converter = require(`@tryghost/html-to-mobiledoc`)
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node,
    actions,
    createContentDigest,
    store,
    cache,
    createNodeId }, options) => {
    const { createNode } = actions
    const {
        nodeType,
        htmlPath,
        name = `parsed_mobiledoc`,
    } = options

    if (node.internal.type === nodeType) {
        const mobiledoc = converter.toMobiledoc(get(node, htmlPath))
        const fieldData = JSON.stringify(mobiledoc)
        const nodeContent = {
            // Data for the node.
            mobiledoc: fieldData,
            // Required fields.
            id: node.id + `_mobiledoc`,
            parent: node.id, // or null if it's a source node without a parent
            children: [],
            internal: {
                type: `mobiledocGhostContent`,
                contentDigest: createContentDigest(fieldData),
            },

        }

        const nodeWithImages = downloadAllImages(nodeContent, store, cache, createNode, createNodeId)
        createNode(nodeWithImages)

        // Adds a field `localImage` or custom name to the node
        // ___NODE appendix tells Gatsby that this field will link to another node
        node[`${name}___NODE`] = node.id + `_mobiledoc`
    }
}

function downloadAllImages(nodeContent, store, cache, createNode, createNodeId){
    const _nodeContent = nodeContent
    const mobiledoc = JSON.parse(_nodeContent.mobiledoc)

    const mapProm = mobiledoc.cards.map(async (card) => {
        if (card[0] === `image`){
            await createRemoteFileNode({
                url: card[1].src,
                store,
                cache,
                createNode,
                createNodeId,
            }).then((fileNode) => {
                card[1].imageNode = fileNode.id
                
            })
        }
        return card
    })

    Promise.all(mapProm).then(() => {
        _nodeContent.mobiledoc = JSON.stringify(mobiledoc)
    })
    
    return _nodeContent
}
