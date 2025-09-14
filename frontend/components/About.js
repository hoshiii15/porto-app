import { useState, useEffect, useRef } from 'react';
import { getProjects } from '../utils/api';

const About = ({ profile }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [animatedText, setAnimatedText] = useState('');
    const [projectCount, setProjectCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [skills, setSkills] = useState([]);
    const [statistics, setStatistics] = useState({
        yearsExperience: 3,
        successRate: 100,
        totalProjects: 0,
        totalCategories: 4,
        supportAvailability: '24/7'
    });
    const sectionRef = useRef(null);
    const timerRef = useRef(null);

    const bio = profile?.description || profile?.bio || 'Passionate developer with expertise in modern web technologies. I love creating innovative solutions and bringing ideas to life through clean, efficient code.';

    useEffect(() => {
        console.log('About component - Profile data:', profile);
        console.log('About component - Bio text:', bio);
        console.log('About component - hasAnimated:', hasAnimated);

        // Set visible immediately
        setIsVisible(true);

        // Always start typing animation if we have bio text
        if (bio && bio.length > 0) {
            // Reset state
            setAnimatedText('');
            setHasAnimated(false);

            const startDelay = setTimeout(() => {
                setHasAnimated(true);

                // Clear any existing timer
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                }

                let index = 0;
                timerRef.current = setInterval(() => {
                    if (index <= bio.length) {
                        setAnimatedText(bio.slice(0, index));
                        index++;
                    } else {
                        clearInterval(timerRef.current);
                        timerRef.current = null;
                    }
                }, 50);
            }, 500); // Give more time for component to mount

            return () => {
                clearTimeout(startDelay);
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                }
            };
        }
    }, [bio]); // Remove hasAnimated from dependencies to allow re-animation

    useEffect(() => {
        // Fetch project count, skills, and statistics
        const fetchData = async () => {
            try {
                const [projectsResponse, skillsResponse, statisticsResponse] = await Promise.all([
                    getProjects(),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/skills`),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/statistics`)
                ]);

                setProjectCount(projectsResponse.data.length);

                if (skillsResponse.ok) {
                    const skillsData = await skillsResponse.json();
                    setSkills(skillsData);
                } else {
                    // Fallback to default skills if API fails
                    setSkills([
                        { name: 'Frontend Development', level: 90, color: 'from-blue-500 to-blue-600' },
                        { name: 'Backend Development', level: 85, color: 'from-green-500 to-green-600' },
                        { name: 'Database Design', level: 80, color: 'from-purple-500 to-purple-600' },
                        { name: 'UI/UX Design', level: 75, color: 'from-pink-500 to-pink-600' },
                    ]);
                }

                if (statisticsResponse.ok) {
                    const statisticsData = await statisticsResponse.json();
                    setStatistics(statisticsData);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
                setProjectCount(0);
                // Fallback to default skills
                setSkills([
                    { name: 'Frontend Development', level: 90, color: 'from-blue-500 to-blue-600' },
                    { name: 'Backend Development', level: 85, color: 'from-green-500 to-green-600' },
                    { name: 'Database Design', level: 80, color: 'from-purple-500 to-purple-600' },
                    { name: 'UI/UX Design', level: 75, color: 'from-pink-500 to-pink-600' },
                ]);
            }
        };

        fetchData();
    }, []);

    return (
        <section id="about" className="py-20 bg-gradient-to-br from-gray-800 via-gray-900 to-black relative overflow-hidden" ref={sectionRef}>
            {/* Enhanced Background Decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-morphing-blob"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-morphing-blob" style={{ animationDelay: '3s' }}></div>

                {/* Floating Tech Icons */}
                <div className="absolute top-20 left-10 animate-float" style={{ animationDelay: '1s' }}>
                    <div className="w-12 h-12 text-blue-400/30">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                            <circle cx="16" cy="8" r="6" />
                        </svg>
                    </div>
                </div>

                <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: '2s' }}>
                    <div className="w-10 h-10 text-purple-400/30">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l2 7h7l-5.5 4.5 2 7L12 16l-5.5 4.5 2-7L3 9h7z" />
                        </svg>
                    </div>
                </div>

                {/* Code Pattern Background */}
                <div className="absolute top-1/2 left-8 text-blue-400/10 font-mono text-6xl transform -rotate-12 animate-pulse">{'<>'}</div>
                <div className="absolute top-1/3 right-12 text-purple-400/10 font-mono text-4xl transform rotate-12 animate-pulse" style={{ animationDelay: '1s' }}>{'{ }'}</div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="opacity-100">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <span className="inline-block text-blue-400 text-sm font-semibold tracking-wider uppercase mb-2">
                            Get to know me
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                About Me
                            </span>
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Bio Section */}
                        <div className="opacity-100">
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 card-hover relative overflow-hidden">
                                {/* Floating badge */}
                                <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full animate-pulse"></div>

                                <h3 className="text-2xl font-bold mb-6 text-white relative">
                                    About Me
                                </h3>

                                <div className="text-gray-300 leading-relaxed text-lg min-h-[120px] relative">
                                    {/* Code snippet decoration */}
                                    <div className="absolute -top-4 -right-4 text-xs text-blue-400/30 font-mono bg-gray-900/30 px-2 py-1 rounded border border-blue-400/20">
                                        developer.story()
                                    </div>

                                    <p className="relative">
                                        {animatedText}
                                        {animatedText.length < bio.length && (
                                            <span className="inline-block w-0.5 h-6 bg-blue-400 ml-1 animate-cursor"></span>
                                        )}
                                    </p>
                                </div>

                                {/* Contact Info */}
                                <div className="mt-8 pt-6 border-t border-gray-700">
                                    <div className="flex flex-wrap gap-4">
                                        <a href={`mailto:${profile?.email || 'your@email.com'}`} className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-105">
                                            <div className="p-2 bg-blue-500/10 rounded-full">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                                </svg>
                                            </div>
                                            <span>{profile?.email || 'your@email.com'}</span>
                                        </a>
                                        {profile?.phone && (
                                            <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-all duration-300 hover:scale-105">
                                                <div className="p-2 bg-green-500/10 rounded-full">
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                                                    </svg>
                                                </div>
                                                <span>{profile.phone}</span>
                                            </a>
                                        )}
                                        {profile?.location && (
                                            <div className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-all duration-300 hover:scale-105">
                                                <div className="p-2 bg-purple-500/10 rounded-full">
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                                                    </svg>
                                                </div>
                                                <span>{profile.location}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Skills Section */}
                        <div className="opacity-100">
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 card-hover relative overflow-hidden">
                                {/* Tech badge decoration */}
                                <div className="absolute top-4 right-4 flex space-x-1">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                                </div>

                                <h3 className="text-2xl font-bold mb-8 text-white relative">
                                    Skills & Expertise
                                    <div className="absolute -top-2 -right-2 text-xs text-purple-400/30 font-mono">
                                        .skills()
                                    </div>
                                </h3>

                                <div className="space-y-6">
                                    {skills.map((skill, index) => (
                                        <div key={skill.name} className="relative group">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-gray-300 font-medium group-hover:text-white transition-colors">
                                                    {skill.name}
                                                </span>
                                                <span className="text-gray-400 text-sm bg-gray-700/50 px-2 py-1 rounded">
                                                    {skill.level}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden relative">
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                                                <div
                                                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out relative overflow-hidden animate-skill-progress`}
                                                    style={{
                                                        width: `${skill.level}%`,
                                                        animationDelay: `${index * 0.2}s`
                                                    }}
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                                                </div>
                                            </div>
                                            {/* Floating skill icons */}
                                            <div className="absolute -right-2 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="w-6 h-6 text-blue-400 animate-bounce">
                                                    <svg fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Achievement Stats */}
                                <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-700">
                                    {[
                                        { number: `${statistics.totalProjects || projectCount}+`, label: 'Projects', color: 'text-blue-400' },
                                        { number: `${statistics.yearsExperience}+`, label: 'Years Exp', color: 'text-green-400' },
                                        { number: `${statistics.successRate}%`, label: 'Success Rate', color: 'text-purple-400' }
                                    ].map((stat, index) => (
                                        <div key={stat.label} className="text-center group hover:scale-110 transition-transform duration-300">
                                            <div className="relative">
                                                <div className={`text-2xl font-bold ${stat.color} group-hover:animate-pulse`}>
                                                    {stat.number}
                                                </div>
                                            </div>
                                            <div className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                                                {stat.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
