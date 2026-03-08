interface WindowApi {
	closeWindow: () => void;
	maximizeWindow: () => void;
	minimizeWindow: () => void;
	isWindowMaximized: () => Promise<boolean>;
	onWindowMaximized: (cb: (isMaximized: boolean) => void) => void;

	logger: {
		debug: (message: string, ...meta?: any[]) => void;
		error: (message: string, ...meta?: any[]) => void;
		info: (message: string, ...meta?: any[]) => void;
		warn: (message: string, ...meta?: any[]) => void;
	}
}

declare interface Window {
	api: WindowApi;
}