import './styles/index.css';
import 'vfonts/Lato.css'

import { createApp } from 'vue';
import App from '../renderer/App.vue';

import { errorHandler } from './utils';
import i18n from '@locales/index';

createApp(App)
	.use(errorHandler)
	.use(await i18n)
	.mount('#app');
