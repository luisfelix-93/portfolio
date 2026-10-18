import React, { useState } from 'react';
import {
  Briefcase,
  Cpu,
  GraduationCap,
  HardDrive,
  Folder,
  FolderOpen,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  SlidersHorizontal,
  FileSpreadsheet,
  CheckCircle2,
  Award,
  Globe2,
  Building2,
  Calendar,
  MapPin,
} from 'lucide-react';
import { WindowFrame } from '../win2k';
import { profileData } from '../../data/profile';

const WINDOW_ID = 'mmc';
const MMC_MENUS = ['Console', 'Ação', 'Exibir', 'Favoritos', 'Ajuda'];

export type MmcTopicId = 'experience' | 'skills' | 'education';

interface MmcTopic {
  id: MmcTopicId;
  label: string;
  icon: React.ReactNode;
  category: string;
  description: string;
}

const TOPICS: MmcTopic[] = [
  {
    id: 'experience',
    label: 'Histórico Profissional',
    icon: <Briefcase className="w-3.5 h-3.5 text-blue-800 shrink-0" />,
    category: 'Ferramentas do Sistema',
    description: 'Linha do tempo de carreira, atuação em engenharia de plataforma e confiabilidade (SRE).',
  },
  {
    id: 'skills',
    label: 'Habilidades Técnicas & Métricas',
    icon: <Cpu className="w-3.5 h-3.5 text-green-700 shrink-0" />,
    category: 'Desempenho & Diagnóstico',
    description: 'Competências nucleares em Cloud/DevOps, telemetria de produção e SLAs cumpridos.',
  },
  {
    id: 'education',
    label: 'Formação & Certificações',
    icon: <GraduationCap className="w-3.5 h-3.5 text-purple-700 shrink-0" />,
    category: 'Registros do Sistema',
    description: 'Graduação em Engenharia, programa internacional na França e proficiência em idiomas.',
  },
];

interface ToolbarButtonProps {
  icon: React.ReactNode;
  label: string;
  disabled?: boolean;
  active?: boolean;
  onClick?: () => void;
  title?: string;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  icon,
  label,
  disabled = false,
  active = false,
  onClick,
  title,
}) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onClick}
    title={title || label}
    className={`flex items-center gap-1 px-1.5 py-0.5 text-win-caption rounded-none select-none transition-none ${
      disabled
        ? 'opacity-50 cursor-not-allowed text-gray-500'
        : active
        ? 'bevel-inset-thin bg-win-face font-bold'
        : 'hover:bevel-outset-thin active:bevel-inset-thin cursor-default'
    }`}
  >
    <span className="shrink-0">{icon}</span>
    <span>{label}</span>
  </button>
);

