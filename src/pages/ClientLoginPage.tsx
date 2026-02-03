import { SystemStatusPage } from './SystemStatusPage';
import { Language } from '../hooks/useLanguage';

interface ClientLoginPageProps {
  language: Language;
}

export const ClientLoginPage = ({ language }: ClientLoginPageProps) => {
  // Esta página es IDÉNTICA a SystemStatusPage
  return <SystemStatusPage language={language} />;
};