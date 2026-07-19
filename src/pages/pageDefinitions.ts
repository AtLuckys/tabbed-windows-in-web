import { DashboardPage } from './DashboardPage';
import { HomePage } from './HomePage';
import { NotesPage } from './NotesPage';
import type { PageDefinition, PageKind } from './pageTypes';

export const defaultRoute = '/';

export const pageDefinitions: Record<PageKind, PageDefinition> = {
  home: {
    kind: 'home',
    title: 'Home',
    route: '/',
    accent: '#6366f1',
    createInitialState: () => ({
      primaryText: 'Welcome back',
      secondaryText: 'This page can be collapsed without losing its form state.',
      counter: 1,
      option: 'Personal',
      enabled: true,
    }),
    Content: HomePage,
  },
  dashboard: {
    kind: 'dashboard',
    title: 'Dashboard',
    route: '/dashboard',
    accent: '#16a34a',
    createInitialState: () => ({
      primaryText: 'Revenue',
      secondaryText: 'Europe region',
      counter: 42,
      option: 'Weekly',
      enabled: true,
    }),
    Content: DashboardPage,
  },
  notes: {
    kind: 'notes',
    title: 'Notes',
    route: '/notes',
    accent: '#f97316',
    createInitialState: () => ({
      primaryText: 'Product ideas',
      secondaryText: 'Write notes here, collapse the page, and reopen it later.',
      counter: 0,
      option: 'Draft',
      enabled: false,
    }),
    Content: NotesPage,
  },
};
