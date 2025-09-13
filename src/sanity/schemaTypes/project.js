const { defineField, defineType } = require('sanity')

exports.projectType = defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'description', type: 'text' }),
        defineField({ name: 'image', type: 'image' }),
        defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }] }),
        defineField({ name: 'liveUrl', type: 'url' }),
        defineField({ name: 'codeUrl', type: 'url' }),
    ],
})
