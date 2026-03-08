import { createI18n, type I18nOptions } from 'vue-i18n';

async function createI18nInstance() {
	const options: I18nOptions = {
		legacy: false,
    locale: 'zh',
    fallbackLocale: 'zh',
    messages: {
      zh: await import('./language/zh.json').then(m => m.default),
      en: await import('./language/en.json').then(m => m.default),
    }
  }

  return createI18n(options)
}

export const i18n = createI18nInstance()
export default i18n;
