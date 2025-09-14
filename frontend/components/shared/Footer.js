import { useState, useEffect } from 'react';
import { getSocialLinks } from '../../utils/api';

const Footer = ({ profile }) => {
    const [socialLinks, setSocialLinks] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [lineWidth, setLineWidth] = useState(0);
    const currentYear = new Date().getFullYear();
    const appName = profile?.name ? `${profile.name} Portfolio` : 'Portfolio';

    useEffect(() => {
        fetchSocialLinks();
        
        // Throttle function for smooth scroll performance
        let ticking = false;
        
        // Enhanced scroll tracking for line animation
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const footer = document.getElementById('footer');
                    if (!footer) {
                        ticking = false;
                        return;
                    }

                    const rect = footer.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
                    
                    // Calculate how much of the footer is visible with more gradual progression
                    const footerTop = rect.top;
                    const footerHeight = rect.height;
                    
                    // Start animation when footer is 50% into view, complete when fully visible
                    const startPoint = windowHeight * 0.8; // Start when footer is 80% down the viewport
                    const endPoint = windowHeight * 0.2;   // Complete when footer is 20% from top
                    
                    let visibilityRatio = 0;
                    if (footerTop <= startPoint) {
                        const progress = Math.max(0, startPoint - footerTop);
                        const totalDistance = startPoint - endPoint;
                        visibilityRatio = Math.min(progress / totalDistance, 1);
                    }
                    
                    // Apply easing function for smoother animation
                    const easedRatio = 1 - Math.pow(1 - visibilityRatio, 3); // Cubic ease-out
                    
                    // Animate line width from 0% to 100% with smoother progression
                    const newLineWidth = easedRatio * 100;
                    setLineWidth(newLineWidth);
                    
                    ticking = false;
                });
                ticking = true;
            }
        };

        // Intersection Observer for footer animation
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Start line animation when footer becomes visible
                    handleScroll();
                } else {
                    setLineWidth(0);
                }
            },
            { threshold: 0.1 }
        );

        const footer = document.getElementById('footer');
        if (footer) {
            observer.observe(footer);
        }

        // Add scroll listener for dynamic line width
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Initial check
        handleScroll();

        return () => {
            if (footer) {
                observer.unobserve(footer);
            }
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const fetchSocialLinks = async () => {
        try {
            const response = await getSocialLinks();
            setSocialLinks(response.data || []);
        } catch (error) {
            console.error('Failed to fetch social links:', error);
        }
    };

    // Auto-detect social platform and return appropriate icon
    const getSocialIcon = (name) => {
        const lowercaseName = name.toLowerCase();

        if (lowercaseName.includes('github')) {
            return (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
            );
        }

        if (lowercaseName.includes('linkedin')) {
            return (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            );
        }

        if (lowercaseName.includes('twitter') || lowercaseName.includes('x')) {
            return (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
            );
        }

        if (lowercaseName.includes('instagram')) {
            return (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            );
        }

        if (lowercaseName.includes('email') || lowercaseName.includes('mail')) {
            return (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            );
        }

        // Default icon for unknown platforms
        return (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
        );
    };

    const quickLinks = [
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Admin', href: '/admin' },
    ];

    return (
        <footer id="footer" className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-black border-t border-gray-800/50 overflow-hidden">
            {/* Enhanced Background Decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-morphing-blob"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-morphing-blob" style={{ animationDelay: '3s' }}></div>
                
                {/* Wave pattern */}
                <div className="absolute top-0 left-0 w-full">
                    <svg className="w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0V6c0,21.6,291,111.46,741,110.26,445.39-1.2,459-108.75,459-110.26V0Z" className="fill-gray-800/30 animate-pulse"></path>
                    </svg>
                </div>
                
                {/* Floating tech elements */}
                <div className="absolute top-20 right-20 animate-float" style={{ animationDelay: '1s' }}>
                    <div className="w-8 h-8 text-blue-400/20">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                    </div>
                </div>
                
                <div className="absolute bottom-20 left-20 animate-orbit" style={{ animationDuration: '25s' }}>
                    <div className="w-6 h-6 text-purple-400/20">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                        </svg>
                    </div>
                </div>
            </div>

            <div className={`container mx-auto px-6 py-16 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Enhanced Brand Section */}
                    <div className="md:col-span-2">
                        <div className="flex items-center space-x-3 mb-6 group">
                            <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center overflow-hidden">
                                <span className="text-white font-bold text-xl relative z-10">{profile?.name ? profile.name.charAt(0).toUpperCase() : 'P'}</span>
                                {/* Logo glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/50 to-blue-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                {/* Floating sparkles */}
                                <div className="absolute top-1 right-1 w-1 h-1 bg-white/80 rounded-full animate-pulse"></div>
                                <div className="absolute bottom-1 left-1 w-0.5 h-0.5 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                                {appName}
                            </span>
                        </div>
                        <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-md">
                            {profile?.description || 'A passionate developer crafting digital experiences with modern technologies and creative solutions.'}
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={social._id}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-gray-800/50 hover:bg-gradient-to-br hover:from-blue-600/20 hover:to-purple-600/20 border border-gray-700/50 hover:border-blue-500/50 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group"
                                    aria-label={social.name}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="relative">
                                        {getSocialIcon(social.name)}
                                        {/* Icon glow effect */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-sm">
                                            {getSocialIcon(social.name)}
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Enhanced Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6 relative">
                            Quick Links
                            <div className="absolute -top-1 -right-2 w-2 h-2 bg-blue-400/60 rounded-full animate-pulse"></div>
                        </h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:translate-x-2 inline-block group relative"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <span className="relative z-10">{link.name}</span>
                                        {/* Link hover effect */}
                                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Enhanced Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6 relative">
                            Get In Touch
                            <div className="absolute -top-1 -right-2 w-2 h-2 bg-purple-400/60 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3 text-gray-400 hover:text-blue-400 transition-colors group">
                                <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span>{profile?.email || 'your@email.com'}</span>
                            </div>
                            {profile?.phone && (
                                <div className="flex items-center space-x-3 text-gray-400 hover:text-green-400 transition-colors group">
                                    <div className="p-2 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
                                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <span>{profile.phone}</span>
                                </div>
                            )}
                            <div className="flex items-center space-x-3 text-gray-400 hover:text-purple-400 transition-colors group">
                                <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <span>{profile?.location || 'Your City, Country'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Bottom Section */}
                <div className="mt-12 pt-8 border-t border-gray-800/50 relative">
                    {/* Dynamic Decorative Line that widens on scroll - FULL VIEWPORT WIDTH */}
                    <div 
                        className="absolute left-0 h-1 z-20 pointer-events-none overflow-visible"
                        style={{ 
                            top: '0',
                            width: '100vw',
                            marginLeft: 'calc(-50vw + 50%)',
                            transform: 'translateY(-100%)'
                        }}
                    >
                        <div 
                            className="h-full relative"
                            style={{ 
                                width: `${lineWidth}%`,
                                background: 'linear-gradient(90deg, #9333ea 0%, #3b82f6 50%, #9333ea 100%)',
                                transition: 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                boxShadow: lineWidth > 50 ? '0 0 15px rgba(147, 51, 234, 0.8)' : '0 0 8px rgba(147, 51, 234, 0.4)',
                                marginLeft: `${(100 - lineWidth) / 2}%`
                            }}
                        >
                            {/* Shimmer overlay */}
                            {lineWidth > 20 && (
                                <div 
                                    className="absolute inset-0 opacity-50"
                                    style={{
                                        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                                        backgroundSize: '200% 100%',
                                        animation: 'shimmer 2s infinite'
                                    }}
                                ></div>
                            )}
                        </div>
                        {/* Enhanced Glowing effect layer */}
                        <div 
                            className="absolute top-0 h-full blur-md"
                            style={{ 
                                width: `${lineWidth}%`,
                                background: 'linear-gradient(90deg, rgba(147, 51, 234, 0.6) 0%, rgba(59, 130, 246, 0.6) 50%, rgba(147, 51, 234, 0.6) 100%)',
                                transition: 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                opacity: lineWidth > 30 ? 0.8 : 0.4,
                                marginLeft: `${(100 - lineWidth) / 2}%`
                            }}
                        ></div>
                        {/* Animated sparkles at both ends */}
                        {lineWidth > 10 && (
                            <>
                                {/* Left sparkle */}
                                <div 
                                    className="absolute top-1/2 w-3 h-3 bg-white rounded-full"
                                    style={{ 
                                        left: `${(100 - lineWidth) / 2}%`,
                                        opacity: lineWidth > 10 ? 1 : 0,
                                        transition: 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                        boxShadow: lineWidth > 50 ? '0 0 12px rgba(255, 255, 255, 0.9), 0 0 20px rgba(147, 51, 234, 0.6)' : '0 0 8px rgba(147, 51, 234, 0.8)',
                                        animation: lineWidth > 70 ? 'pulse 2s ease-in-out infinite' : 'none',
                                        transform: 'translateX(-50%) translateY(-50%)'
                                    }}
                                ></div>
                                {/* Right sparkle */}
                                <div 
                                    className="absolute top-1/2 w-3 h-3 bg-white rounded-full"
                                    style={{ 
                                        left: `${(100 + lineWidth) / 2}%`,
                                        opacity: lineWidth > 10 ? 1 : 0,
                                        transition: 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                        boxShadow: lineWidth > 50 ? '0 0 12px rgba(255, 255, 255, 0.9), 0 0 20px rgba(147, 51, 234, 0.6)' : '0 0 8px rgba(147, 51, 234, 0.8)',
                                        animation: lineWidth > 70 ? 'pulse 2s ease-in-out infinite' : 'none',
                                        transform: 'translateX(-50%) translateY(-50%)'
                                    }}
                                ></div>
                            </>
                        )}
                        {/* Additional particles when line is almost complete */}
                        {lineWidth > 80 && (
                            <>
                                {/* Left side particles */}
                                <div 
                                    className="absolute top-1/2 w-1 h-1 bg-purple-300 rounded-full animate-ping"
                                    style={{ 
                                        left: `${(100 - lineWidth) / 2 + 5}%`,
                                        animationDuration: '2s',
                                        transform: 'translateY(-50%)'
                                    }}
                                ></div>
                                <div 
                                    className="absolute top-1/2 w-1 h-1 bg-blue-300 rounded-full animate-ping"
                                    style={{ 
                                        left: `${(100 + lineWidth) / 2 - 5}%`, 
                                        animationDelay: '0.5s',
                                        animationDuration: '2s',
                                        transform: 'translateY(-50%)'
                                    }}
                                ></div>
                                {/* Center particle */}
                                <div 
                                    className="absolute top-1/2 left-1/2 w-2 h-2 bg-purple-300 rounded-full animate-ping"
                                    style={{ 
                                        animationDelay: '1s',
                                        animationDuration: '2s',
                                        transform: 'translateX(-50%) translateY(-50%)'
                                    }}
                                ></div>
                            </>
                        )}
                    </div>
                    
                    {/* Mobile-friendly footer content */}
                    <div className="flex flex-col space-y-4">
                        {/* Copyright */}
                        <p className="text-gray-400 text-center text-sm">
                            &copy; {currentYear} {appName}. All rights reserved.
                        </p>
                        
                        {/* Tech Stack - Mobile friendly */}
                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-400">
                            <div className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
                                <span>Built with</span>
                                <span className="text-blue-400 font-medium hover:animate-pulse">Next.js</span>
                                <span>&</span>
                                <span className="text-purple-400 font-medium hover:animate-pulse">Tailwind CSS</span>
                            </div>
                            
                            <div className="flex items-center space-x-1 hover:text-red-400 transition-colors group">
                                <span>Made with</span>
                                <svg className="w-4 h-4 text-red-500 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                                <span>by {profile?.name || 'Developer'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
