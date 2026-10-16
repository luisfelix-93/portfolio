import React, { useState, useEffect } from 'react';
import { useWindowManager } from '../../context/WindowManagerContext';
import { StartMenu } from './StartMenu';
import { Monitor, Folder, FileText, Terminal, Volume2, Wifi } from 'lucide-react';

export const Taskbar: React.FC = () => {
  const { state, focusWindow, minimizeWindow } = useWindowManager();
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close start menu on outside click
  useEffect(() => {
    const handleGlobalClick = () => {
      if (isStartOpen) {
        setIsStartOpen(false);
      }
    };

    if (isStartOpen) {
      window.addEventListener('click', handleGlobalClick);
    }
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [isStartOpen]);

  const handleTabClick = (id: string) => {
    const win = state.windows[id];
    if (!win) return;

    if (state.activeWindowId === id && !win.isMinimized) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };

  const renderTabIcon = (icon?: string) => {
    switch (icon) {
      case 'folder':
        return <Folder className="w-3.5 h-3.5 text-yellow-600 fill-yellow-400 shrink-0" />;
      case 'file-text':
        return <FileText className="w-3.5 h-3.5 text-blue-500 shrink-0" />;
      case 'terminal':
        return <Terminal className="w-3.5 h-3.5 text-emerald-500 shrink-0" />;
      case 'computer':
      default:
        return <Monitor className="w-3.5 h-3.5 text-cyan-600 shrink-0" />;
    }
  };

  const openWindows = Object.values(state.windows).filter((w) => w.isOpen);

  return (
    <>
      <StartMenu isOpen={isStartOpen} onClose={() => setIsStartOpen(false)} />

      <div
        className="fixed bottom-0 left-0 right-0 h-[30px] bg-win-face border-t border-win-light flex items-center px-1 gap-1 z-50 select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Start Button */}
        <button
          type="button"
          className={`h-[22px] px-2 flex items-center gap-1.5 cursor-default font-bold text-win-body text-black ${
            isStartOpen
              ? 'bevel-inset bg-[#ECE8DF] translate-x-[1px] translate-y-[1px]'
              : 'win-button'
          }`}
          onClick={() => setIsStartOpen(!isStartOpen)}
        >
          {/* Windows 4-color retro logo */}
          <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5 shrink-0">
            <span className="bg-[#F25022] w-1.5 h-1.5" />
            <span className="bg-[#7FBA00] w-1.5 h-1.5" />
            <span className="bg-[#00A4EF] w-1.5 h-1.5" />
            <span className="bg-[#FFB900] w-1.5 h-1.5" />
          </div>
          <span>Iniciar</span>
        </button>

        {/* Vertical divider */}
        <div className="w-[2px] h-[20px] bevel-etched rotate-90 mx-0.5" />

        {/* Open window tabs */}
        <div className="flex-1 flex items-center gap-1 overflow-x-auto h-full py-0.5">
          {openWindows.map((win) => {
            const isActive = state.activeWindowId === win.id && !win.isMinimized;
            return (
              <button
                key={win.id}
                type="button"
                className={`h-[22px] max-w-[170px] flex-1 min-w-[80px] px-2 flex items-center gap-1.5 truncate text-left text-win-caption font-bold text-black cursor-default ${
                  isActive
                    ? 'bevel-inset bg-[#ECE8DF]'
                    : 'bevel-outset-thin bg-win-face hover:bg-win-soft'
                }`}
                onClick={() => handleTabClick(win.id)}
                title={win.title}
              >
                {renderTabIcon(win.icon)}
                <span className="truncate leading-none">{win.title}</span>
              </button>
            );
          })}
        </div>

        {/* System Tray (Systray) */}
        <div className="h-[22px] bevel-inset-thin bg-win-face px-2 flex items-center gap-2 text-win-caption text-black shrink-0">
          <Volume2 className="w-3.5 h-3.5 text-gray-700" />
          <Wifi className="w-3.5 h-3.5 text-gray-700" />
          <span className="font-win tabular-nums text-[11px] leading-none">{time || '12:00'}</span>
        </div>
      </div>
    </>
  );
};
