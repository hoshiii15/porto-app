const Project = require('../models/Project')

exports.listProjects = async (req, res) => {
    const projects = await Project.find().sort({ createdAt: -1 })
    res.json(projects)
}

exports.getProject = async (req, res) => {
    const p = await Project.findById(req.params.id)
    if (!p) return res.status(404).json({ message: 'Not found' })
    res.json(p)
}

exports.createProject = async (req, res) => {
    try {
        const data = req.body || {}

        // Handle tags - check if they come as array fields (tags[0], tags[1], etc.)
        const tags = [];
        Object.keys(data).forEach(key => {
            if (key.startsWith('tags[') && key.endsWith(']')) {
                tags.push(data[key]);
                delete data[key]; // Remove the individual tag fields
            }
        });

        if (tags.length > 0) {
            data.tags = tags.filter(tag => tag && tag.trim());
        } else if (data.tags) {
            // Fallback for old JSON format or direct array
            if (typeof data.tags === 'string') {
                try {
                    // Try to parse as JSON first
                    let parsed = JSON.parse(data.tags)

                    // If it's still a string after parsing, try parsing again (double encoded)
                    if (typeof parsed === 'string') {
                        parsed = JSON.parse(parsed)
                    }

                    // If it's an array, use it directly
                    if (Array.isArray(parsed)) {
                        data.tags = parsed.filter(tag => tag && tag.trim())
                    } else if (typeof parsed === 'string') {
                        // If still string, split by comma
                        data.tags = parsed.split(',').map(tag => tag.trim()).filter(tag => tag)
                    }
                } catch (error) {
                    // If all parsing fails, split by comma as fallback
                    data.tags = data.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
                }
            } else if (Array.isArray(data.tags)) {
                // If it's already an array, clean it up
                data.tags = data.tags.filter(tag => tag && tag.trim())
            }
        }

        if (req.file) {
            // Check if file exists before setting imageUrl
            const fs = require('fs')
            if (fs.existsSync(req.file.path)) {
                data.imageUrl = `/uploads/${req.file.filename}`
            } else {
                console.warn('Uploaded file not found:', req.file.path)
            }
        }
        
        const project = new Project(data)
        await project.save()
        res.json(project)
    } catch (error) {
        console.error('Error creating project:', error)
        res.status(500).json({ message: 'Failed to create project', error: error.message })
    }
}

exports.updateProject = async (req, res) => {
    try {
        const p = await Project.findById(req.params.id)
        if (!p) return res.status(404).json({ message: 'Not found' })

        const data = req.body || {}

        // Handle tags - check if they come as array fields (tags[0], tags[1], etc.)
        const tags = [];
        Object.keys(data).forEach(key => {
            if (key.startsWith('tags[') && key.endsWith(']')) {
                tags.push(data[key]);
                delete data[key]; // Remove the individual tag fields
            }
        });

        if (tags.length > 0) {
            data.tags = tags.filter(tag => tag && tag.trim());
        } else if (data.tags) {
            // Fallback for old JSON format or direct array
            if (typeof data.tags === 'string') {
                try {
                    // Try to parse as JSON first
                    let parsed = JSON.parse(data.tags)

                    // If it's still a string after parsing, try parsing again (double encoded)
                    if (typeof parsed === 'string') {
                        parsed = JSON.parse(parsed)
                    }

                    // If it's an array, use it directly
                    if (Array.isArray(parsed)) {
                        data.tags = parsed.filter(tag => tag && tag.trim())
                    } else if (typeof parsed === 'string') {
                        // If still string, split by comma
                        data.tags = parsed.split(',').map(tag => tag.trim()).filter(tag => tag)
                    }
                } catch (error) {
                    // If all parsing fails, split by comma as fallback
                    data.tags = data.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
                }
            } else if (Array.isArray(data.tags)) {
                // If it's already an array, clean it up
                data.tags = data.tags.filter(tag => tag && tag.trim())
            }
        }

        Object.assign(p, data)
        if (req.file) {
            // Check if file exists before setting imageUrl
            const fs = require('fs')
            if (fs.existsSync(req.file.path)) {
                p.imageUrl = `/uploads/${req.file.filename}`
            } else {
                console.warn('Uploaded file not found:', req.file.path)
            }
        }
        await p.save()
        res.json(p)
    } catch (error) {
        console.error('Error updating project:', error)
        res.status(500).json({ message: 'Failed to update project', error: error.message })
    }
}

exports.deleteProject = async (req, res) => {
    await Project.findByIdAndDelete(req.params.id)
    res.json({ ok: true })
}

// Fix malformed tags in existing projects
exports.fixTags = async (req, res) => {
    try {
        const projects = await Project.find()
        let fixed = 0

        for (let project of projects) {
            let needsUpdate = false
            let cleanTags = []

            if (project.tags && Array.isArray(project.tags)) {
                for (let tag of project.tags) {
                    if (typeof tag === 'string') {
                        try {
                            // Try to parse if it looks like JSON
                            if (tag.startsWith('[') || tag.startsWith('"')) {
                                let parsed = JSON.parse(tag)
                                if (typeof parsed === 'string') {
                                    parsed = JSON.parse(parsed)
                                }
                                if (Array.isArray(parsed)) {
                                    cleanTags.push(...parsed.filter(t => t && t.trim()))
                                } else if (typeof parsed === 'string') {
                                    cleanTags.push(parsed.trim())
                                }
                                needsUpdate = true
                            } else {
                                cleanTags.push(tag.trim())
                            }
                        } catch (e) {
                            // If parsing fails, use as is
                            cleanTags.push(tag.trim())
                        }
                    }
                }

                if (needsUpdate) {
                    project.tags = [...new Set(cleanTags)].filter(tag => tag) // Remove duplicates and empty
                    await project.save()
                    fixed++
                }
            }
        }

        res.json({ message: `Fixed ${fixed} projects`, totalProjects: projects.length })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
