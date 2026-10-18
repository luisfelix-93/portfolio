import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Folder,
  FolderOpen,
  LayoutGrid,
  Search,
  CheckCircle2,
  HardDrive,
  Monitor,
  X,
} from 'lucide-react';
import { WindowFrame } from '../win2k';
import { profileData } from '../../data/profile';

const WINDOW_ID = 'explorer';
const EXPLORER_MENUS = ['Arquivo', 'Editar', 'Exibir', 'Favoritos', 'Ferramentas', 'Ajuda'];

type ProjectCategory = 'all' | 'destaques' | 'devops' | 'fullstack' | 'tools';

interface TreeNode {
  id: string;
  label: string;
  path: string;
  type: 'computer' | 'drive' | 'folder';
  categoryKey?: ProjectCategory;
  children?: TreeNode[];
}

const FOLDER_TREE: TreeNode = {
  id: 'my-computer',
  label: 'Meu Computador',
  path: 'Meu Computador',
  type: 'computer',
  children: [
    {
      id: 'drive-c',
      label: 'Disco Local (C:)',
      path: 'C:\\',
      type: 'drive',
      children: [
        {
          id: 'projects',
          label: 'Projetos',
          path: 'C:\\Projetos',
          type: 'folder',
          categoryKey: 'all',
          children: [
            {
              id: 'destaques',
              label: 'Destaques',
              path: 'C:\\Projetos\\Destaques',
              type: 'folder',
              categoryKey: 'destaques',
            },
            {
              id: 'devops',
              label: 'DevOps & Infra',
              path: 'C:\\Projetos\\DevOps & Infra',
              type: 'folder',
              categoryKey: 'devops',
            },
            {
              id: 'fullstack',
              label: 'Full-Stack & Bots',
              path: 'C:\\Projetos\\Full-Stack & Bots',
              type: 'folder',
              categoryKey: 'fullstack',
            },
            {
              id: 'tools',
              label: 'Ferramentas Go/Shell',
              path: 'C:\\Projetos\\Ferramentas Go/Shell',
              type: 'folder',
              categoryKey: 'tools',
            },
          ],
        },
      ],
    },
  ],
};

