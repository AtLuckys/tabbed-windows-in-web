import { useEffect, useState } from 'react';
import { pageDefinitions } from '../pages/pageDefinitions';
import type { PageKind } from '../pages/pageTypes';
import { useWindowManager } from '../state/WindowManagerContext';
import styles from './RoutedPage.module.css';

type RoutedPageProps = {
  page: PageKind;
};

export function RoutedPage({ page }: RoutedPageProps) {
  const definition = pageDefinitions[page];
  const [state, setState] = useState(definition.createInitialState);
  const { createCollapsedWindow } = useWindowManager();
  const Content = definition.Content;

  useEffect(() => {
    setState(definition.createInitialState());
  }, [definition]);

  const collapsePage = () => {
    createCollapsedWindow(definition.kind, definition.title, state);
  };

  return (
    <section className={styles.page} style={{ '--accent': definition.accent } as React.CSSProperties}>
      <div className={styles.pageHeader}>
        <div>
          <span className={styles.badge}>{definition.title} page</span>
          <h2>{definition.title}</h2>
          <p>
            Change the fields, collapse this page, then reopen it from the bottom tab without losing
            the saved state.
          </p>
        </div>

        <button className={styles.primaryAction} onClick={collapsePage}>
          Save state & collapse
        </button>
      </div>

      <Content state={state} setState={setState} />
    </section>
  );
}
