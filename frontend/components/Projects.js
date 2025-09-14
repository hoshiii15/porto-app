import { useState, useEffect, useRef } from 'react';
import ProjectCard from './ProjectCard';

const Projects = ({ projects }) => {
    const [isVisible, setIsVisible] = useState(true); // Always visible now
    const [filter, setFilter] = useState('all');
    const [filteredProjects, setFilteredProjects] = useState([]);
    const sectionRef = useRef(null);

    useEffect(() => {
        // Remove IntersectionObserver - components are always visible
    }, []);

    useEffect(() => {
        if (projects && projects.length > 0) {
            if (filter === 'all') {
                setFilteredProjects(projects);
            } else {
                setFilteredProjects(
                    projects.filter(project =>
                        project.tags && project.tags.some(tag =>
                            tag.toLowerCase().includes(filter.toLowerCase())
                        )
                    )
                );
            }
        }
    }, [projects, filter]);

    // Extract unique categories from all project tags
    const categories = ['all'];
    if (projects && projects.length > 0) {
        const allTags = projects.reduce((acc, project) => {
            if (project.tags) {
                return [...acc, ...project.tags];
            }
            return acc;
        }, []);
        const uniqueTags = [...new Set(allTags)];
        categories.push(...uniqueTags.slice(0, 4)); // Limit to 4 categories + 'all'
    }

    return (
        <section id="projects" className="py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-black relative overflow-hidden" ref={sectionRef}>
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
                <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block text-blue-400 text-sm font-semibold tracking-wider uppercase mb-2">
                        Portfolio
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            My Projects
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-8"></div>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Here are some of my recent projects that showcase my skills and experience
                    </p>
                </div>

                {/* Filter Buttons */}
                {categories.length > 1 && (
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setFilter(category)}
                                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${filter === category
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-700/50 hover:border-gray-600/50'
                                    }`}
                            >
                                {category === 'all' ? 'All Projects' : category}
                            </button>
                        ))}
                    </div>
                )}

                {/* Projects Grid */}
                <div className="opacity-100">
                    {(filteredProjects && filteredProjects.length > 0) ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                                {filteredProjects.map((project, index) => (
                                    <div key={project._id}>
                                        <ProjectCard project={project} />
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-20">
                            <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
                                <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-300 mb-2">No Projects Found</h3>
                            <p className="text-gray-500">
                                {filter === 'all'
                                    ? "No projects available at the moment."
                                    : `No projects found for "${filter}" category.`
                                }
                            </p>
                            {filter !== 'all' && (
                                <button
                                    onClick={() => setFilter('all')}
                                    className="mt-4 text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                    View all projects
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Projects;
