#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')

const token = process.env.SANITY_API_TOKEN
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

if (!token) {
    console.error('Please set SANITY_API_TOKEN in your environment')
    process.exit(1)
}
if (!projectId) {
    console.error('Please set NEXT_PUBLIC_SANITY_PROJECT_ID in your environment')
    process.exit(1)
}

const dataPath = path.join(process.cwd(), 'data', 'projects.json')
const items = JSON.parse(fs.readFileSync(dataPath, 'utf8'))

async function createDocuments() {
    const url = `https://${projectId}.api.sanity.io/v2021-06-07/data/mutate/${dataset}`

    const mutations = items.map((p) => ({
        create: {
            _type: 'project',
            title: p.title,
            description: p.description,
            tags: p.tags,
            liveUrl: p.liveUrl,
            codeUrl: p.codeUrl
            // Note: images would need to be uploaded via the assets API or referenced by URL
        }
    }))

    const body = JSON.stringify({ mutations })
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body
    })

    const json = await res.json()
    console.log(JSON.stringify(json, null, 2))
}

createDocuments().catch((err) => {
    console.error(err)
    process.exit(1)
})
