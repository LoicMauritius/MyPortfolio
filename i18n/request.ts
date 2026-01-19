// i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // Attendre la résolution de la locale
  let locale = await requestLocale;
  
  // Vérifier si la locale est valide, sinon utiliser la locale par défaut
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`@/i18n/messages/${locale}.json`)).default
  };
});