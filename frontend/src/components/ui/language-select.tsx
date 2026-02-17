import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LanguagesIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function LanguageSelect() {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage || i18n.language?.split('-')[0] || 'pl';

  const languages = [
    { label: t('languages.pl'), value: 'pl' },
    { label: t('languages.en'), value: 'en' },
  ];

  const handleLanguageChange = (value: string | null) => {
    if (!value) return;
    i18n.changeLanguage(value);
  };

  const selectedItem = languages.find((item) => item.value === currentLanguage);

  return (
    <Select value={currentLanguage} onValueChange={handleLanguageChange} name="language-select">
      <SelectTrigger className="w-full max-w-32">
        <LanguagesIcon />
        <SelectValue>{selectedItem ? selectedItem.label : t('languages.unknown')}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('languages.choose')}</SelectLabel>
          {languages.map((item) => (
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
