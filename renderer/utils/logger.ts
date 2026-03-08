export const logger = window.api.logger ?? console;

if (window.api.logger) {
	console.debug = logger.debug;
	console.error = logger.error;
	console.info = logger.info;
	console.warn = logger.warn;
	console.log = logger.info;
}

export default logger;
