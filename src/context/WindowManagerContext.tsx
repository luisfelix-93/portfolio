import { createContext, useContext, useReducer, type ReactNode } from 'react';

export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface WindowState {
  id: string;
  title: string;
  icon?: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: WindowPosition;
  size: WindowSize;
  defaultPosition: WindowPosition;
  defaultSize: WindowSize;
}

export interface WindowManagerState {
  windows: Record<string, WindowState>;
  activeWindowId: string | null;
  highestZIndex: number;
}

export type WindowAction =
  | { type: 'OPEN_WINDOW'; payload: { id: string } }
  | { type: 'CLOSE_WINDOW'; payload: { id: string } }
  | { type: 'MINIMIZE_WINDOW'; payload: { id: string } }
  | { type: 'TOGGLE_MAXIMIZE'; payload: { id: string } }
  | { type: 'FOCUS_WINDOW'; payload: { id: string } }
  | { type: 'UPDATE_POSITION'; payload: { id: string; position: WindowPosition } }
  | { type: 'UPDATE_SIZE'; payload: { id: string; size: WindowSize } };

export const INITIAL_WINDOWS: Record<string, WindowState> = {
  winver: {
    id: 'winver',
    title: 'Apresentação - Quem Sou Eu',
    icon: 'computer',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 80, y: 50 },
    size: { width: 520, height: 420 },
    defaultPosition: { x: 80, y: 50 },
    defaultSize: { width: 520, height: 420 },
  },
  explorer: {
    id: 'explorer',
    title: 'C:\\Projetos',
    icon: 'folder',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 11,
    position: { x: 140, y: 80 },
    size: { width: 680, height: 480 },
    defaultPosition: { x: 140, y: 80 },
    defaultSize: { width: 680, height: 480 },
  },
  mmc: {
    id: 'mmc',
    title: 'Gerenciamento do Computador - Experiência',
    icon: 'file-text',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 12,
    position: { x: 200, y: 110 },
    size: { width: 660, height: 470 },
    defaultPosition: { x: 200, y: 110 },
    defaultSize: { width: 660, height: 470 },
  },
  putty: {
    id: 'putty',
    title: 'homelab-gateway:22 - PuTTY (SSH-2.0-OpenSSH_9.2p1)',
    icon: 'terminal',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 13,
    position: { x: 260, y: 140 },
    size: { width: 620, height: 400 },
    defaultPosition: { x: 260, y: 140 },
    defaultSize: { width: 620, height: 400 },
  },
};

export const initialWindowManagerState: WindowManagerState = {
  windows: INITIAL_WINDOWS,
  activeWindowId: 'winver',
  highestZIndex: 15,
};

