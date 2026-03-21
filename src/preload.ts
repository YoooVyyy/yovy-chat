import { contextBridge, ipcRenderer } from 'electron';
import { IPC_EVENTS } from '@common/constants';

const api: WindowApi = {
	closeWindow: () => ipcRenderer.send(IPC_EVENTS.CLOSE_WINDOW),
	maximizeWindow: () => ipcRenderer.send(IPC_EVENTS.MAXIMIZE_WINDOW),
	minimizeWindow: () => ipcRenderer.send(IPC_EVENTS.MINIMIZE_WINDOW),
	isWindowMaximized: () => ipcRenderer.invoke(IPC_EVENTS.IS_WINDOW_MAXIMIZED),
	onWindowMaximized: (cb: (isMaximized: boolean) => void) =>
		ipcRenderer.on(IPC_EVENTS.MAXIMIZE_WINDOW + 'back', (_, isMaximized) => cb(isMaximized)),

	setThemeMode: (mode: ThemeMode) => ipcRenderer.invoke(IPC_EVENTS.SET_THEME_MODE, mode),
	getThemeMode: () => ipcRenderer.invoke(IPC_EVENTS.GET_THEME_MODE),
	isDarkTheme: () => ipcRenderer.invoke(IPC_EVENTS.IS_DARK_THEME),
	onSystemThemeChange: (cb: (isDark: boolean) => void) => ipcRenderer.on(IPC_EVENTS.THEME_MODE_UPDATED, (_, isDark) => cb(isDark)),

	showContextMenu: (menu: string, dynamicOptions?: string) => ipcRenderer.invoke(IPC_EVENTS.SHOW_CONTEXT_MENU, menu, dynamicOptions),
	contextMenuItemClick: (menuId: string, cb: (id: string) => void) => ipcRenderer.on(`${IPC_EVENTS.SHOW_CONTEXT_MENU}:${menuId}`, (_, id) => cb(id)),
	removeContextMenuListener: (menuId: string) => ipcRenderer.removeAllListeners(`${IPC_EVENTS.SHOW_CONTEXT_MENU}:${menuId}`),

	logger: {
		debug: (message: string, ...meta: any[]) => ipcRenderer.send(IPC_EVENTS.LOG_DEBUG, message, ...meta),
		error: (message: string, ...meta: any[]) => ipcRenderer.send(IPC_EVENTS.LOG_ERROR, message, ...meta),
		info: (message: string, ...meta: any[]) => ipcRenderer.send(IPC_EVENTS.LOG_INFO, message, ...meta),
		warn: (message: string, ...meta: any[]) => ipcRenderer.send(IPC_EVENTS.LOG_WARN, message, ...meta),
	}
}

contextBridge.exposeInMainWorld('api', api);
