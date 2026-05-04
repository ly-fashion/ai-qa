// localStorage composable for SSR-safe localStorage access
export const useLocalStorage = () => {
  const setItem = (key: string, value: string) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, value);
    }
  };

  const getItem = (key: string): string | null => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(key);
    }
    return null;
  };

  const removeItem = (key: string) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(key);
    }
  };

  return {
    setItem,
    getItem,
    removeItem,
  };
};
