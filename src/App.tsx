import { NavLink, Route, Routes } from 'react-router-dom';
import { BottomTabs } from './components/BottomTabs';
import { RoutedPage } from './components/RoutedPage';
import { WindowStage } from './components/WindowStage';
import { pageDefinitions } from './pages/pageDefinitions';
import styles from './App.module.css';

export function App() {
  return (
    <div className={styles.appShell}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>React Router + Context + Rsbuild</p>
          <h1>Tabbed windows demo</h1>
        </div>

        <nav className={styles.nav} aria-label="Main navigation">
          {Object.values(pageDefinitions).map((page) => (
            <NavLink
              key={page.kind}
              to={page.route}
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              {page.title}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className={styles.main}>
        <Routes>
          {Object.values(pageDefinitions).map((page) => (
            <Route key={page.kind} path={page.route} element={<RoutedPage page={page.kind} />} />
          ))}
        </Routes>
      </main>

      <WindowStage />
      <BottomTabs />
    </div>
  );
}
