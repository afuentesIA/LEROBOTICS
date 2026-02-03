import { SystemStatusPage } from './SystemStatusPage';
import { Language } from '../hooks/useLanguage';

interface SupportLoginPageProps {
  language: Language;
}

export const SupportLoginPage = ({ language }: SupportLoginPageProps) => {
  // Esta página es IDÉNTICA a SystemStatusPage
  return <SystemStatusPage language={language} />;
};