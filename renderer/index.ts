import './styles/index.css';
import 'vfonts/Lato.css'

import { createApp } from 'vue';
import App from '../renderer/App.vue';

import { errorHandler } from './utils';
import i18n from '@locales/index';
import router from './router'
import pinia from './store';

createApp(App)
	.use(pinia)
	.use(router)
	.use(errorHandler)
	.use(i18n)
	.mount('#app');
