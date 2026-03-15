import { createI18n, type I18nOptions, I18n } from 'vue-i18n';

const languages = ['zh', 'en'] as const;
type LanguageType = (typeof languages)[number];

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

export async function setLanguage(lang: LanguageType, _i18n?: I18n) {
  const __i18n = _i18n ?? i18n
  // __i18n.global.locale = lang
  if (__i18n.mode === 'legacy') {
    __i18n.global.locale = lang
    return;
  }
  (__i18n.global as unknown as Ref<LanguageType>).value = lang
}

export async function getLanguage() {
  const __i18n = i18n
  if (i18n.mode === 'legacy') {
    return __i18n.global.locale
  }
  return (__i18n.global as unknown as Ref<LanguageType>).value
}

export const i18n = await createI18nInstance()
export default i18n;
