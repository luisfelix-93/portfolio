
import { Calendar, Briefcase } from 'lucide-react';
import { profileData } from '../data/profile';

export const Experience = () => {
    return (
        <section id="experience" className="py-20 bg-gray-900">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center">
                    Professional Experience
                </h2>

                <div className="max-w-4xl mx-auto space-y-12">
                    {profileData.experience.map((exp) => (
                        <div key={exp.id} className="relative pl-8 md:pl-0">
                            {/* Timeline Line */}
                            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-800 -translate-x-1/2"></div>

                            <div className={`md:flex items-start justify-between gap-8 ${exp.id % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                {/* Timeline Dot */}
                                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-blue-500 rounded-full mt-1.5 md:-translate-x-1/2 ring-4 ring-gray-900"></div>

                                {/* Date - Desktop */}
                                <div className={`hidden md:block w-1/2 ${exp.id % 2 === 0 ? 'text-left' : 'text-right'}`}>
                                    <div className="inline-flex items-center gap-2 text-blue-400 font-medium bg-blue-500/10 px-4 py-1 rounded-full">
                                        <Calendar size={16} />
                                        {exp.period}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="md:w-1/2 space-y-4">
                                    <div className="md:hidden inline-flex items-center gap-2 text-blue-400 font-medium bg-blue-500/10 px-4 py-1 rounded-full mb-4">
                                        <Calendar size={16} />
                                        {exp.period}
                                    </div>

                                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Briefcase className="text-blue-500" size={20} />
                                            <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                                        </div>
                                        <p className="text-lg text-blue-400 mb-4">{exp.company}</p>

                                        <div className="space-y-2 text-gray-400 leading-relaxed">
                                            {exp.description.split('\n').map((line, i) => (
                                                <p key={i} className="text-sm">{line.trim()}</p>
                                            ))}
                                        </div>

                                        <div className="flex flex-wrap gap-2 mt-6">
                                            {exp.skills.map((skill) => (
                                                <span key={skill} className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
