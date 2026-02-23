import { useTheme } from '@/features/theme/use-theme';
import { Moon, Sun } from 'lucide-react';
import { type ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './button';
import { Kbd } from './kbd';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

type ThemeToggleProps = ComponentProps<typeof Button> & {
  showTooltip?: boolean;
};

function ThemeToggle({ size, variant, showTooltip = true, ...props }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();
  const userTheme =
    theme === 'system' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : theme;

  const toggleTheme = () => {
    setTheme(userTheme === 'dark' ? 'light' : 'dark');
  };

  const themeButton = (
    <Button
      {...props}
      size={size || 'icon-lg'}
      variant={variant || 'outline'}
      onClick={toggleTheme}
      title={showTooltip ? undefined : userTheme === 'dark' ? t('themes.switchToLight') : t('themes.switchToDark')}
      aria-label={userTheme === 'dark' ? t('themes.switchToLight') : t('themes.switchToDark')}
    >
      <Sun
        className="absolute size-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
        aria-hidden="true"
      />
      <Moon
        className="absolute size-5 transition-all scale-100 rotate-0 dark:scale-0 dark:-rotate-90"
        aria-hidden="true"
      />
    </Button>
  );

  if (!showTooltip) {
    return themeButton;
  }

  return (
    <Tooltip>
      <TooltipTrigger render={themeButton} />
      <TooltipContent side="bottom" className="pr-1.5">
        <div className="flex items-center gap-2">
          {t('themes.switchTheme')} <Kbd>D</Kbd>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

export { ThemeToggle };