export const MmcWindow: React.FC = () => {
  const [activeTopic, setActiveTopic] = useState<MmcTopicId>('experience');
  const [isTreeExpanded, setIsTreeExpanded] = useState(true);

  const currentTopic = TOPICS.find((t) => t.id === activeTopic) || TOPICS[0];

  const getRecordCount = () => {
    switch (activeTopic) {
      case 'experience':
        return `${profileData.experience.length} Registro(s)`;
      case 'skills':
        return `${profileData.skills.length + profileData.technicalMetrics.length} Indicadores`;
      case 'education':
        return `${profileData.education.length + profileData.languages.length} Qualificações`;
      default:
        return '0 Registros';
    }
  };

  return (
    <WindowFrame
      id={WINDOW_ID}
      menuItems={MMC_MENUS}
      contentClassName="bg-win-face text-black flex flex-col overflow-hidden"
      statusBar={
        <div className="flex items-center w-full gap-1 text-win-caption">
          {/* Célula 1: Localização na Árvore */}
          <div className="bevel-inset-thin px-2 py-0.5 flex-1 truncate bg-win-face flex items-center gap-1.5">
            <HardDrive className="w-3 h-3 text-gray-600 shrink-0" />
            <span className="truncate">
              Raiz do Console \ Gerenciamento do Computador (Local) \ {currentTopic.label}
            </span>
          </div>

          {/* Célula 2: Contagem de Registros */}
          <div className="bevel-inset-thin px-2 py-0.5 w-32 truncate bg-win-face hidden sm:flex items-center gap-1 text-gray-700">
            <span>{getRecordCount()}</span>
          </div>

          {/* Célula 3: Status do Snap-in */}
          <div className="bevel-inset-thin px-2 py-0.5 w-44 truncate bg-win-face flex items-center gap-1 text-gray-700">
            <CheckCircle2 className="w-3 h-3 text-green-600 shrink-0" />
            <span>Snap-in MMC Ativo</span>
          </div>

          {/* Célula 4: Versão do Console */}
          <div className="bevel-inset-thin px-1.5 py-0.5 shrink-0 bg-win-face flex items-center justify-center">
            <span className="text-[10px] text-gray-600 font-bold">MMC v1.2</span>
          </div>
        </div>
      }
    >
      {/* 1. Barra de Ferramentas Retrô MMC */}
      <div className="bg-win-face p-1 border-b border-win-shadow/40 flex items-center gap-1 overflow-x-auto shrink-0 select-none">
        <ToolbarButton
          icon={<ArrowLeft className="w-3.5 h-3.5" />}
          label="Voltar"
          disabled={activeTopic === 'experience'}
          onClick={() => {
            const currentIndex = TOPICS.findIndex((t) => t.id === activeTopic);
            if (currentIndex > 0) setActiveTopic(TOPICS[currentIndex - 1].id);
          }}
        />
        <ToolbarButton
          icon={<ArrowRight className="w-3.5 h-3.5" />}
          label="Avançar"
          disabled={activeTopic === 'education'}
          onClick={() => {
            const currentIndex = TOPICS.findIndex((t) => t.id === activeTopic);
            if (currentIndex < TOPICS.length - 1) setActiveTopic(TOPICS[currentIndex + 1].id);
          }}
        />
        <ToolbarButton
          icon={<ArrowUp className="w-3.5 h-3.5 text-blue-700" />}
          label="Subir"
          onClick={() => setActiveTopic('experience')}
        />

        <div className="h-4 border-l border-win-shadow border-r border-win-light mx-1 shrink-0" />

        <ToolbarButton
          icon={<SlidersHorizontal className="w-3.5 h-3.5 text-gray-700" />}
          label="Propriedades"
          onClick={() => {}}
        />
        <ToolbarButton
          icon={<FileSpreadsheet className="w-3.5 h-3.5 text-green-800" />}
          label="Exportar Lista..."
          onClick={() => {}}
        />
      </div>

      {/* 2. Painel Dividido do Console (Esquerda: Índice de Tópicos | Direita: Conteúdo) */}
      <div className="flex-1 flex overflow-hidden m-0.5 bevel-inset bg-white">
        {/* Painel Esquerdo: Índice de Tópicos / Árvore de Console */}
        <aside
          aria-label="Árvore do Console"
          className="w-52 sm:w-60 shrink-0 border-r border-win-shadow bg-white flex flex-col overflow-hidden"
        >
          {/* Cabeçalho do Painel Lateral */}
          <div className="bg-win-face px-2 py-1 border-b border-win-shadow/50 flex items-center justify-between text-win-caption select-none">
            <span className="font-bold text-gray-800">Raiz do Console</span>
          </div>

          {/* Árvore de Console */}
          <div className="flex-1 overflow-auto p-1 bg-white select-none text-win-caption">
            {/* Nó Raiz */}
            <div className="flex items-center gap-1 py-[2px] cursor-default font-bold text-gray-900">
              <HardDrive className="w-3.5 h-3.5 text-gray-700 shrink-0" />
              <span>Gerenciamento do Computador</span>
            </div>

            {/* Sub-nó: Ferramentas do Sistema */}
            <div className="pl-3 mt-1">
              <div
                className="flex items-center gap-1 py-[2px] cursor-default text-gray-800"
                onClick={() => setIsTreeExpanded(!isTreeExpanded)}
              >
                <button
                  type="button"
                  className="w-2.5 h-2.5 border border-win-shadow bg-white text-black text-[9px] font-mono leading-none flex items-center justify-center shrink-0 cursor-default"
                  aria-label={isTreeExpanded ? 'Recolher pasta' : 'Expandir pasta'}
                >
                  {isTreeExpanded ? '-' : '+'}
                </button>
                {isTreeExpanded ? (
                  <FolderOpen className="w-3.5 h-3.5 text-yellow-500 fill-yellow-400 shrink-0" />
                ) : (
                  <Folder className="w-3.5 h-3.5 text-yellow-500 fill-yellow-400 shrink-0" />
                )}
                <span>Console Administrativo</span>
              </div>

              {/* Tópicos Folha */}
              {isTreeExpanded && (
                <div className="pl-4 mt-0.5 flex flex-col gap-0.5">
                  {TOPICS.map((topic) => {
                    const isSelected = activeTopic === topic.id;
                    return (
                      <div
                        key={topic.id}
                        onClick={() => setActiveTopic(topic.id)}
                        className={`flex items-center gap-1.5 px-1.5 py-1 cursor-default truncate ${
                          isSelected
                            ? 'bg-win-selection text-white font-normal'
                            : 'hover:bg-blue-100/60 text-black'
                        }`}
                      >
                        {topic.icon}
                        <span className="truncate">{topic.label}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Painel Direito: Conteúdo do Tópico Selecionado */}
        <main className="flex-1 overflow-auto bg-white p-3.5 flex flex-col select-none">
          {/* Cabeçalho do Tópico Selecionado */}
          <div className="mb-3 pb-2 border-b border-win-soft flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                {currentTopic.icon}
                <h2 className="font-bold text-win-headline text-win-selection">{currentTopic.label}</h2>
              </div>
              <p className="text-win-caption text-gray-600 mt-0.5">{currentTopic.description}</p>
            </div>
            <span className="text-[10px] bg-win-face border border-win-shadow px-2 py-0.5 font-mono text-gray-700 shrink-0">
              {getRecordCount()}
            </span>
          </div>

          {/* 1. TÓPICO: HISTÓRICO PROFISSIONAL */}
          {activeTopic === 'experience' && (
            <div className="flex flex-col gap-3">
              {profileData.experience.map((exp) => (
                <article
                  key={exp.id}
                  className="bevel-inset-thin p-3 bg-[#FAF9F5] flex flex-col gap-2"
                >
                  {/* Cabeçalho da Experiência: Cargo, Empresa e Status */}
                  <div className="flex flex-wrap justify-between items-start gap-1 border-b border-win-soft/60 pb-1.5">
                    <div className="flex items-start gap-1.5 min-w-0">
                      <Briefcase className="w-4 h-4 text-win-selection shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-bold text-win-title text-black leading-snug">{exp.role}</h3>
                        <div className="flex items-center gap-1.5 text-win-caption text-gray-700 mt-0.5">
                          <span className="font-bold text-win-selection flex items-center gap-1">
                            <Building2 className="w-3 h-3 text-win-selection shrink-0" />
                            {exp.company}
                          </span>
                          {exp.location && (
                            <>
                              <span className="text-gray-400">•</span>
                              <span className="text-gray-600 flex items-center gap-0.5">
                                <MapPin className="w-3 h-3 text-gray-500 shrink-0" />
                                {exp.location}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 ml-auto sm:ml-0">
                      {exp.isCurrent && (
                        <span className="text-[10px] bg-green-100 text-green-800 px-1.5 py-0.2 border border-green-300 font-mono font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
                          Atual
                        </span>
                      )}
                      <span className="text-[10px] bg-win-face border border-win-shadow px-1.5 py-0.2 font-mono text-gray-700 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-600 shrink-0" />
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  {/* Bullets / Conquistas Técnicas */}
                  <div className="text-win-body text-gray-800">
                    {exp.highlights && exp.highlights.length > 0 ? (
                      <ul className="flex flex-col gap-1 pl-1">
                        {exp.highlights.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                            <span className="text-win-selection font-bold select-none text-[10px] mt-0.5 leading-none">
                              ▸
                            </span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="whitespace-pre-line leading-relaxed">{exp.description}</p>
                    )}
                  </div>

                  {/* Tags de Tecnologias / Competências */}
                  {exp.skills && exp.skills.length > 0 && (
                    <div className="mt-1 pt-1.5 border-t border-win-soft/50 flex flex-wrap items-center gap-1">
                      <span className="text-[10px] font-bold text-gray-600 mr-1">Stack:</span>
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="bevel-outset-thin bg-win-face text-black px-1.5 py-0.2 text-[9px] font-mono hover:bg-white"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}

          {/* 2. TÓPICO: HABILIDADES TÉCNICAS & MÉTRICAS */}
          {activeTopic === 'skills' && (
            <div className="flex flex-col gap-3.5">
              <div>
                <h3 className="font-bold text-win-title text-win-selection mb-2 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-blue-700" />
                  Métricas Operacionais & SLAs de Produção
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {profileData.technicalMetrics.map((metric) => (
                    <div key={metric.label} className="bevel-outset-thin p-2 bg-win-face flex flex-col">
                      <span className="text-win-caption text-gray-600">{metric.label}</span>
                      <span className="font-bold text-win-headline text-win-selection font-mono">
                        {metric.value}
                      </span>
                      <span className="text-[10px] text-gray-700 mt-0.5">{metric.detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-win-title text-win-selection mb-2 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-green-700" />
                  Competências Centrais
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {profileData.skills.map((skill) => (
                    <div key={skill.name} className="bevel-inset-thin p-2 bg-[#FAF9F5] flex items-center gap-2">
                      <div className="w-2.5 h-2.5 bg-win-selection shrink-0" />
                      <span className="font-bold text-win-body text-gray-900">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. TÓPICO: FORMAÇÃO & CERTIFICAÇÕES */}
          {activeTopic === 'education' && (
            <div className="flex flex-col gap-3.5">
              <div>
                <h3 className="font-bold text-win-title text-win-selection mb-2 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-purple-700" />
                  Formação Acadêmica
                </h3>
                <div className="flex flex-col gap-2">
                  {profileData.education.map((edu) => (
                    <div key={edu.id} className="bevel-inset-thin p-2.5 bg-[#FAF9F5] flex flex-col gap-0.5">
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-win-title text-black">{edu.degree}</span>
                        <span className="text-[10px] bg-green-100 text-green-800 px-1.5 py-0.2 border border-green-300 font-mono">
                          {edu.status}
                        </span>
                      </div>
                      <span className="font-bold text-win-selection">{edu.institution}</span>
                      <span className="text-win-caption text-gray-600">{edu.location}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-win-title text-win-selection mb-2 flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5 text-cyan-700" />
                  Proficiência em Idiomas
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {profileData.languages.map((lang) => (
                    <div key={lang.language} className="bevel-outset-thin p-2 bg-win-face text-center">
                      <span className="font-bold text-win-body block text-win-selection">{lang.language}</span>
                      <span className="text-win-caption text-gray-700 block mt-0.5 font-mono">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </WindowFrame>
  );
};
