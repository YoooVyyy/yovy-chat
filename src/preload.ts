import { contextBridge, ipcRenderer } from 'electron';
import { IPC_EVENTS } from '@common/constants';

const api: WindowApi = {
	closeWindow: () => ipcRenderer.send(IPC_EVENTS.CLOSE_WINDOW),
	minimizeWindow: () => ipcRenderer.send(IPC_EVENTS.MINIMIZE_WINDOW),
	maximizeWindow: () => ipcRenderer.send(IPC_EVENTS.MAXIMIZE_WINDOW),
	isWindowMaximized: () => ipcRenderer.invoke(IPC_EVENTS.IS_WINDOW_MAXIMIZED),
	onWindowMaximized: (cb: (isMaximized: boolean) => void) => ipcRenderer.on(IPC_EVENTS.MAXIMIZE_WINDOW + 'back', (_, isMaximized) => cb(isMaximized)),
}

contextBridge.exposeInMainWorld('api', api);
