import { useState } from 'react';
import { pageDefinitions } from '../pages/pageDefinitions';
import type { PageState } from '../pages/pageTypes';
import { useWindowManager, type ManagedWindow } from '../state/WindowManagerContext';
import styles from './WindowStage.module.css';

export function WindowStage() {
  const { windows } = useWindowManager();

  return (
    <>
      {windows.map((window, index) => (
        <PersistedWindow key={window.id} stackIndex={index} window={window} />
      ))}
    </>
  );
}

function PersistedWindow({ stackIndex, window }: { stackIndex: number; window: ManagedWindow }) {
  const [state, setState] = useState<PageState>(() => window.initialState);
  const { closeWindow, collapseWindow, fullscreenWindow, openWindow } = useWindowManager();
  const definition = pageDefinitions[window.page];
  const Content = definition.Content;
  const isCollapsed = window.mode === 'collapsed';
  const isFullscreen = window.mode === 'fullscreen';

  return (
    <div
      aria-hidden={isCollapsed}
      className={`${styles.overlay} ${isCollapsed ? styles.collapsed : ''} ${
        isFullscreen ? styles.fullscreenOverlay : ''
      }`}
      style={{ zIndex: 40 + stackIndex }}
    >
      <section
        aria-label={`${window.title} saved window`}
        aria-modal={!isCollapsed}
        className={`${styles.modal} ${isFullscreen ? styles.fullscreen : ''}`}
        role="dialog"
        style={{ '--accent': definition.accent } as React.CSSProperties}
      >
        <header className={styles.modalHeader}>
          <div>
            <span className={styles.badge}>Saved window</span>
            <h2>{window.title}</h2>
          </div>

          <div className={styles.actions}>
            <button onClick={() => collapseWindow(window.id)}>Collapse</button>
            <button onClick={() => closeWindow(window.id)}>Close</button>
            <button onClick={() => (isFullscreen ? openWindow(window.id) : fullscreenWindow(window.id))}>
              {isFullscreen ? 'Restore modal' : 'Full uncollapse'}
            </button>
          </div>
        </header>

        <Content state={state} setState={setState} />
      </section>
    </div>
  );
}
