import { defineConfig, type CSSOptions } from 'vite';
import { resolve } from 'node:path';

export default defineConfig(async () => {
  const vue = (await import('@vitejs/plugin-vue')).default;
  const tailwindcss = (await import('@tailwindcss/vite')).default;
  const autoImport = (await import('unplugin-auto-import/vite')).default;

  return {
    plugins: [
      vue(),
      tailwindcss(),
      autoImport({
        imports: [
          'vue',
          'vue-router',
          'pinia',
          'vue-i18n',
          '@vueuse/core',
        ],
        dts: 'renderer/auto-import.d.ts',
      })
    ],
    css: {
      transformer: 'lightningcss' as CSSOptions['transformer'],
    },
    build: {
      target: 'es2022',
      publicDir: 'public',
      rollupOptions: {
        input: [
          resolve(__dirname, 'html/index.html'),
          resolve(__dirname, 'html/dialog.html'),
          resolve(__dirname, 'html/setting.html'),
        ]
      }
    },
    resolve: {
      alias: {
        '@main': resolve(__dirname, 'main'),
        '@common': resolve(__dirname, 'common'),
        '@locales': resolve(__dirname, 'locales'),
        '@renderer': resolve(__dirname, 'renderer'),
      }
    }
  }
});
