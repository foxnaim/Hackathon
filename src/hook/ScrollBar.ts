import { useEffect, useRef } from 'react';

export function useScrollToBottom(deps: any[] = []) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, deps);

  return containerRef;
}
