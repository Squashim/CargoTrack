import { useTheme } from '@/features/theme/use-theme';
import { useEffect } from 'react';

function useThemeShortcut() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleDownKey = (event: KeyboardEvent) => {
      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      const isInputFocused = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

      if (isInputFocused || event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }

      if (event.key.toLowerCase() === 'd') {
        event.preventDefault();

        const currentTheme =
          theme === 'system' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : theme;

        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
      }
    };

    window.addEventListener('keydown', handleDownKey);
    return () => {
      window.removeEventListener('keydown', handleDownKey);
    };
  }, [theme, setTheme]);
}

export { useThemeShortcut };
