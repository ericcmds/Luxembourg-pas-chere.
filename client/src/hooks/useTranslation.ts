
import { useLanguage } from '@/contexts/LanguageContext';

export function useTranslation() {
  const { language, setLanguage, t } = useLanguage();
  
  return {
    t,
    language,
    changeLanguage: setLanguage,
    languages: ['de', 'fr', 'en'] as const
  };
}