const getProjectsByCategory = (category: ProjectCategory) => {
  switch (category) {
    case 'devops':
      return profileData.featuredProjects.filter((p) =>
        ['lab-devops', 'load-tester'].includes(p.name)
      );
    case 'fullstack':
      return profileData.featuredProjects.filter((p) =>
        ['jobs-bot', 'support-agent'].includes(p.name)
      );
    case 'tools':
      return profileData.featuredProjects.filter((p) =>
        ['load-tester', 'jobs-bot', 'lab-devops'].includes(p.name)
      );
    case 'destaques':
    case 'all':
    default:
      return profileData.featuredProjects;
  }
};

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
  const [showFoldersPane, setShowFoldersPane] = useState(true);
  const [selectedNodeId, setSelectedNodeId] = useState('destaques');
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'my-computer': true,
    'drive-c': true,
    projects: true,
  });

  const toggleExpand = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  const handleSelectFolder = (node: TreeNode) => {
    setSelectedNodeId(node.id);
    setCurrentPath(node.path);
    setPathInput(node.path);
  };

  const handleNavigate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setCurrentPath(pathInput);
  };

  const handleGoUp = () => {
    if (currentPath.includes('\\')) {
      const parts = currentPath.split('\\');
      parts.pop();
      const parent = parts.length === 1 ? `${parts[0]}\\` : parts.join('\\');
      setCurrentPath(parent);
      setPathInput(parent);

      // Sincroniza a seleção na árvore se coincidir
      if (parent.toLowerCase().includes('projetos')) {
        setSelectedNodeId('projects');
      } else if (parent.startsWith('C:')) {
        setSelectedNodeId('drive-c');
      } else {
        setSelectedNodeId('my-computer');
      }
    }
  };

  // Determina categoria pelo nó selecionado ou pelo caminho atual
  const resolveActiveCategory = (): ProjectCategory => {
    if (selectedNodeId === 'devops' || currentPath.toLowerCase().includes('devops')) return 'devops';
    if (selectedNodeId === 'fullstack' || currentPath.toLowerCase().includes('full-stack')) return 'fullstack';
    if (selectedNodeId === 'tools' || currentPath.toLowerCase().includes('ferramentas')) return 'tools';
    return 'destaques';
  };

  const currentCategory = resolveActiveCategory();
  const visibleProjects = getProjectsByCategory(currentCategory);

  const renderTreeItem = (node: TreeNode, depth: number = 0) => {
    const isExpanded = !!expandedNodes[node.id];
    const isSelected = selectedNodeId === node.id;
    const hasChildren = node.children && node.children.length > 0;

    const renderIcon = () => {
      switch (node.type) {
        case 'computer':
          return <Monitor className="w-3.5 h-3.5 text-cyan-600 shrink-0" />;
        case 'drive':
          return <HardDrive className="w-3.5 h-3.5 text-gray-600 shrink-0" />;
        case 'folder':
        default:
          return isSelected || isExpanded ? (
            <FolderOpen className="w-3.5 h-3.5 text-yellow-500 fill-yellow-400 shrink-0" />
          ) : (
            <Folder className="w-3.5 h-3.5 text-yellow-500 fill-yellow-400 shrink-0" />
          );
      }
    };

    return (
      <div key={node.id} className="select-none text-win-caption">
        <div
          className={`flex items-center gap-1 py-[2px] cursor-default ${
            isSelected
              ? 'bg-win-selection text-white font-normal'
              : 'hover:bg-blue-100/60 text-black'
          }`}
          style={{ paddingLeft: `${depth * 14 + 4}px` }}
          onClick={() => handleSelectFolder(node)}
        >
          {/* Caixa de expansão [+] / [-] */}
          {hasChildren ? (
            <button
              type="button"
              onClick={(e) => toggleExpand(node.id, e)}
              className="w-2.5 h-2.5 border border-win-shadow bg-white text-black text-[9px] font-mono leading-none flex items-center justify-center shrink-0 cursor-default"
              aria-label={isExpanded ? 'Recolher pasta' : 'Expandir pasta'}
            >
              {isExpanded ? '-' : '+'}
            </button>
          ) : (
            <span className="w-2.5 shrink-0" />
          )}

          {renderIcon()}
          <span className="truncate leading-none pr-1">{node.label}</span>
        </div>

        {/* Subpastas */}
        {hasChildren && isExpanded && (
          <div>{node.children!.map((child) => renderTreeItem(child, depth + 1))}</div>
        )}
      </div>
    );
  };

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
            <span>{visibleProjects.length} objeto(s) selecionado(s)</span>
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
          disabled={true}
        />
        <ToolbarButton
          icon={<ArrowRight className="w-3.5 h-3.5" />}
          label="Avançar"
          disabled={true}
        />
        <ToolbarButton
          icon={<ArrowUp className="w-3.5 h-3.5 text-blue-700" />}
          label="Subir"
          onClick={handleGoUp}
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
          active={showFoldersPane}
          onClick={() => setShowFoldersPane(!showFoldersPane)}
          title="Alternar Painel de Pastas"
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

      {/* 3. Painel Principal Dividido: Esquerda (Pastas TreeView) + Direita (Conteúdo de Projetos) */}
      <div className="flex-1 flex overflow-hidden m-0.5 bevel-inset bg-white">
        {/* Painel Lateral Esquerdo: Árvore Hierárquica de Pastas */}
        {showFoldersPane && (
          <aside
            aria-label="Árvore de Pastas"
            className="w-48 sm:w-56 shrink-0 border-r border-win-shadow bg-white flex flex-col overflow-hidden"
          >
            {/* Cabeçalho do Painel Lateral */}
            <div className="bg-win-face px-2 py-1 border-b border-win-shadow/50 flex items-center justify-between text-win-caption select-none">
              <span className="font-bold text-gray-800">Pastas</span>
              <button
                type="button"
                onClick={() => setShowFoldersPane(false)}
                title="Fechar painel Pastas"
                className="w-4 h-4 hover:bevel-outset-thin active:bevel-inset-thin flex items-center justify-center text-gray-700"
              >
                <X className="w-3 h-3" />
              </button>
            </div>

            {/* Lista da Árvore de Pastas */}
            <div className="flex-1 overflow-auto p-1 bg-white">
              {renderTreeItem(FOLDER_TREE)}
            </div>
          </aside>
        )}

        {/* Painel Direito: Conteúdo dos Projetos */}
        <main className="flex-1 overflow-auto bg-white p-3 flex flex-col">
          <div className="mb-3 pb-2 border-b border-win-soft flex justify-between items-center text-win-caption text-gray-500">
            <span className="font-bold text-win-selection">{currentPath}</span>
            <span>{visibleProjects.length} objeto(s)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {visibleProjects.map((p) => (
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
        </main>
      </div>
    </WindowFrame>
  );
};
