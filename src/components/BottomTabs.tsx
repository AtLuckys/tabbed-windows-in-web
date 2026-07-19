import { useWindowManager } from '../state/WindowManagerContext';
import styles from './BottomTabs.module.css';

export function BottomTabs() {
  const { closeWindow, openWindow, windows } = useWindowManager();
  const collapsedWindows = windows.filter((window) => window.mode === 'collapsed');

  if (collapsedWindows.length === 0) {
    return null;
  }

  return (
    <aside className={styles.tabBar} aria-label="Collapsed windows">
      {collapsedWindows.map((window) => (
        <div className={styles.tab} key={window.id}>
          <span>{window.title}</span>
          <button aria-label={`Open ${window.title}`} onClick={() => openWindow(window.id)}>
            Open
          </button>
          <button aria-label={`Close ${window.title}`} onClick={() => closeWindow(window.id)}>
            ×
          </button>
        </div>
      ))}
    </aside>
  );
}
