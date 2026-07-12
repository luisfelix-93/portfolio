import { ExternalLink, FileText, Github } from 'lucide-react';

import { profileData } from '../data/profile';

export const Projects = () => {
    return (
        <section id="projects" className="py-20 bg-gray-800">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <p className="text-blue-400 font-medium tracking-wide text-sm uppercase mb-3">GitHub Pinned</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Featured Projects
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Repositories pinned to my GitHub profile, with direct access to the code and documentation for each project.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {profileData.featuredProjects.map((project) => (
                        <article key={project.name} className="group bg-gray-900 border border-gray-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all hover:-translate-y-1">
                            <div className="flex items-start justify-between gap-4 mb-6">
                                <div>
                                    <p className="text-gray-500 text-sm uppercase tracking-[0.2em] mb-2">Pinned project</p>
                                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                                        {project.name}
                                    </h3>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">
                                    {project.language}
                                </span>
                            </div>

                            <p className="text-gray-400 leading-relaxed mb-8">
                                Public pinned repository from the GitHub profile, with the project README as the primary documentation entrypoint.
                            </p>

                            <div className="flex flex-wrap gap-3">
                                <a
                                    href={project.repo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
                                >
                                    <Github size={16} />
                                    Repository
                                </a>
                                <a
                                    href={project.readme}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                                >
                                    <FileText size={16} />
                                    README
                                </a>
                                <a
                                    href={project.readme}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white transition-colors"
                                >
                                    <ExternalLink size={16} />
                                    Open docs
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};