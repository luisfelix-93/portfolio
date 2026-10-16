import React, { useRef, useState, useEffect, type ReactNode } from 'react';
import { useWindowManager } from '../../context/WindowManagerContext';
import { Monitor, Folder, FileText, Terminal } from 'lucide-react';

interface WindowFrameProps {
  id: string;
  children: ReactNode;
  menuItems?: string[];
  statusBar?: ReactNode;
  contentClassName?: string;
  defaultIcon?: ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({
  id,
  children,
  menuItems = ['Arquivo', 'Editar', 'Exibir', 'Ajuda'],
  statusBar,
  contentClassName = 'bg-white text-black',
  defaultIcon,
}) => {
  const { state, closeWindow, minimizeWindow, toggleMaximize, focusWindow, updatePosition } =
    useWindowManager();

  const win = state.windows[id];
  const isActive = state.activeWindowId === id;

  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; posX: number; posY: number }>({
    startX: 0,
    startY: 0,
    posX: 0,
    posY: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || win?.isMaximized) return;

      const deltaX = e.clientX - dragRef.current.startX;
      const deltaY = e.clientY - dragRef.current.startY;

      const newX = Math.max(0, Math.min(window.innerWidth - 100, dragRef.current.posX + deltaX));
      const newY = Math.max(0, Math.min(window.innerHeight - 80, dragRef.current.posY + deltaY));

      updatePosition(id, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, id, win?.isMaximized, updatePosition]);

  if (!win || !win.isOpen || win.isMinimized) {
    return null;
  }

  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    if (win.isMaximized) return;
    if ((e.target as HTMLElement).closest('.win-control-button')) return;

    focusWindow(id);
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: win.position.x,
      posY: win.position.y,
    };
  };

  const renderIcon = () => {
    if (defaultIcon) return defaultIcon;
    switch (win.icon) {
      case 'folder':
        return <Folder className="w-3.5 h-3.5 text-yellow-500 fill-yellow-400" />;
      case 'file-text':
        return <FileText className="w-3.5 h-3.5 text-blue-400" />;
      case 'terminal':
        return <Terminal className="w-3.5 h-3.5 text-green-400" />;
      case 'computer':
      default:
        return <Monitor className="w-3.5 h-3.5 text-cyan-400" />;
    }
  };

  const style: React.CSSProperties = win.isMaximized
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 30px)',
        zIndex: win.zIndex,
      }
    : {
        position: 'fixed',
        top: `${win.position.y}px`,
        left: `${win.position.x}px`,
        width: `${win.size.width}px`,
        height: `${win.size.height}px`,
        maxWidth: 'calc(100vw - 20px)',
        maxHeight: 'calc(100vh - 40px)',
        zIndex: win.zIndex,
      };

  return (
    <div
      style={style}
      className="win-window flex flex-col shadow-2xl select-none"
      onMouseDown={() => focusWindow(id)}
    >
      {/* Titlebar */}
      <div
        className={`h-5 px-1 py-0.5 flex items-center justify-between cursor-default ${
          isActive ? 'titlebar-active' : 'titlebar-inactive'
        }`}
        onMouseDown={handleTitleBarMouseDown}
        onDoubleClick={() => toggleMaximize(id)}
      >
        <div className="flex items-center gap-1.5 truncate pr-2">
          {renderIcon()}
          <span className="text-win-title truncate leading-none">{win.title}</span>
        </div>

        {/* Window controls [ _ ] [ 口 ] [ X ] */}
        <div className="flex items-center gap-0.5 shrink-0">
          <button
            type="button"
            className="win-control-button"
            title="Minimizar"
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow(id);
            }}
          >
            _
          </button>
          <button
            type="button"
            className="win-control-button"
            title={win.isMaximized ? 'Restaurar' : 'Maximizar'}
            onClick={(e) => {
              e.stopPropagation();
              toggleMaximize(id);
            }}
          >
            {win.isMaximized ? '❐' : '□'}
          </button>
          <button
            type="button"
            className="win-control-button ml-0.5"
            title="Fechar"
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(id);
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Menu Bar (Optional) */}
      {menuItems && menuItems.length > 0 && (
        <div className="bg-win-face px-1 py-0.5 border-b border-win-shadow/40 flex items-center gap-2 text-win-caption text-black">
          {menuItems.map((item) => (
            <span
              key={item}
              className="px-1.5 py-0.5 hover:bg-win-selection hover:text-white cursor-default"
            >
              {item}
            </span>
          ))}
        </div>
      )}

      {/* Window Content */}
      <div className={`flex-1 overflow-auto bevel-inset m-0.5 ${contentClassName}`}>
        {children}
      </div>

      {/* Status Bar (Optional) */}
      {statusBar && (
        <div className="h-5 px-1 bg-win-face flex items-center text-win-caption text-black shrink-0 mt-0.5">
          {statusBar}
        </div>
      )}
    </div>
  );
};
