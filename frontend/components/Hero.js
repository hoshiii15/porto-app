import { useState, useEffect } from 'react';

const Hero = ({ name, bio }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [showScrollIndicator, setShowScrollIndicator] = useState(true);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setIsVisible(true);

        // Hide scroll indicator after 3 seconds
        const scrollTimer = setTimeout(() => {
            setShowScrollIndicator(false);
        }, 3000);

        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearTimeout(scrollTimer);
        };
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
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

                {/* Scroll Indicator - Only show for first 3 seconds */}
                {showScrollIndicator && (
                    <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="flex flex-col items-center space-y-2 text-gray-400">
                            <span className="text-sm font-medium">Scroll Down</span>
                            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                                <div className="w-1 h-3 bg-gray-400 rounded-full animate-bounce mt-2"></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Hero;
