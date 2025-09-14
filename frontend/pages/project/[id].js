import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '../../components/shared/Layout';

export default function ProjectDetail({ project, profile }) {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        setIsVisible(true);
    }, []);

    if (router.isFallback) {
        return (
            <Layout profile={profile}>
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-900 to-black">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <div className="text-white text-lg">Loading project details...</div>
                    </div>
                </div>
            </Layout>
        );
    }

    if (!project) {
        return (
            <Layout profile={profile}>
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-900 to-black">
                    <div className="text-center max-w-md mx-auto px-6">
                        <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20.5a7.962 7.962 0 01-5-1.709M15 3.5a3 3 0 00-6 0M12 3.5V2" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-4">Project Not Found</h1>
                        <p className="text-gray-400 mb-8">The project you're looking for doesn't exist or has been removed.</p>
                        <button
                            onClick={() => router.push('/')}
                            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span>Back to Portfolio</span>
                        </button>
                    </div>
                </div>
            </Layout>
        );
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const imageUrl = project.imageUrl ? `${apiUrl}${project.imageUrl}` : '/placeholder.jpg';

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'details', label: 'Details' },
        { id: 'gallery', label: 'Gallery' }
    ];

    return (
        <Layout profile={profile}>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black">
                {/* Hero Section */}
                <div className="relative py-20 overflow-hidden">
                    {/* Background Decorations */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
                    </div>

                    <div className="container mx-auto px-6 max-w-6xl relative z-10">
                        {/* Back Button */}
                        <div className="opacity-100">
                            <button
                                onClick={() => router.push('/')}
                                className="group inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 mb-8 transition-all duration-300 hover:translate-x-2"
                            >
                                <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                <span className="font-medium">Back to Portfolio</span>
                            </button>
                        </div>

                        {/* Project Header */}
                        <div className="text-center mb-12">
                            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                                <span className="bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
                                    {project.title}
                                </span>
                            </h1>
                            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        {/* Project Image */}
                        {project.imageUrl && (
                            <div className="relative w-full h-96 md:h-[500px] mb-12 rounded-2xl overflow-hidden">
                                <Image
                                    src={imageUrl}
                                    alt={project.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="transition-transform duration-700 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                                {/* Project Links Overlay */}
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="flex flex-wrap gap-4">
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center space-x-2 bg-blue-600/80 backdrop-blur-sm hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                                <span>Live Demo</span>
                                            </a>
                                        )}
                                        {project.codeUrl && (
                                            <a
                                                href={project.codeUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center space-x-2 bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                                <span>Source Code</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content Section */}
                <div className="container mx-auto px-6 max-w-6xl pb-20">
                    {/* Tab Navigation */}
                    <div className="flex justify-center mb-12">
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-2 border border-gray-700/50">
                            <div className="flex space-x-2">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${activeTab === tab.id
                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                            : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                                            }`}
                                    >
                                        <span>{tab.icon}</span>
                                        <span>{tab.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="opacity-100">
                        {activeTab === 'overview' && (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Technologies */}
                                <div className="lg:col-span-2">
                                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                                            <span>Technologies Used</span>
                                        </h2>
                                        <div className="flex flex-wrap gap-3">
                                            {project.tags?.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-blue-300 px-4 py-2 rounded-full text-sm font-medium hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Project Info */}
                                <div>
                                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                                            <span>📊</span>
                                            <span>Project Info</span>
                                        </h2>
                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="text-gray-400 text-sm font-medium mb-1">Status</h3>
                                                <span className="inline-flex items-center space-x-2 bg-green-500/20 border border-green-500/50 text-green-300 px-3 py-1 rounded-full text-sm">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                                    <span>Live</span>
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="text-gray-400 text-sm font-medium mb-1">Type</h3>
                                                <p className="text-white">Web Application</p>
                                            </div>
                                            <div>
                                                <h3 className="text-gray-400 text-sm font-medium mb-1">Date</h3>
                                                <p className="text-white">2024</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'details' && (
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                                    <span>About This Project</span>
                                </h2>
                                <div className="prose prose-invert max-w-none">
                                    <div className="text-gray-300 leading-relaxed text-lg space-y-4">
                                        <p>{project.description}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'gallery' && (
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                                    <span>Project Gallery</span>
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {project.imageUrl && (
                                        <div className="relative h-64 rounded-xl overflow-hidden">
                                            <Image
                                                src={imageUrl}
                                                alt={`${project.title} - Screenshot 1`}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                                className="transition-transform duration-300 hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    {/* Placeholder for additional images */}
                                    <div className="relative h-64 bg-gray-700/50 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-600">
                                        <div className="text-center text-gray-400">
                                            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <p>More screenshots coming soon</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export async function getStaticPaths() {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiUrl}/api/projects`);
        const projects = await res.json();

        const paths = projects.map((project) => ({
            params: { id: project._id }
        }));

        return {
            paths,
            fallback: true // Enable ISR for new projects
        };
    } catch (error) {
        return {
            paths: [],
            fallback: true
        };
    }
}

export async function getStaticProps({ params }) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

        const [projectRes, profileRes] = await Promise.all([
            fetch(`${apiUrl}/api/projects/${params.id}`),
            fetch(`${apiUrl}/api/profile`)
        ]);

        if (!projectRes.ok) {
            return {
                notFound: true,
            };
        }

        const project = await projectRes.json();
        const profile = profileRes.ok ? await profileRes.json() : {};

        return {
            props: {
                project,
                profile,
            },
            revalidate: 60, // Re-generate the page every 60 seconds
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
}
