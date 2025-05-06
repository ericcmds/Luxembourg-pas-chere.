declare module 'react-lazy-load-image-component' {
  import * as React from 'react';

  export interface LazyLoadImageProps {
    alt?: string;
    height?: number | string;
    width?: number | string;
    src: string;
    effect?: string;
    placeholder?: React.ReactNode;
    threshold?: number;
    visibleByDefault?: boolean;
    wrapperClassName?: string;
    className?: string;
    style?: React.CSSProperties;
    beforeLoad?: () => void;
    afterLoad?: () => void;
    delayMethod?: 'debounce' | 'throttle';
    delayTime?: number;
    useIntersectionObserver?: boolean;
    scrollPosition?: { x: number; y: number };
  }

  export class LazyLoadImage extends React.Component<LazyLoadImageProps> {}
}