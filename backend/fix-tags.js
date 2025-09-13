const mongoose = require('mongoose');
const Project = require('./models/Project');

async function fixTags() {
    try {
        await mongoose.connect('mongodb://localhost:27017/portfolio');
        console.log('Connected to database');

        const projects = await Project.find();
        console.log(`Found ${projects.length} projects`);

        let fixed = 0;

        for (let project of projects) {
            let needsUpdate = false;
            let cleanTags = [];

            console.log(`\nProcessing project: ${project.title}`);
            console.log('Original tags:', project.tags);

            if (project.tags && Array.isArray(project.tags)) {
                for (let tag of project.tags) {
                    if (typeof tag === 'string') {
                        try {
                            // Try to parse if it looks like JSON
                            if (tag.startsWith('[') || tag.startsWith('"')) {
                                console.log(`Parsing JSON tag: ${tag}`);
                                let parsed = tag;

                                // Keep parsing until we get clean data
                                while (typeof parsed === 'string' && (parsed.startsWith('[') || parsed.startsWith('"'))) {
                                    parsed = JSON.parse(parsed);
                                }

                                if (Array.isArray(parsed)) {
                                    cleanTags.push(...parsed.filter(t => t && t.trim()));
                                } else if (typeof parsed === 'string' && parsed.trim()) {
                                    cleanTags.push(parsed.trim());
                                }
                                needsUpdate = true;
                            } else {
                                cleanTags.push(tag.trim());
                            }
                        } catch (e) {
                            console.log(`Failed to parse tag: ${tag}, using as-is`);
                            cleanTags.push(tag.trim());
                        }
                    }
                }

                if (needsUpdate) {
                    project.tags = [...new Set(cleanTags)].filter(tag => tag); // Remove duplicates and empty
                    console.log('New tags:', project.tags);
                    await project.save();
                    fixed++;
                    console.log('✅ Fixed!');
                } else {
                    console.log('✅ No fix needed');
                }
            }
        }

        console.log(`\n🎉 Fixed ${fixed} out of ${projects.length} projects`);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from database');
    }
}

fixTags();
