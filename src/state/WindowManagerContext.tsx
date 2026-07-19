import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { PageKind, PageState } from '../pages/pageTypes';

export type WindowMode = 'collapsed' | 'modal' | 'fullscreen';

export type ManagedWindow = {
  id: string;
  page: PageKind;
  title: string;
  initialState: PageState;
  mode: WindowMode;
  createdAt: number;
};

type WindowManagerContextValue = {
  windows: ManagedWindow[];
  createCollapsedWindow: (page: PageKind, title: string, state: PageState) => void;
  openWindow: (id: string) => void;
  collapseWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  fullscreenWindow: (id: string) => void;
};

const WindowManagerContext = createContext<WindowManagerContextValue | null>(null);

export function WindowManagerProvider({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = useState<ManagedWindow[]>([]);

  const updateWindowMode = useCallback((id: string, mode: WindowMode) => {
    setWindows((current) => {
      const selected = current.find((window) => window.id === id);

      if (!selected) {
        return current;
      }

      return [
        ...current.filter((window) => window.id !== id),
        { ...selected, mode },
      ];
    });
  }, []);

  const createCollapsedWindow = useCallback((page: PageKind, title: string, state: PageState) => {
    const timestamp = Date.now();
    const id = `${page}-${timestamp}-${Math.random().toString(36).slice(2, 8)}`;

    setWindows((current) => [
      ...current,
      {
        id,
        page,
        title,
        initialState: { ...state },
        mode: 'collapsed',
        createdAt: timestamp,
      },
    ]);
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows((current) => current.filter((window) => window.id !== id));
  }, []);

  const value = useMemo<WindowManagerContextValue>(
    () => ({
      windows,
      createCollapsedWindow,
      openWindow: (id) => updateWindowMode(id, 'modal'),
      collapseWindow: (id) => updateWindowMode(id, 'collapsed'),
      closeWindow,
      fullscreenWindow: (id) => updateWindowMode(id, 'fullscreen'),
    }),
    [closeWindow, createCollapsedWindow, updateWindowMode, windows],
  );

  return <WindowManagerContext.Provider value={value}>{children}</WindowManagerContext.Provider>;
}

export function useWindowManager() {
  const context = useContext(WindowManagerContext);

  if (!context) {
    throw new Error('useWindowManager must be used inside WindowManagerProvider.');
  }

  return context;
}
