
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { profileData } from '../data/profile';
import React from 'react';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const navigation = [
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Experience', href: '#experience' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <header className="fixed w-full bg-gray-900/95 backdrop-blur-sm z-50 border-b border-gray-800">
            <nav className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <a href="#" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                        LF
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                            >
                                {item.name}
                            </a>
                        ))}
                        <div className="flex items-center space-x-4 border-l border-gray-700 pl-8">
                            <a href={profileData.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <Github size={20} />
                            </a>
                            <a href={profileData.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                                <Linkedin size={20} />
                            </a>
                            <a href={`mailto:${profileData.social.email}`} className="text-gray-400 hover:text-purple-400 transition-colors">
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-300 hover:text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4">
                        <div className="flex flex-col space-y-4">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </a>
                            ))}
                            <div className="flex items-center space-x-6 pt-4 border-t border-gray-800">
                                <a href={profileData.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                    <Github size={20} />
                                </a>
                                <a href={profileData.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
                                    <Linkedin size={20} />
                                </a>
                                <a href={`mailto:${profileData.social.email}`} className="text-gray-400 hover:text-purple-400">
                                    <Mail size={20} />
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};
