import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Folder,
  LayoutGrid,
  Search,
  CheckCircle2,
  HardDrive,
} from 'lucide-react';
import { WindowFrame } from '../win2k';
import { profileData } from '../../data/profile';

const WINDOW_ID = 'explorer';
const EXPLORER_MENUS = ['Arquivo', 'Editar', 'Exibir', 'Favoritos', 'Ferramentas', 'Ajuda'];

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

export const ExplorerWindow: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('C:\\Projetos\\Destaques');
  const [pathInput, setPathInput] = useState('C:\\Projetos\\Destaques');
  const [viewMode, setViewMode] = useState<'icons' | 'details'>('icons');
  const [canGoBack] = useState(false);
  const [canGoForward] = useState(false);

  const handleNavigate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setCurrentPath(pathInput);
  };

  const projectCount = profileData.featuredProjects.length;

  return (
    <WindowFrame
      id={WINDOW_ID}
      menuItems={EXPLORER_MENUS}
      contentClassName="bg-win-face text-black flex flex-col overflow-hidden"
      statusBar={
        <div className="flex items-center w-full gap-1 text-win-caption">
          {/* Célula 1: Contagem de Objetos */}
          <div className="bevel-inset-thin px-2 py-0.5 flex-1 truncate bg-win-face flex items-center gap-1.5">
            <Folder className="w-3 h-3 text-yellow-600 fill-yellow-500 shrink-0" />
            <span>{projectCount} objeto(s) selecionado(s)</span>
          </div>

          {/* Célula 2: Tamanho / Disco */}
          <div className="bevel-inset-thin px-2 py-0.5 w-28 truncate bg-win-face hidden sm:flex items-center gap-1 text-gray-700">
            <HardDrive className="w-3 h-3 text-gray-500 shrink-0" />
            <span>256 KB</span>
          </div>

          {/* Célula 3: Sincronização GitHub & Zona de Segurança */}
          <div className="bevel-inset-thin px-2 py-0.5 w-44 truncate bg-win-face flex items-center gap-1 text-gray-700">
            <CheckCircle2 className="w-3 h-3 text-green-600 shrink-0" />
            <span>100% sincronizado (GitHub)</span>
          </div>

          {/* Célula 4: Ícone Meu Computador */}
          <div className="bevel-inset-thin px-1.5 py-0.5 shrink-0 bg-win-face flex items-center justify-center">
            <span className="text-[10px] text-gray-600 font-bold">Meu Computador</span>
          </div>
        </div>
      }
    >
      {/* 1. Barra de Ferramentas Retrô Win2K */}
      <div className="bg-win-face p-1 border-b border-win-shadow/40 flex items-center gap-1 overflow-x-auto shrink-0 select-none">
        <ToolbarButton
          icon={<ArrowLeft className="w-3.5 h-3.5" />}
          label="Voltar"
          disabled={!canGoBack}
        />
        <ToolbarButton
          icon={<ArrowRight className="w-3.5 h-3.5" />}
          label="Avançar"
          disabled={!canGoForward}
        />
        <ToolbarButton
          icon={<ArrowUp className="w-3.5 h-3.5 text-blue-700" />}
          label="Subir"
          onClick={() => {
            const parent = 'C:\\Projetos';
            setCurrentPath(parent);
            setPathInput(parent);
          }}
        />

        <div className="h-4 border-l border-win-shadow border-r border-win-light mx-1 shrink-0" />

        <ToolbarButton
          icon={<Search className="w-3.5 h-3.5 text-yellow-700" />}
          label="Pesquisar"
          onClick={() => {}}
        />
        <ToolbarButton
          icon={<Folder className="w-3.5 h-3.5 text-yellow-500 fill-yellow-400" />}
          label="Pastas"
          active={true}
        />

        <div className="h-4 border-l border-win-shadow border-r border-win-light mx-1 shrink-0" />

        <ToolbarButton
          icon={<LayoutGrid className="w-3.5 h-3.5" />}
          label="Visualizar"
          onClick={() => setViewMode(viewMode === 'icons' ? 'details' : 'icons')}
          title={`Modo de Exibição: ${viewMode === 'icons' ? 'Ícones' : 'Detalhes'}`}
        />
      </div>

      {/* 2. Barra de Endereços */}
      <form
        onSubmit={handleNavigate}
        className="bg-win-face px-1.5 py-1 border-b border-win-shadow/40 flex items-center gap-1.5 text-win-caption shrink-0 select-none"
      >
        <span className="text-gray-700 font-normal">Endereço</span>
        <div className="bevel-inset-thin bg-white flex-1 flex items-center px-1 py-0.5 gap-1.5 h-5">
          <Folder className="w-3.5 h-3.5 text-yellow-500 fill-yellow-400 shrink-0" />
          <input
            type="text"
            value={pathInput}
            onChange={(e) => setPathInput(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-win-body font-win text-black p-0 select-text"
            aria-label="Caminho da pasta"
          />
        </div>
        <button
          type="submit"
          className="win-button text-win-caption px-2 py-0.5 h-5 shrink-0 flex items-center gap-1"
        >
          <span>Ir</span>
        </button>
      </form>

      {/* 3. Área de Conteúdo / Visualização de Arquivos (Base pronta para 4.2 e 4.3) */}
      <div className="flex-1 overflow-auto bg-white p-3 bevel-inset m-0.5">
        <div className="mb-3 pb-2 border-b border-win-soft flex justify-between items-center text-win-caption text-gray-500">
          <span>{currentPath}</span>
          <span>Visualização: {viewMode === 'icons' ? 'Ícones Grandes' : 'Detalhes'}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {profileData.featuredProjects.map((p) => (
            <div
              key={p.name}
              className="bevel-outset p-2.5 bg-win-face flex flex-col justify-between hover:border-win-selection transition-none select-none"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <Folder className="w-4 h-4 text-yellow-500 fill-yellow-400 shrink-0" />
                  <h3 className="font-bold text-win-title text-win-selection truncate">{p.name}</h3>
                </div>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="text-[10px] bg-win-selection text-white px-1.5 py-0.2 font-mono">
                    {p.language}
                  </span>
                  <span className="text-[10px] text-gray-600">Repositório Git</span>
                </div>
              </div>

              <div className="flex gap-2 mt-3 pt-2 border-t border-win-soft/60">
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="win-button text-win-caption flex-1 text-center"
                >
                  Repositório
                </a>
                {p.readme && (
                  <a
                    href={p.readme}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="win-button text-win-caption"
                  >
                    README
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </WindowFrame>
  );
};
