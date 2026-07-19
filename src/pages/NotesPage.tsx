import type { PageContentProps } from './pageTypes';
import styles from './PageContent.module.css';

export function NotesPage({ state, setState }: PageContentProps) {
  return (
    <div className={styles.grid}>
      <label className={styles.field}>
        Title
        <input
          value={state.primaryText}
          onChange={(event) =>
            setState((current) => ({ ...current, primaryText: event.target.value }))
          }
        />
      </label>

      <label className={styles.field}>
        Status
        <select
          value={state.option}
          onChange={(event) => setState((current) => ({ ...current, option: event.target.value }))}
        >
          <option>Draft</option>
          <option>Review</option>
          <option>Published</option>
        </select>
      </label>

      <label className={`${styles.field} ${styles.wide}`}>
        Body
        <textarea
          value={state.secondaryText}
          onChange={(event) =>
            setState((current) => ({ ...current, secondaryText: event.target.value }))
          }
        />
      </label>

      <label className={styles.toggle}>
        <input
          checked={state.enabled}
          type="checkbox"
          onChange={(event) =>
            setState((current) => ({ ...current, enabled: event.target.checked }))
          }
        />
        Pin this note
      </label>
    </div>
  );
}
