import { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = ({ profile }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    const appName = profile?.name ? `${profile.name} Portfolio` : 'Portfolio';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Update active section based on scroll position
            const sections = ['hero', 'about', 'projects'];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });
            setActiveSection(current || '');
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '#about', label: 'About' },
        { href: '#projects', label: 'Projects' },
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
            ? 'bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50 shadow-lg shadow-black/20'
            : 'bg-transparent'
            }`}>
            {/* Animated top border */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 transform scale-x-0 transition-transform duration-500 origin-left group-hover:scale-x-100"></div>
            
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center py-4">
                    {/* Enhanced Logo */}
                    <Link href="/" className="group flex items-center space-x-2">
                        <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center overflow-hidden">
                            <span className="text-white font-bold text-lg relative z-10">{profile?.name ? profile.name.charAt(0).toUpperCase() : 'P'}</span>
                            {/* Logo animation overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            {/* Floating particles in logo */}
                            <div className="absolute top-1 right-1 w-1 h-1 bg-white/60 rounded-full animate-pulse"></div>
                            <div className="absolute bottom-1 left-1 w-0.5 h-0.5 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                            {appName}
                        </span>
                    </Link>

                    {/* Enhanced Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link, index) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className={`relative px-4 py-2 font-medium transition-all duration-300 hover:text-blue-400 group ${activeSection === link.href.slice(1) ? 'text-blue-400' : 'text-gray-300'
                                    }`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Link text with hover effect */}
                                <span className="relative z-10">{link.label}</span>
                                
                                {/* Animated background on hover */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                
                                {/* Bottom indicator line */}
                                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform transition-transform duration-300 ${activeSection === link.href.slice(1) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                    }`}></span>
                            </a>
                        ))}

                        {/* Enhanced CTA Button */}
                        <a
                            href="#contact"
                            className="group relative inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-full overflow-hidden transition-all duration-300 hover:from-blue-500 hover:to-purple-500 hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Get In Touch
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                            
                            {/* Button glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300"></div>
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center"
                    >
                        <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                        <span className={`w-6 h-0.5 bg-white my-1 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                    <div className="py-4 space-y-2 border-t border-gray-800/50 bg-gray-900/95 backdrop-blur-xl rounded-b-xl">
                        {navLinks.map((link, index) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-3 text-gray-300 hover:text-blue-400 hover:bg-gray-800/50 rounded-lg transition-all duration-300 transform hover:translate-x-2"
                                style={{ transitionDelay: `${index * 50}ms` }}
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-4 py-3 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 mt-4"
                        >
                            Get In Touch
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
