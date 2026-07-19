export type PageKind = 'home' | 'dashboard' | 'notes';

export type PageState = {
  primaryText: string;
  secondaryText: string;
  counter: number;
  option: string;
  enabled: boolean;
};

export type PageContentProps = {
  state: PageState;
  setState: React.Dispatch<React.SetStateAction<PageState>>;
};

export type PageDefinition = {
  kind: PageKind;
  title: string;
  route: string;
  accent: string;
  createInitialState: () => PageState;
  Content: React.ComponentType<PageContentProps>;
};
