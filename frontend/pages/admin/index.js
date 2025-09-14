import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import withAuth from '../../components/withAuth';
import ProjectTable from '../../components/admin/ProjectTable';
import ProjectForm from '../../components/admin/ProjectForm';
import { getProjects, getSocialLinks, createSocialLink, deleteSocialLink, getProfile, updateProfile } from '../../utils/api';

function AdminDashboard() {
    const [projects, setProjects] = useState([]);
    const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [socialLinks, setSocialLinks] = useState([]);
    const [newSocialLink, setNewSocialLink] = useState({ name: '', url: '' });
    const [profile, setProfile] = useState({
        name: '',
        title: '',
        description: '',
        bio: '',
        email: '',
        phone: '',
        location: ''
    });
    const [isProfileFormOpen, setIsProfileFormOpen] = useState(false);
    const [skills, setSkills] = useState([]);
    const [isSkillFormOpen, setIsSkillFormOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState(null);
    const [newSkill, setNewSkill] = useState({
        name: '',
        level: 50,
        color: 'from-blue-500 to-blue-600'
    });
    const [statistics, setStatistics] = useState({
        yearsExperience: 3,
        successRate: 100,
        totalProjects: 0,
        totalCategories: 4,
        supportAvailability: '24/7'
    });
    const [isStatisticsFormOpen, setIsStatisticsFormOpen] = useState(false);
    const router = useRouter();
    const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    // Auto-detect social platform and return appropriate SVG icon
    const getSocialIcon = (name) => {
        const lowercaseName = name.toLowerCase();

        if (lowercaseName.includes('instagram')) {
            return (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986s11.987-5.368 11.987-11.986C24.014 5.367 18.635.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.5 13.559 3.5 12.058s.698-2.837 1.626-3.633c.875-.807 2.026-1.297 3.323-1.297s2.449.49 3.324 1.297c.928.796 1.626 2.132 1.626 3.633s-.698 2.837-1.626 3.633c-.875.807-2.027 1.297-3.324 1.297zm7.108 0c-1.297 0-2.449-.49-3.324-1.297-.928-.796-1.626-2.132-1.626-3.633s.698-2.837 1.626-3.633c.875-.807 2.027-1.297 3.324-1.297s2.448.49 3.323 1.297c.928.796 1.626 2.132 1.626 3.633s-.698 2.837-1.626 3.633c-.875.807-2.026 1.297-3.323 1.297z" />
                </svg>
            );
        }

        if (lowercaseName.includes('github')) {
            return (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
            );
        }

        if (lowercaseName.includes('linkedin')) {
            return (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            );
        }

        if (lowercaseName.includes('twitter') || lowercaseName.includes('x')) {
            return (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
            );
        }

        if (lowercaseName.includes('facebook')) {
            return (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            );
        }

        if (lowercaseName.includes('youtube')) {
            return (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
            );
        }

        // Default link icon
        return (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
        );
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [projectsRes, socialRes, profileRes, skillsRes, statisticsRes] = await Promise.all([
                getProjects(),
                getSocialLinks(),
                getProfile(),
                fetch(`${api}/api/skills`),
                fetch(`${api}/api/statistics`)
            ]);

            setProjects(projectsRes.data);
            setSocialLinks(socialRes.data || []);
            if (profileRes.data) {
                setProfile(profileRes.data);
            }
            
            if (skillsRes.ok) {
                const skillsData = await skillsRes.json();
                setSkills(skillsData);
            }

            if (statisticsRes.ok) {
                const statisticsData = await statisticsRes.json();
                setStatistics(statisticsData);
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/admin/login');
    };

    const handleAddSocialLink = async () => {
        if (!newSocialLink.name || !newSocialLink.url) return;

        try {
            const response = await createSocialLink(newSocialLink);
            setSocialLinks([...socialLinks, response.data]);
            setNewSocialLink({ name: '', url: '' });
        } catch (error) {
            console.error('Failed to add social link:', error);
        }
    };

    const handleDeleteSocialLink = async (id) => {
        try {
            await deleteSocialLink(id);
            setSocialLinks(socialLinks.filter(link => link._id !== id));
        } catch (error) {
            console.error('Failed to delete social link:', error);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const response = await updateProfile(profile);
            setProfile(response.data);
            setIsProfileFormOpen(false);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('Failed to update profile');
        }
    };

    // Skills Management Functions
    const handleCreateSkill = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${api}/api/skills`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSkill)
            });

            if (response.ok) {
                await fetchData();
                setNewSkill({ name: '', level: 50, color: 'from-blue-500 to-blue-600' });
                setIsSkillFormOpen(false);
            } else {
                alert('Failed to create skill');
            }
        } catch (error) {
            console.error('Error creating skill:', error);
            alert('Error creating skill');
        }
    };

    const handleUpdateSkill = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${api}/api/skills/${editingSkill._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSkill)
            });

            if (response.ok) {
                await fetchData();
                setEditingSkill(null);
                setNewSkill({ name: '', level: 50, color: 'from-blue-500 to-blue-600' });
                setIsSkillFormOpen(false);
            } else {
                alert('Failed to update skill');
            }
        } catch (error) {
            console.error('Error updating skill:', error);
            alert('Error updating skill');
        }
    };

    const handleDeleteSkill = async (skillId) => {
        if (!confirm('Are you sure you want to delete this skill?')) return;

        try {
            const response = await fetch(`${api}/api/skills/${skillId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                await fetchData();
            } else {
                alert('Failed to delete skill');
            }
        } catch (error) {
            console.error('Error deleting skill:', error);
            alert('Error deleting skill');
        }
    };

    const openSkillForm = (skill = null) => {
        if (skill) {
            setEditingSkill(skill);
            setNewSkill({
                name: skill.name,
                level: skill.level,
                color: skill.color
            });
        } else {
            setEditingSkill(null);
            setNewSkill({ name: '', level: 50, color: 'from-blue-500 to-blue-600' });
        }
        setIsSkillFormOpen(true);
    };

    const closeSkillForm = () => {
        setIsSkillFormOpen(false);
        setEditingSkill(null);
        setNewSkill({ name: '', level: 50, color: 'from-blue-500 to-blue-600' });
    };

    // Statistics functions
    const handleUpdateStatistics = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${api}/api/statistics`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(statistics),
            });

            if (response.ok) {
                const updatedStatistics = await response.json();
                setStatistics(updatedStatistics);
                setIsStatisticsFormOpen(false);
                alert('Statistics updated successfully!');
            } else {
                alert('Failed to update statistics');
            }
        } catch (error) {
            console.error('Error updating statistics:', error);
            alert('Error updating statistics');
        }
    };

    const handleCreateProject = async (formData) => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${api}/api/projects`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (res.ok) {
                await fetchData();
                setIsProjectFormOpen(false);
            } else {
                alert('Failed to create project');
            }
        } catch (error) {
            console.error('Error creating project:', error);
            alert('Error creating project');
        }
    };

    const handleUpdateProject = async (formData) => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${api}/api/projects/${editingProject._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (res.ok) {
                await fetchData();
                setIsProjectFormOpen(false);
                setEditingProject(null);
            } else {
                alert('Failed to update project');
            }
        } catch (error) {
            console.error('Error updating project:', error);
            alert('Error updating project');
        }
    };

    const handleDeleteProject = async (projectId) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${api}/api/projects/${projectId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                await fetchData();
            } else {
                alert('Failed to delete project');
            }
        } catch (error) {
            console.error('Error deleting project:', error);
            alert('Error deleting project');
        }
    };

    const handleEditProject = (project) => {
        setEditingProject(project);
        setIsProjectFormOpen(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black">
            {/* Enhanced Header */}
            <header className="bg-gray-800/50 backdrop-blur-xl border-b border-gray-700/50 shadow-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                                <p className="text-gray-400 text-sm">Manage your portfolio content</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <a
                                href="/"
                                target="_blank"
                                className="inline-flex items-center space-x-2 text-gray-300 hover:text-white bg-gray-700/50 hover:bg-gray-600/50 px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                <span>View Site</span>
                            </a>
                            <button
                                onClick={handleLogout}
                                className="inline-flex items-center space-x-2 bg-red-600/80 hover:bg-red-500 text-white px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[
                        {
                            title: 'Total Projects',
                            value: projects.length,
                            icon: (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            ),
                            color: 'from-blue-500 to-blue-600',
                            bgColor: 'from-blue-500/10 to-blue-600/10'
                        },
                        {
                            title: 'Published',
                            value: projects.length,
                            icon: (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ),
                            color: 'from-green-500 to-green-600',
                            bgColor: 'from-green-500/10 to-green-600/10'
                        },
                        {
                            title: 'Technologies',
                            value: [...new Set(projects.flatMap(p => p.tags || []))].length,
                            icon: (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            ),
                            color: 'from-purple-500 to-purple-600',
                            bgColor: 'from-purple-500/10 to-purple-600/10'
                        }
                    ].map((stat, index) => (
                        <div
                            key={stat.title}
                            className={`bg-gradient-to-br ${stat.bgColor} backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 transform hover:scale-105`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                                    <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                                </div>
                                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white`}>
                                    {stat.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Profile Information */}
                    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-bold text-white">Profile Information</h2>
                            </div>
                            <button
                                onClick={() => setIsProfileFormOpen(true)}
                                className="inline-flex items-center space-x-2 bg-indigo-600/80 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                <span>Edit Profile</span>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-gray-400 text-sm">Name</label>
                                <p className="text-white font-medium">{profile.name || 'Not set'}</p>
                            </div>
                            <div>
                                <label className="text-gray-400 text-sm">Bio (Homepage Description)</label>
                                <p className="text-white font-medium">{profile.bio || 'Not set'}</p>
                            </div>
                            <div>
                                <label className="text-gray-400 text-sm">Email</label>
                                <p className="text-white font-medium">{profile.email || 'Not set'}</p>
                            </div>
                            <div>
                                <label className="text-gray-400 text-sm">Location</label>
                                <p className="text-white font-medium">{profile.location || 'Not set'}</p>
                            </div>
                            <div>
                                <label className="text-gray-400 text-sm">Description (About Page)</label>
                                <p className="text-white font-medium line-clamp-3">{profile.description || 'Not set'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Social Media Management */}
                    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold text-white">Social Media Links</h2>
                        </div>

                        {/* Add New Social Link */}
                        <div className="space-y-4 mb-6">
                            <div>
                                <label htmlFor="socialName" className="block text-sm font-medium text-gray-300 mb-2">
                                    Platform Name
                                </label>
                                <input
                                    type="text"
                                    id="socialName"
                                    value={newSocialLink.name}
                                    onChange={(e) => setNewSocialLink(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                    placeholder="e.g., Instagram, Twitter, GitHub"
                                />
                            </div>
                            <div>
                                <label htmlFor="socialUrl" className="block text-sm font-medium text-gray-300 mb-2">
                                    URL
                                </label>
                                <input
                                    type="url"
                                    id="socialUrl"
                                    value={newSocialLink.url}
                                    onChange={(e) => setNewSocialLink(prev => ({ ...prev, url: e.target.value }))}
                                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                    placeholder="https://example.com"
                                />
                            </div>
                            <button
                                onClick={handleAddSocialLink}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 font-medium"
                            >
                                Add Social Link
                            </button>
                        </div>

                        {/* Current Links */}
                        <div>
                            <h3 className="text-gray-300 font-medium mb-4">Current Links</h3>
                            <div className="space-y-3">
                                {socialLinks.map((link) => (
                                    <div
                                        key={link._id}
                                        className="flex items-center justify-between p-3 bg-gray-900/50 rounded-xl border border-gray-600/30"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="text-gray-400">
                                                {getSocialIcon(link.name)}
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">{link.name}</p>
                                                <p className="text-gray-400 text-sm truncate max-w-48">{link.url}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteSocialLink(link._id)}
                                            className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded-lg transition-all duration-300"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                                {socialLinks.length === 0 && (
                                    <p className="text-gray-500 text-center py-8">No social links added yet.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Skills & Expertise Management */}
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold text-white">Skills & Expertise</h2>
                            <button
                                onClick={() => openSkillForm()}
                                className="ml-auto inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <span>Add Skill</span>
                            </button>
                        </div>

                        <div className="space-y-4">
                            {skills.map((skill) => (
                                <div key={skill._id} className="bg-gray-900/50 rounded-xl p-4 border border-gray-600/30">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex-1">
                                            <h3 className="font-medium text-white">{skill.name}</h3>
                                            <div className="flex items-center space-x-2 mt-2">
                                                <div className="flex-1 bg-gray-700 rounded-full h-2">
                                                    <div 
                                                        className={`h-2 bg-gradient-to-r ${skill.color} rounded-full transition-all duration-300`}
                                                        style={{ width: `${skill.level}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm text-gray-400 min-w-[3rem]">{skill.level}%</span>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2 ml-4">
                                            <button
                                                onClick={() => openSkillForm(skill)}
                                                className="text-blue-400 hover:text-blue-300 transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDeleteSkill(skill._id)}
                                                className="text-red-400 hover:text-red-300 transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {skills.length === 0 && (
                                <p className="text-gray-500 text-center py-8">No skills added yet.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Statistics Management */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-xl flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold text-white">Portfolio Statistics</h2>
                        </div>
                        <button
                            onClick={() => setIsStatisticsFormOpen(true)}
                            className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/25"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            <span>Edit Statistics</span>
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div className="bg-gray-700/50 rounded-xl p-4">
                            <div className="text-2xl font-bold text-yellow-400">{statistics.yearsExperience}+</div>
                            <div className="text-gray-400 text-sm">Years Experience</div>
                        </div>
                        <div className="bg-gray-700/50 rounded-xl p-4">
                            <div className="text-2xl font-bold text-green-400">{statistics.successRate}%</div>
                            <div className="text-gray-400 text-sm">Success Rate</div>
                        </div>
                        <div className="bg-gray-700/50 rounded-xl p-4">
                            <div className="text-2xl font-bold text-blue-400">{statistics.totalProjects}+</div>
                            <div className="text-gray-400 text-sm">Total Projects</div>
                        </div>
                        <div className="bg-gray-700/50 rounded-xl p-4">
                            <div className="text-2xl font-bold text-purple-400">{statistics.totalCategories}</div>
                            <div className="text-gray-400 text-sm">Categories</div>
                        </div>
                        <div className="bg-gray-700/50 rounded-xl p-4">
                            <div className="text-2xl font-bold text-indigo-400">{statistics.supportAvailability}</div>
                            <div className="text-gray-400 text-sm">Support</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                    {/* Projects Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-semibold text-white">Projects Management</h2>
                                </div>
                                <button
                                    onClick={() => {
                                        setEditingProject(null);
                                        setIsProjectFormOpen(true);
                                    }}
                                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/25"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    <span>Add New Project</span>
                                </button>
                            </div>

                            <ProjectTable
                                projects={projects}
                                onEdit={handleEditProject}
                                onDelete={handleDeleteProject}
                                isLoading={isLoading}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Form Modal */}
            {isProfileFormOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white">Edit Profile</h3>
                            <button
                                onClick={() => setIsProfileFormOpen(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={profile.name}
                                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    placeholder="Your full name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Bio (Homepage Description)</label>
                                <textarea
                                    value={profile.bio}
                                    onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                                    rows={3}
                                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                                    placeholder="A brief and catchy description for your homepage..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={profile.email}
                                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                                <input
                                    type="tel"
                                    value={profile.phone}
                                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                                <input
                                    type="text"
                                    value={profile.location}
                                    onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    placeholder="City, Country"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Description (About Page)</label>
                                <textarea
                                    value={profile.description}
                                    onChange={(e) => setProfile(prev => ({ ...prev, description: e.target.value }))}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                                    placeholder="Detailed information about your skills and experience..."
                                />
                            </div>

                            <div className="flex space-x-4 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsProfileFormOpen(false)}
                                    className="flex-1 bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Skills Form Modal */}
            {isSkillFormOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white">
                                {editingSkill ? 'Edit Skill' : 'Add New Skill'}
                            </h3>
                            <button
                                onClick={closeSkillForm}
                                className="text-gray-400 hover:text-white"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={editingSkill ? handleUpdateSkill : handleCreateSkill} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Skill Name</label>
                                <input
                                    type="text"
                                    value={newSkill.name}
                                    onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    placeholder="e.g., Frontend Development"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Level: {newSkill.level}%
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={newSkill.level}
                                    onChange={(e) => setNewSkill(prev => ({ ...prev, level: parseInt(e.target.value) }))}
                                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Color Theme</label>
                                <select
                                    value={newSkill.color}
                                    onChange={(e) => setNewSkill(prev => ({ ...prev, color: e.target.value }))}
                                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                >
                                    <option value="from-blue-500 to-blue-600">Blue</option>
                                    <option value="from-green-500 to-green-600">Green</option>
                                    <option value="from-purple-500 to-purple-600">Purple</option>
                                    <option value="from-pink-500 to-pink-600">Pink</option>
                                    <option value="from-yellow-500 to-yellow-600">Yellow</option>
                                    <option value="from-red-500 to-red-600">Red</option>
                                    <option value="from-indigo-500 to-indigo-600">Indigo</option>
                                    <option value="from-cyan-500 to-cyan-600">Cyan</option>
                                </select>
                            </div>

                            <div className="flex space-x-4 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300"
                                >
                                    {editingSkill ? 'Update Skill' : 'Add Skill'}
                                </button>
                                <button
                                    type="button"
                                    onClick={closeSkillForm}
                                    className="flex-1 bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Statistics Form Modal */}
            {isStatisticsFormOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700">
                        <h3 className="text-xl font-bold text-white mb-6">Edit Portfolio Statistics</h3>
                        <form onSubmit={handleUpdateStatistics} className="space-y-4">
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Years Experience
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={statistics.yearsExperience}
                                    onChange={(e) => setStatistics({ ...statistics, yearsExperience: Number(e.target.value) })}
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none transition-all duration-300"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Success Rate (%)
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={statistics.successRate}
                                    onChange={(e) => setStatistics({ ...statistics, successRate: Number(e.target.value) })}
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none transition-all duration-300"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Total Projects
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={statistics.totalProjects}
                                    onChange={(e) => setStatistics({ ...statistics, totalProjects: Number(e.target.value) })}
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none transition-all duration-300"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Total Categories
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={statistics.totalCategories}
                                    onChange={(e) => setStatistics({ ...statistics, totalCategories: Number(e.target.value) })}
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none transition-all duration-300"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Support Availability
                                </label>
                                <input
                                    type="text"
                                    value={statistics.supportAvailability}
                                    onChange={(e) => setStatistics({ ...statistics, supportAvailability: e.target.value })}
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none transition-all duration-300"
                                    placeholder="e.g., 24/7, Business Hours"
                                    required
                                />
                            </div>
                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300"
                                >
                                    Update Statistics
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsStatisticsFormOpen(false)}
                                    className="flex-1 bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Project Form Modal */}
            <ProjectForm
                project={editingProject}
                isOpen={isProjectFormOpen}
                onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
                onCancel={() => {
                    setIsProjectFormOpen(false);
                    setEditingProject(null);
                }}
            />
        </div>
    );
}

export default withAuth(AdminDashboard);
