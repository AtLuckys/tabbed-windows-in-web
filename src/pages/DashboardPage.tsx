import type { PageContentProps } from './pageTypes';
import styles from './PageContent.module.css';

export function DashboardPage({ state, setState }: PageContentProps) {
  return (
    <div className={styles.grid}>
      <label className={styles.field}>
        Metric
        <input
          value={state.primaryText}
          onChange={(event) =>
            setState((current) => ({ ...current, primaryText: event.target.value }))
          }
        />
      </label>

      <label className={styles.field}>
        Period
        <select
          value={state.option}
          onChange={(event) => setState((current) => ({ ...current, option: event.target.value }))}
        >
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      </label>

      <label className={`${styles.field} ${styles.wide}`}>
        Segment
        <input
          value={state.secondaryText}
          onChange={(event) =>
            setState((current) => ({ ...current, secondaryText: event.target.value }))
          }
        />
      </label>

      <div className={styles.card}>
        <span>Refreshes</span>
        <strong>{state.counter}</strong>
        <button onClick={() => setState((current) => ({ ...current, counter: current.counter + 1 }))}>
          Refresh
        </button>
      </div>
    </div>
  );
}
