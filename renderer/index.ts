import './index.css';
import { createApp } from 'vue';
import App from '../renderer/App.vue';
import { errorHandler } from './utils';

createApp(App)
	.use(errorHandler)
	.mount('#app');