export function windowManagerReducer(
  state: WindowManagerState,
  action: WindowAction
): WindowManagerState {
  switch (action.type) {
    case 'OPEN_WINDOW': {
      const win = state.windows[action.payload.id];
      if (!win) return state;

      const newZ = state.highestZIndex + 1;
      return {
        ...state,
        highestZIndex: newZ,
        activeWindowId: win.id,
        windows: {
          ...state.windows,
          [win.id]: {
            ...win,
            isOpen: true,
            isMinimized: false,
            zIndex: newZ,
          },
        },
      };
    }

    case 'CLOSE_WINDOW': {
      const win = state.windows[action.payload.id];
      if (!win) return state;

      const nextActiveId =
        state.activeWindowId === win.id
          ? Object.values(state.windows)
              .filter((w) => w.id !== win.id && w.isOpen && !w.isMinimized)
              .sort((a, b) => b.zIndex - a.zIndex)[0]?.id || null
          : state.activeWindowId;

      return {
        ...state,
        activeWindowId: nextActiveId,
        windows: {
          ...state.windows,
          [win.id]: {
            ...win,
            isOpen: false,
            isMinimized: false,
          },
        },
      };
    }

    case 'MINIMIZE_WINDOW': {
      const win = state.windows[action.payload.id];
      if (!win) return state;

      const nextActiveId =
        state.activeWindowId === win.id
          ? Object.values(state.windows)
              .filter((w) => w.id !== win.id && w.isOpen && !w.isMinimized)
              .sort((a, b) => b.zIndex - a.zIndex)[0]?.id || null
          : state.activeWindowId;

      return {
        ...state,
        activeWindowId: nextActiveId,
        windows: {
          ...state.windows,
          [win.id]: {
            ...win,
            isMinimized: true,
          },
        },
      };
    }

    case 'TOGGLE_MAXIMIZE': {
      const win = state.windows[action.payload.id];
      if (!win) return state;

      const newZ = state.highestZIndex + 1;
      return {
        ...state,
        highestZIndex: newZ,
        activeWindowId: win.id,
        windows: {
          ...state.windows,
          [win.id]: {
            ...win,
            isMaximized: !win.isMaximized,
            isMinimized: false,
            zIndex: newZ,
          },
        },
      };
    }

    case 'FOCUS_WINDOW': {
      const win = state.windows[action.payload.id];
      if (!win || !win.isOpen) return state;

      if (win.isMinimized) {
        const newZ = state.highestZIndex + 1;
        return {
          ...state,
          highestZIndex: newZ,
          activeWindowId: win.id,
          windows: {
            ...state.windows,
            [win.id]: {
              ...win,
              isMinimized: false,
              zIndex: newZ,
            },
          },
        };
      }

      if (state.activeWindowId === win.id) {
        return state;
      }

      const newZ = state.highestZIndex + 1;
      return {
        ...state,
        highestZIndex: newZ,
        activeWindowId: win.id,
        windows: {
          ...state.windows,
          [win.id]: {
            ...win,
            zIndex: newZ,
          },
        },
      };
    }

    case 'UPDATE_POSITION': {
      const win = state.windows[action.payload.id];
      if (!win) return state;

      return {
        ...state,
        windows: {
          ...state.windows,
          [win.id]: {
            ...win,
            position: action.payload.position,
          },
        },
      };
    }

    case 'UPDATE_SIZE': {
      const win = state.windows[action.payload.id];
      if (!win) return state;

      return {
        ...state,
        windows: {
          ...state.windows,
          [win.id]: {
            ...win,
            size: action.payload.size,
          },
        },
      };
    }

    default:
      return state;
  }
}

export interface WindowManagerContextType {
  state: WindowManagerState;
  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  toggleMaximize: (id: string) => void;
  focusWindow: (id: string) => void;
  updatePosition: (id: string, position: WindowPosition) => void;
  updateSize: (id: string, size: WindowSize) => void;
}

const WindowManagerContext = createContext<WindowManagerContextType | undefined>(undefined);

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(windowManagerReducer, initialWindowManagerState);

  const openWindow = (id: string) => dispatch({ type: 'OPEN_WINDOW', payload: { id } });
  const closeWindow = (id: string) => dispatch({ type: 'CLOSE_WINDOW', payload: { id } });
  const minimizeWindow = (id: string) => dispatch({ type: 'MINIMIZE_WINDOW', payload: { id } });
  const toggleMaximize = (id: string) => dispatch({ type: 'TOGGLE_MAXIMIZE', payload: { id } });
  const focusWindow = (id: string) => dispatch({ type: 'FOCUS_WINDOW', payload: { id } });
  const updatePosition = (id: string, position: WindowPosition) =>
    dispatch({ type: 'UPDATE_POSITION', payload: { id, position } });
  const updateSize = (id: string, size: WindowSize) =>
    dispatch({ type: 'UPDATE_SIZE', payload: { id, size } });

  return (
    <WindowManagerContext.Provider
      value={{
        state,
        openWindow,
        closeWindow,
        minimizeWindow,
        toggleMaximize,
        focusWindow,
        updatePosition,
        updateSize,
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager(): WindowManagerContextType {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error('useWindowManager must be used within a WindowManagerProvider');
  }
  return context;
}
