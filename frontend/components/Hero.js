import { useState, useEffect } from 'react';

const Hero = ({ name, bio }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setIsVisible(true);

        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.8) 1px, transparent 0)`,
                    backgroundSize: '50px 50px'
                }}></div>
            </div>
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
                <div
                    className="absolute inset-0 opacity-50"
                    style={{
                        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`,
                    }}
                />
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Original floating orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
                
                {/* Geometric decorative elements */}
                <div className="absolute top-20 left-10 w-16 h-16 border border-blue-400/30 rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
                <div className="absolute top-32 right-16 w-8 h-8 bg-gradient-to-r from-purple-400/40 to-blue-400/40 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-32 left-20 w-12 h-12 border-2 border-cyan-400/40 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                
                {/* Tech-themed floating icons */}
                <div className="absolute top-1/3 right-1/3 animate-float" style={{ animationDelay: '0.5s' }}>
                    <div className="w-8 h-8 text-blue-400/60">
                        <svg fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" clipRule="evenodd"></path>
                        </svg>
                    </div>
                </div>
                
                <div className="absolute bottom-1/3 left-1/4 animate-float" style={{ animationDelay: '1.5s' }}>
                    <div className="w-10 h-10 text-purple-400/60">
                        <svg fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"></path>
                        </svg>
                    </div>
                </div>
                
                {/* Code brackets decoration */}
                <div className="absolute top-1/4 left-8 text-6xl text-blue-400/20 font-mono animate-pulse">&lt;</div>
                <div className="absolute top-1/4 right-8 text-6xl text-blue-400/20 font-mono animate-pulse">&gt;</div>
                <div className="absolute bottom-1/4 left-12 text-4xl text-cyan-400/20 font-mono animate-pulse">{ }</div>
                
                {/* Particle dots */}
                <div className="absolute top-16 left-1/3 w-2 h-2 bg-blue-400/40 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-40 right-1/4 w-1 h-1 bg-purple-400/60 rounded-full animate-pulse" style={{ animationDelay: '1.2s' }}></div>
                <div className="absolute bottom-20 left-1/2 w-3 h-3 bg-cyan-400/30 rounded-full animate-bounce" style={{ animationDelay: '0.8s' }}></div>
                <div className="absolute bottom-40 right-1/3 w-1 h-1 bg-blue-400/50 rounded-full animate-ping" style={{ animationDelay: '1.8s' }}></div>
                
                {/* Gradient lines */}
                <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-blue-400/30 to-transparent animate-pulse"></div>
                <div className="absolute bottom-0 right-1/3 w-px h-40 bg-gradient-to-t from-transparent via-purple-400/30 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
                
                {/* Network connection lines */}
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                    <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
                            <stop offset="100%" stopColor="rgba(168, 85, 247, 0.2)" />
                        </linearGradient>
                    </defs>
                    <line x1="20%" y1="30%" x2="80%" y2="70%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-pulse" style={{ animationDuration: '4s' }} />
                    <line x1="80%" y1="20%" x2="20%" y2="80%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
                </svg>
            </div>

            <div className="relative z-10 container mx-auto px-6 text-center">
                {/* Main Content */}
                <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {/* Greeting Animation */}
                    <div className="mb-6">
                        <span className="inline-block text-blue-400 text-lg md:text-xl font-medium tracking-wide">
                            Hello, I'm
                        </span>
                    </div>

                    {/* Name with Gradient */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-6">
                        <span className="bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent animate-gradient-x">
                            {name || 'Your Name'}
                        </span>
                    </h1>

                    {/* Animated Bio */}
                    <div className={`transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                            {bio || 'A brief and catchy description about yourself.'}
                        </p>
                    </div>

                    {/* Enhanced CTA Buttons */}
                    <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <a
                            href="#about"
                            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-500 hover:to-purple-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
                        >
                            <span className="relative z-10">About Me</span>
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        </a>

                        <a
                            href="#projects"
                            className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 border-2 border-white/20 rounded-full hover:border-white/40 hover:bg-white/5 transform hover:scale-105"
                        >
                            <span>View My Work</span>
                            <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
