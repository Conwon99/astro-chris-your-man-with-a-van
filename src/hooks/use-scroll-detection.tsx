import { useState, useEffect } from 'react';

export const useScrollDetection = (threshold: number = 100) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY || window.pageYOffset;
          setIsScrolled(scrollPosition > threshold);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check using requestAnimationFrame to avoid forced reflow
    window.requestAnimationFrame(() => {
      const scrollPosition = window.scrollY || window.pageYOffset;
      setIsScrolled(scrollPosition > threshold);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return isScrolled;
};
