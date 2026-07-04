import type { ReactNode } from 'react';
import type { SheetMode, SheetPosition } from './sheetTypes';

type SheetHostProps = {
  children?: ReactNode;
  mode: SheetMode;
  position: SheetPosition;
};

export function SheetHost({ children, mode, position }: SheetHostProps) {
  return (
    <div
      className={`app-sheet-host app-sheet-host-${position} is-${mode}`}
      data-sheet-position={position}
      data-sheet-mode={mode}
    >
      {children}
    </div>
  );
}
