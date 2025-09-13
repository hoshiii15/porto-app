import { useState, useEffect, useRef } from 'react';
import { getProjects } from '../utils/api';

const About = ({ profile }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [animatedText, setAnimatedText] = useState('');
    const [projectCount, setProjectCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [skills, setSkills] = useState([]);
    const sectionRef = useRef(null);
    const timerRef = useRef(null);

    const bio = profile?.description || profile?.bio || 'Detailed information about your skills, experience, and passion for development.';

    useEffect(() => {
        // Fetch project count and skills
        const fetchData = async () => {
            try {
                const [projectsResponse, skillsResponse] = await Promise.all([
                    getProjects(),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/skills`)
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

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setIsVisible(true);
                    setHasAnimated(true);
                    // Animate text typing effect
                    const text = bio;
                    let index = 0;
                    
                    // Clear any existing timer
                    if (timerRef.current) {
                        clearInterval(timerRef.current);
                    }
                    
                    timerRef.current = setInterval(() => {
                        setAnimatedText(text.slice(0, index));
                        index++;
                        if (index > text.length) {
                            clearInterval(timerRef.current);
                            timerRef.current = null;
                        }
                    }, 30);
                } else if (entry.isIntersecting && hasAnimated) {
                    // If already animated, just show the full text
                    setIsVisible(true);
                    setAnimatedText(bio);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            observer.disconnect();
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [bio, hasAnimated]);

    return (
        <section id="about" className="py-20 bg-gradient-to-br from-gray-800 via-gray-900 to-black relative overflow-hidden" ref={sectionRef}>
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
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
                        <div className={`transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
                                <h3 className="text-2xl font-bold mb-6 text-white">My Story</h3>
                                <div className="text-gray-300 leading-relaxed text-lg min-h-[120px]">
                                    <p className="relative">
                                        {animatedText}
                                        {animatedText.length < bio.length && (
                                            <span className="inline-block w-0.5 h-6 bg-blue-400 ml-1 animate-pulse"></span>
                                        )}
                                    </p>
                                </div>

                                {/* Contact Info */}
                                <div className="mt-8 pt-6 border-t border-gray-700">
                                    <div className="flex flex-wrap gap-4">
                                        <a href={`mailto:${profile?.email || 'your@email.com'}`} className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                            </svg>
                                            <span>{profile?.email || 'your@email.com'}</span>
                                        </a>
                                        {profile?.phone && (
                                            <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                                                </svg>
                                                <span>{profile.phone}</span>
                                            </a>
                                        )}
                                        {profile?.location && (
                                            <div className="flex items-center space-x-2 text-gray-400">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                                                </svg>
                                                <span>{profile.location}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Skills Section */}
                        <div className={`transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
                                <h3 className="text-2xl font-bold mb-8 text-white">Skills & Expertise</h3>
                                <div className="space-y-6">
                                    {skills.map((skill, index) => (
                                        <div key={skill.name} className="relative">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-gray-300 font-medium">{skill.name}</span>
                                                <span className="text-gray-400 text-sm">{skill.level}%</span>
                                            </div>
                                            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                                                <div
                                                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                                                    style={{
                                                        width: isVisible ? `${skill.level}%` : '0%',
                                                        transitionDelay: `${600 + index * 150}ms`
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Achievement Stats */}
                                <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-700">
                                    {[
                                        { number: `${projectCount}+`, label: 'Projects' },
                                        { number: `${profile?.yearsExperience || 3}+`, label: 'Years Exp' },
                                        { number: '100%', label: 'Success Rate' }
                                    ].map((stat, index) => (
                                        <div key={stat.label} className="text-center">
                                            <div className="text-2xl font-bold text-blue-400">{stat.number}</div>
                                            <div className="text-gray-400 text-sm">{stat.label}</div>
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
