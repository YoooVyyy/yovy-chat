import logger from './logger';
import type { Plugin } from 'vue';

export const errorHandler: Plugin = function (app) {
	app.config.errorHandler = (err, instance, info) => {
		logger.error('Vue error:', err, instance, info);
	};

	window.onerror = (message, source, lineno, colno, error) => {
		logger.error('Windows error: ', message, source, lineno, colno, error);
	};

	window.onunhandledrejection = (event) => {
		logger.error('Unhandled Promise Rejection: ', event);
	};
}
