interface WindowApi {
	closeWindow: () => void;
	maximizeWindow: () => void;
	minimizeWindow: () => void;
	isWindowMaximized: () => Promise<boolean>;
	onWindowMaximized: (cb: (isMaximized: boolean) => void) => void;
}

declare interface Window {
	api: WindowApi;
}