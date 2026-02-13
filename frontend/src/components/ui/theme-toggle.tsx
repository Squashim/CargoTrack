import { useTheme } from '@/features/theme/use-theme';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useEffectEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './button';
import { Kbd } from './kbd';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();
  const userTheme =
    theme === 'system' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : theme;

  const toggleTheme = () => {
    setTheme(userTheme === 'dark' ? 'light' : 'dark');
  };

  const onToggleTheme = useEffectEvent(() => {
    toggleTheme();
  });

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
        onToggleTheme();
      }
    };

    window.addEventListener('keydown', handleDownKey);

    return () => {
      window.removeEventListener('keydown', handleDownKey);
    };
  }, []);

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            size="icon-lg"
            variant="outline"
            onClick={toggleTheme}
            aria-label={userTheme === 'dark' ? t('themes.switchToLight') : t('themes.switchToDark')}
          >
            <Sun
              className="absolute size-5 scale-0 rotate-90  transition-all dark:scale-100 dark:rotate-0"
              aria-hidden="true"
            />
            <Moon
              className="absolute size-5 transition-all scale-100 rotate-0 dark:scale-0 dark:-rotate-90"
              aria-hidden="true"
            />
          </Button>
        }
      ></TooltipTrigger>
      <TooltipContent side="bottom" className="pr-1.5">
        <div className="flex items-center gap-2">
          {t('themes.switchTheme')} <Kbd>D</Kbd>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

export { ThemeToggle };
