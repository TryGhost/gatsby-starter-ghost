const sitemapsUtils = {
    // TODO: serve file from static folder -> copy?
    getDeclarations: function () {
        var baseUrl = `http://localhost:9000/sitemap.xsl`
        baseUrl = baseUrl.replace(/^(http:|https:)/, ``)
        return `<?xml version="1.0" encoding="UTF-8"?>` +
            `<?xml-stylesheet type="text/xsl" href="` + baseUrl + `"?>`
    },
}

export default sitemapsUtils
