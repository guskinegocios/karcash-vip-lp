import { useEffect } from 'react';

export function useScrollIntoView(containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleFocus = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.tagName === 'SELECT'
      ) {
        // Wait for the mobile virtual keyboard transition to complete (~300ms)
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    };

    // Use event delegation on the container
    container.addEventListener('focusin', handleFocus);

    return () => {
      container.removeEventListener('focusin', handleFocus);
    };
  }, [containerRef]);
}
