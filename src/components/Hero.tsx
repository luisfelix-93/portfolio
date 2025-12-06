import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

import { profileData } from '../data/profile';
import { getUser } from '../services/github';
// import resumeContent from '../../docs/resume.md?raw';

export const Hero = () => {
    const [avatarUrl, setAvatarUrl] = useState<string>('');

    useEffect(() => {
        const fetchUser = async () => {
            const username = 'luisfelix-93';
            const user = await getUser(username);
            if (user) {
                setAvatarUrl(user.avatar_url);
            }
        };

        fetchUser();
    }, []);

    // const handleDownloadCV = () => {
    //     const doc = new jsPDF();

    //     // Split text to fit page width
    //     const splitText = doc.splitTextToSize(resumeContent, 180);

    //     let y = 10;
    //     // Simple pagination handling
    //     for (let i = 0; i < splitText.length; i++) {
    //         if (y > 280) {
    //             doc.addPage();
    //             y = 10;
    //         }
    //         doc.text(splitText[i], 10, y);
    //         y += 7;
    //     }

    //     doc.save('resume.pdf');
    // };

    return (
        <section id="about" className="min-h-screen flex items-center pt-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex-1 space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-blue-400 font-medium tracking-wide text-lg animate-fade-in">
                                Hello, I'm
                            </h2>
                            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                                {profileData.name}
                            </h1>
                            <h3 className="text-2xl md:text-3xl text-gray-400 font-light">
                                {profileData.title}
                            </h3>
                        </div>

                        <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                            {profileData.about}
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <a
                                href="#contact"
                                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all flex items-center gap-2"
                            >
                                Contact Me <ArrowRight size={20} />
                            </a>
                            {/* <button
                                onClick={handleDownloadCV}
                                className="px-8 py-3 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white rounded-lg font-medium transition-all flex items-center gap-2 cursor-pointer"
                            >
                                Download CV <Download size={20} />
                            </button> */}
                        </div>
                    </div>

                    <div className="flex-1 flex justify-center md:justify-end">
                        <div className="relative w-72 h-72 md:w-96 md:h-96">
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
                            <div className="relative w-full h-full rounded-full border-2 border-gray-700 overflow-hidden bg-gray-800 flex items-center justify-center">
                                {avatarUrl ? (
                                    <img
                                        src={avatarUrl}
                                        alt={profileData.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-8xl">👨‍💻</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
