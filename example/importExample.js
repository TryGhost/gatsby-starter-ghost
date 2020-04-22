const dotenv = require(`dotenv`)
dotenv.config()
const fetch = require(`node-fetch`)
const assert = require(`assert`).strict
const path = require(`path`)
const fs = require(`fs`)
const FormData = require(`form-data`)

let headers = {
    accept: `application/json`,
}
let apiUrl

const directoryImagePath = path.join(__dirname, `images`)
const directoryPath = path.join(__dirname, ``)

exports.importExamples = async () => {
    apiUrl = process.env.GATSBY_FLOTIQ_BASE_URL
    assert.ok(apiUrl,`You must specify API url (in most cases it is "https://api.flotiq.com")`)
    headers[`X-AUTH-TOKEN`] = process.env.FLOTIQ_API_KEY
    assert.ok(process.env.FLOTIQ_API_KEY,`You must specify API token, preferably Read and write Application API key (if you don't know what it is check: https://flotiq.com/docs/API/)`)

    let contentTypeDefinitionResponse = await fetch(apiUrl + `/api/v1/internal/contenttype/recipe`, { headers: headers })
    let imageToReplace = []
    let imageForReplacing = []

    if (!contentTypeDefinitionResponse.ok) {
        if (contentTypeDefinitionResponse.status === 404) {
            let contentDefinition = require(directoryPath + `/contentDefinition.json`)
            let res = await fetch(apiUrl + `/api/v1/internal/contenttype`, {
                method: `POST`,
                body: JSON.stringify(contentDefinition),
                headers: { ...headers, 'Content-Type': `application/json` },
            })
            if (res.status === 403) {
                assert.ok(false, `Please provide correct API key (Read and write Application API key)`)
            }
        } else if (contentTypeDefinitionResponse.status === 403) {
            assert.ok(false, `Please provide correct API key (Read and write Application API key)`)
        }
    }

    let files = fs.readdirSync(directoryImagePath)
    await Promise.all(files.map(async function (file) {
        imageToReplace.push(file.replace(`.jpg`, ``))
        let image = await fetch(apiUrl + `/api/v1/content/_media?filters={"fileName":{"filter":"` + file + `","type":"contains"}}`, { headers: headers })
        if (image.ok) {
            image = await image.json()
            if (image.count) {
                imageForReplacing.push(image.data[0].id)
            } else {
                const form = new FormData()
                form.append(`file`, fs.createReadStream(directoryImagePath + `/` + file), file)
                form.append(`type`, `image`)
                let json = await fetch(apiUrl + `/api/media`, {
                    method: `POST`,
                    body: form,
                    headers: headers,
                }).then(res => res.json())
                let res = await fetch(apiUrl + `/api/v1/content/_media`, {
                    method: `POST`,
                    body: JSON.stringify(json),
                    headers: { ...headers, 'Content-Type': `application/json` },
                })
                if (res.status === 403) {
                    assert.ok(false, `Please provide correct API key (Read and write Application API key)`)
                }
                imageForReplacing.push(json.id)
            }
        } else {
            if (image.status === 403) {
                assert.ok(false, `Please provide correct API key (Read and write Application API key)`)
            }
        }
    }))
    files = fs.readdirSync(directoryPath)
    await Promise.all(files.map(async function (file) {
        if (file.indexOf(`contentObject`) === 0) {
            let contentObject = require(directoryPath + `/` + file)
            let id = contentObject.id
            let res = await fetch(apiUrl + `/api/v1/content/recipe/` + id, { method: `HEAD`, headers: headers })
            let method = `POST`
            let url = apiUrl + `/api/v1/content/recipe`
            if (res.status === 403) {
                assert.ok(false, `Please provide correct API key (Read and write Application API key)`)
            }
            if (res.ok) {
                method = `PUT`
                url += `/` + id
            }
            contentObject = JSON.stringify(contentObject)
            imageToReplace.forEach((image, index) => {
                contentObject = contentObject.replace(image, imageForReplacing[index])
            })
            res = await fetch(url, {
                method: method,
                body: contentObject,
                headers: { ...headers, 'Content-Type': `application/json` },
            })
            if (res.status === 403) {
                assert.ok(false, `Please provide correct API key (Read and write Application API key)`)
            }
        }
    }))
}

exports.importExamples()
