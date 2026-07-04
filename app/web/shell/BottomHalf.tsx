import type { ReactNode } from 'react';

type BottomHalfProps = {
  children: ReactNode;
};

export function BottomHalf({ children }: BottomHalfProps) {
  return <div className="question-form-panel">{children}</div>;
}
