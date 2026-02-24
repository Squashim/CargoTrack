import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { availableLanguages } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { WithClassName } from '@/types/common';
import { LanguagesIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface LanguageSelectProps extends WithClassName {
  size?: 'sm' | 'default';
}

function LanguageSelect({ className, size }: LanguageSelectProps) {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage || i18n.language?.split('-')[0] || 'pl';

  const handleLanguageChange = (value: string | null) => {
    if (!value) return;
    i18n.changeLanguage(value);
  };

  const selectedItem = availableLanguages.find((item) => item.value === currentLanguage);

  return (
    <Select value={currentLanguage} onValueChange={handleLanguageChange} name="language-select">
      <SelectTrigger className={cn('w-full max-w-32', className)} size={size}>
        <LanguagesIcon />
        <SelectValue>{selectedItem ? selectedItem.label : t('languages.unknown')}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('languages.choose')}</SelectLabel>
          {availableLanguages.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export { LanguageSelect };
