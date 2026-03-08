import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// https://vitejs.dev/config
export default defineConfig({
	resolve: {
		alias: {
			'@main': resolve(__dirname, 'main'),
			'@common': resolve(__dirname, 'common'),
			'@locales': resolve(__dirname, 'locales'),
			'@renderer': resolve(__dirname, 'renderer'),
		}
	}
});
