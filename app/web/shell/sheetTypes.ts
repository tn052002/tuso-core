export type SheetMode = 'hidden' | 'collapsed' | 'half' | 'full';

export type SheetPosition = 'top' | 'bottom';

export type ActiveContext = 'question' | 'casting' | 'result' | 'personal';

export type AppShellState = {
  topSheet: SheetMode;
  bottomSheet: SheetMode;
  activeContext: ActiveContext;
};
