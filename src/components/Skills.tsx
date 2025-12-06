
import { profileData } from '../data/profile';

export const Skills = () => {
    return (
        <section id="skills" className="py-20 bg-gray-800">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center">
                    Technical Skills
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {profileData.skills.map((skill) => {
                        const Icon = skill.icon;
                        return (
                            <div key={skill.name} className="bg-gray-900 p-8 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all group hover:-translate-y-1">
                                <div className={`w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${skill.color}`}>
                                    <Icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{skill.name}</h3>
                                <p className="text-gray-400 text-sm">
                                    Experienced with {skill.name.split(' & ').join(', ')} and related technologies.
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
