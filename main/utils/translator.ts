import logManager from '@main/service/log';
import en from '@locales/language/en.json';
import zh from '@locales/language/zh.json';

type MessageSchema = typeof zh;
const messages: Record<string, MessageSchema> = { en, zh };

// 翻译locales里的文案
export function createTranslator() {
	return (key?: string) => {
		if(!key) return void 0
		try {
			const keys = key?.split('.')
			let result: any = messages['zh']
			for (const k of keys) {
				result = result[k]
			}
			return result as string
		} catch(err) {
			logManager.error('Failed to translate key: ', key, err)
			return key
		}
	}
}
