import { useState, useEffect } from 'react';

const ProjectTable = ({ projects, onEdit, onDelete, isLoading }) => {
    if (isLoading) {
        return (
            <div className="bg-gray-800 rounded-lg p-6">
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-700 rounded mb-4"></div>
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-4 bg-gray-700 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!projects || projects.length === 0) {
        return (
            <div className="bg-gray-800 rounded-lg p-6 text-center">
                <p className="text-gray-400">No projects found.</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Project
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Description
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Tags
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                        {projects.map((project) => (
                            <tr key={project._id} className="hover:bg-gray-700">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        {project.imageUrl && (
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img
                                                    className="h-10 w-10 rounded-full object-cover"
                                                    src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${project.imageUrl}`}
                                                    alt={project.title}
                                                />
                                            </div>
                                        )}
                                        <div className={project.imageUrl ? 'ml-4' : ''}>
                                            <div className="text-sm font-medium text-white">
                                                {project.title}
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                {project.liveUrl && (
                                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                                                        Live Demo
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-300 max-w-xs truncate">
                                        {project.description}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {project.tags?.slice(0, 2).map((tag) => (
                                            <span
                                                key={tag}
                                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-600/50 text-blue-300"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                        {project.tags?.length > 2 && (
                                            <span className="text-xs text-gray-400">
                                                +{project.tags.length - 2} more
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => onEdit(project)}
                                            className="text-blue-400 hover:text-blue-300 bg-blue-600/20 hover:bg-blue-600/30 px-3 py-1 rounded-md transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => onDelete(project._id)}
                                            className="text-red-400 hover:text-red-300 bg-red-600/20 hover:bg-red-600/30 px-3 py-1 rounded-md transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProjectTable;
