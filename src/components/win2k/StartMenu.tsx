import React from 'react';
import { useWindowManager } from '../../context/WindowManagerContext';
import { Monitor, Folder, FileText, Terminal, Power } from 'lucide-react';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({ isOpen, onClose }) => {
  const { openWindow } = useWindowManager();

  if (!isOpen) return null;

  const handleItemClick = (id: string) => {
    openWindow(id);
    onClose();
  };

  const handleShutdown = () => {
    onClose();
    if (window.confirm('Deseja reiniciar a sessão do Windows 2000 Professional?')) {
      window.location.reload();
    }
  };

  return (
    <div
      className="fixed bottom-[30px] left-0 z-[100] win-window flex bg-win-face shadow-2xl select-none"
      style={{ width: '240px', minHeight: '260px' }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Side Banner with vertical Windows 2000 text */}
      <div className="w-7 bg-gradient-to-t from-win-selection via-[#104F84] to-win-selection flex items-end justify-center pb-3 shrink-0">
        <span
          className="text-white font-bold tracking-widest text-[13px] whitespace-nowrap rotate-180"
          style={{ writingMode: 'vertical-rl' }}
        >
          Windows <span className="font-normal opacity-90 text-[11px]">2000 Professional</span>
        </span>
      </div>

      {/* Menu Items */}
      <div className="flex-1 py-1 flex flex-col justify-between text-black text-win-body">
        <div className="flex flex-col">
          <button
            type="button"
            className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-win-selection hover:text-white text-left cursor-default transition-colors"
            onClick={() => handleItemClick('winver')}
          >
            <Monitor className="w-4 h-4 text-cyan-600 shrink-0" />
            <div className="flex flex-col">
              <span className="font-bold">Quem Sou Eu</span>
              <span className="text-[9px] opacity-70">winver.exe</span>
            </div>
          </button>

          <button
            type="button"
            className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-win-selection hover:text-white text-left cursor-default transition-colors"
            onClick={() => handleItemClick('explorer')}
          >
            <Folder className="w-4 h-4 text-yellow-600 fill-yellow-400 shrink-0" />
            <div className="flex flex-col">
              <span className="font-bold">Meus Projetos</span>
              <span className="text-[9px] opacity-70">C:\Projetos</span>
            </div>
          </button>

          <button
            type="button"
            className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-win-selection hover:text-white text-left cursor-default transition-colors"
            onClick={() => handleItemClick('mmc')}
          >
            <FileText className="w-4 h-4 text-blue-600 shrink-0" />
            <div className="flex flex-col">
              <span className="font-bold">Experiência & CV</span>
              <span className="text-[9px] opacity-70">mmc.exe</span>
            </div>
          </button>

          <button
            type="button"
            className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-win-selection hover:text-white text-left cursor-default transition-colors"
            onClick={() => handleItemClick('putty')}
          >
            <Terminal className="w-4 h-4 text-emerald-600 shrink-0" />
            <div className="flex flex-col">
              <span className="font-bold">Terminal Homelab</span>
              <span className="text-[9px] opacity-70">PuTTY SSH</span>
            </div>
          </button>
        </div>

        <div>
          <div className="bevel-etched my-1 mx-1.5" />

          <button
            type="button"
            className="w-full flex items-center gap-2.5 px-3 py-1.5 hover:bg-win-selection hover:text-white text-left cursor-default transition-colors"
            onClick={handleShutdown}
          >
            <Power className="w-4 h-4 text-red-600 shrink-0" />
            <div className="flex flex-col">
              <span className="font-bold">Desligar...</span>
              <span className="text-[9px] opacity-70">Reiniciar sessão</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
