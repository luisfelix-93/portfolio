
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { profileData } from '../data/profile';

export const Footer = () => {
    return (
        <footer id="contact" className="bg-gray-900 border-t border-gray-800 py-12">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold text-white mb-2">{profileData.name}</h3>
                        <p className="text-gray-400">Building the future of cloud infrastructure.</p>
                    </div>

                    <div className="flex items-center space-x-6">
                        <a
                            href={profileData.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white transition-all"
                        >
                            <Github size={20} />
                        </a>
                        <a
                            href={profileData.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600/20 hover:text-blue-500 transition-all"
                        >
                            <Linkedin size={20} />
                        </a>
                        <a
                            href={`mailto:${profileData.social.email}`}
                            className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-purple-600/20 hover:text-purple-500 transition-all"
                        >
                            <Mail size={20} />
                        </a>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Made with <Heart size={14} className="text-red-500 fill-red-500" /> using React & Tailwind
                    </p>
                </div>
            </div>
        </footer>
    );
};
