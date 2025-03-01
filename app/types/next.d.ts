import type { ReactElement, ReactNode } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      html: any;
      body: any;
    }
  }
} 