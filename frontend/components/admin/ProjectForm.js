import { useState, useEffect } from 'react';

const ProjectForm = ({ project, onSubmit, onCancel, isOpen }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tags: '',
        liveUrl: '',
        codeUrl: '',
    });
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (project) {
            setFormData({
                title: project.title || '',
                description: project.description || '',
                tags: project.tags ? project.tags.join(', ') : '',
                liveUrl: project.liveUrl || '',
                codeUrl: project.codeUrl || '',
            });
        } else {
            setFormData({
                title: '',
                description: '',
                tags: '',
                liveUrl: '',
                codeUrl: '',
            });
        }
        setImage(null);
    }, [project]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('liveUrl', formData.liveUrl);
        formDataToSend.append('codeUrl', formData.codeUrl);

        // Convert tags from string to array
        const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);

        // Send tags as individual form fields instead of JSON string
        tagsArray.forEach((tag, index) => {
            formDataToSend.append(`tags[${index}]`, tag);
        });

        if (image) {
            formDataToSend.append('image', image);
        }

        try {
            await onSubmit(formDataToSend);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">
                            {project ? 'Edit Project' : 'Add New Project'}
                        </h2>
                        <button
                            onClick={onCancel}
                            className="text-gray-400 hover:text-white"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                                Project Title *
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                                Description <span className="text-gray-500 text-xs">(Leave empty for auto-generated description)</span>
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Enter project description or leave empty for auto-generated description"
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-1">
                                Tags (comma separated)
                            </label>
                            <input
                                type="text"
                                id="tags"
                                name="tags"
                                value={formData.tags}
                                onChange={handleInputChange}
                                placeholder="React, Next.js, Tailwind CSS"
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-1">
                                Project Image
                            </label>
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {project?.imageUrl && (
                                <div className="mt-2">
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${project.imageUrl}`}
                                        alt="Current project image"
                                        className="w-20 h-20 object-cover rounded-md"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">Current image</p>
                                </div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-300 mb-1">
                                Live Demo URL <span className="text-gray-500 text-xs">(Optional)</span>
                            </label>
                            <input
                                type="url"
                                id="liveUrl"
                                name="liveUrl"
                                value={formData.liveUrl}
                                onChange={handleInputChange}
                                placeholder="https://your-live-demo.com"
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="codeUrl" className="block text-sm font-medium text-gray-300 mb-1">
                                Source Code URL <span className="text-gray-500 text-xs">(Optional)</span>
                            </label>
                            <input
                                type="url"
                                id="codeUrl"
                                name="codeUrl"
                                value={formData.codeUrl}
                                onChange={handleInputChange}
                                placeholder="https://github.com/username/repo"
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex justify-end space-x-4 pt-4">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="px-4 py-2 text-gray-300 bg-gray-600 hover:bg-gray-700 rounded-md transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Saving...' : (project ? 'Update Project' : 'Create Project')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProjectForm;
