import React, { useState, type ReactNode } from 'react';
import { useWindowManager } from '../../context/WindowManagerContext';
import { Taskbar } from './Taskbar';
import { Monitor, Folder, FileText, Terminal, Trash2 } from 'lucide-react';

interface DesktopIcon {
  id: string;
  label: string;
  windowId?: string;
  icon: ReactNode;
}

interface DesktopCanvasProps {
  children?: ReactNode;
}

export const DesktopCanvas: React.FC<DesktopCanvasProps> = ({ children }) => {
  const { openWindow } = useWindowManager();
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);

  const desktopIcons: DesktopIcon[] = [
    {
      id: 'computer',
      label: 'Meu Computador',
      windowId: 'winver',
      icon: (
        <div className="w-9 h-9 flex items-center justify-center bg-cyan-700/80 rounded-[2px] p-1.5 shadow">
          <Monitor className="w-full h-full text-white" />
        </div>
      ),
    },
    {
      id: 'projects',
      label: 'Meus Projetos',
      windowId: 'explorer',
      icon: (
        <div className="w-9 h-9 flex items-center justify-center bg-yellow-600/80 rounded-[2px] p-1.5 shadow">
          <Folder className="w-full h-full text-white fill-yellow-200" />
        </div>
      ),
    },
    {
      id: 'experience',
      label: 'Experiência.doc',
      windowId: 'mmc',
      icon: (
        <div className="w-9 h-9 flex items-center justify-center bg-blue-700/80 rounded-[2px] p-1.5 shadow">
          <FileText className="w-full h-full text-white" />
        </div>
      ),
    },
    {
      id: 'terminal',
      label: 'Homelab SSH',
      windowId: 'putty',
      icon: (
        <div className="w-9 h-9 flex items-center justify-center bg-emerald-800/90 rounded-[2px] p-1.5 shadow">
          <Terminal className="w-full h-full text-emerald-300" />
        </div>
      ),
    },
    {
      id: 'trash',
      label: 'Lixeira',
      icon: (
        <div className="w-9 h-9 flex items-center justify-center bg-gray-600/80 rounded-[2px] p-1.5 shadow">
          <Trash2 className="w-full h-full text-gray-200" />
        </div>
      ),
    },
  ];

  const handleIconClick = (e: React.MouseEvent, item: DesktopIcon) => {
    e.stopPropagation();
    setSelectedIconId(item.id);
  };

  const handleIconDoubleClick = (e: React.MouseEvent, item: DesktopIcon) => {
    e.stopPropagation();
    if (item.windowId) {
      openWindow(item.windowId);
    } else if (item.id === 'trash') {
      alert('Lixeira: 0 bugs pendentes, todas as tarefas em ordem!');
    }
  };

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-win-desktop overflow-hidden select-none font-win"
      onClick={() => setSelectedIconId(null)}
    >
      {/* Desktop Icons Grid */}
      <div className="absolute top-4 left-4 flex flex-col gap-5 z-0">
        {desktopIcons.map((item) => {
          const isSelected = selectedIconId === item.id;
          return (
            <div
              key={item.id}
              className={`w-[78px] flex flex-col items-center gap-1 cursor-default p-1 rounded-none text-center ${
                isSelected ? 'outline outline-1 outline-dotted outline-white/80' : ''
              }`}
              onClick={(e) => handleIconClick(e, item)}
              onDoubleClick={(e) => handleIconDoubleClick(e, item)}
            >
              <div className="transform hover:scale-105 transition-transform">{item.icon}</div>
              <span
                className={`text-win-caption font-bold px-1 py-0.5 max-w-full truncate ${
                  isSelected
                    ? 'bg-win-selection text-white'
                    : 'text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]'
                }`}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Render Open Windows */}
      {children}

      {/* Taskbar */}
      <Taskbar />
    </div>
  );
};
