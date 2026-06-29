// Navigation utilities for Astro compatibility
// Replaces React Router functionality with native browser navigation

export const navigate = (path: string) => {
  if (typeof window !== 'undefined') {
    window.location.href = path;
  }
};

export const getCurrentPath = (): string => {
  if (typeof window !== 'undefined') {
    return window.location.pathname;
  }
  return '/';
};

export const isCurrentPage = (path: string): boolean => {
  return getCurrentPath() === path;
};






