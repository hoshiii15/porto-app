import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ProjectCard = ({ project }) => {
    const [isHovered, setIsHovered] = useState(false);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const imageUrl = project.imageUrl ? `${apiUrl}${project.imageUrl}` : '/placeholder.jpg';

    return (
        <div
            className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Animated Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Image Section */}
            <div className="relative h-56 w-full overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={project.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-all duration-700 group-hover:scale-110"
                />

                {/* Overlay on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex space-x-3">
                            {project.codeUrl && (
                                <a
                                    href={project.codeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 bg-gray-900/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800/80 transition-all duration-300 transform hover:scale-105"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    <span>Code</span>
                                </a>
                            )}
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 bg-blue-600/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-500/80 transition-all duration-300 transform hover:scale-105"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    <span>Live</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="relative p-6 z-10">
                <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-300 transition-colors duration-300">
                        {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                        {project.description}
                    </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags?.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="bg-gray-700/50 border border-gray-600/50 text-gray-300 text-xs font-medium px-3 py-1 rounded-full hover:bg-blue-600/20 hover:border-blue-500/50 hover:text-blue-300 transition-all duration-300"
                        >
                            {tag}
                        </span>
                    ))}
                    {project.tags?.length > 3 && (
                        <span className="text-gray-500 text-xs font-medium px-3 py-1">
                            +{project.tags.length - 3} more
                        </span>
                    )}
                </div>

                {/* View Details Button */}
                <Link href={`/project/${project._id}`} className="group/btn relative w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl overflow-hidden transition-all duration-300 hover:from-blue-500 hover:to-purple-500 hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105">
                    <span className="relative z-10 flex items-center space-x-2">
                        <span>View Details</span>
                        <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </span>

                    {/* Button Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
                </Link>
            </div>

            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
    );
};

export default ProjectCard;
