import type { PageContentProps } from './pageTypes';
import styles from './PageContent.module.css';

export function HomePage({ state, setState }: PageContentProps) {
  return (
    <div className={styles.grid}>
      <label className={styles.field}>
        Greeting
        <input
          value={state.primaryText}
          onChange={(event) =>
            setState((current) => ({ ...current, primaryText: event.target.value }))
          }
        />
      </label>

      <label className={styles.field}>
        Workspace
        <select
          value={state.option}
          onChange={(event) => setState((current) => ({ ...current, option: event.target.value }))}
        >
          <option>Personal</option>
          <option>Team</option>
          <option>Client</option>
        </select>
      </label>

      <label className={`${styles.field} ${styles.wide}`}>
        Message
        <textarea
          value={state.secondaryText}
          onChange={(event) =>
            setState((current) => ({ ...current, secondaryText: event.target.value }))
          }
        />
      </label>

      <div className={styles.card}>
        <span>Counter</span>
        <strong>{state.counter}</strong>
        <button onClick={() => setState((current) => ({ ...current, counter: current.counter + 1 }))}>
          Add one
        </button>
      </div>
    </div>
  );
}
