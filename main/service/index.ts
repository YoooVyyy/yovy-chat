import type { WindowNames } from '@common/types';
import { IPC_EVENTS } from '@common/constants';
import { debounce } from '@common/utils';
import logManager from './log';
import themeControler from './themeControler';

import path from 'node:path';
import {
	BrowserWindow,
	BrowserWindowConstructorOptions,
	ipcMain, IpcMainInvokeEvent,
	type IpcMainEvent
} from 'electron';

interface WindowState {
  instance: BrowserWindow | void;
  isHidden: boolean;
  onCreate: ((window: BrowserWindow) => void)[];
  onClose: ((window: BrowserWindow) => void)[];
}

interface SizeOptions {
  width: number; // 窗口宽度
  height: number; // 窗口高度
  maxWidth?: number; // 窗口最大宽度，可选
  maxHeight?: number; // 窗口最大高度，可选
  minWidth?: number; // 窗口最小宽度，可选
  minHeight?: number; // 窗口最小高度，可选
}

const SHARED_WINDOW_OPTIONS = {
  titleBarStyle: 'hidden',
  title: 'Yovy',
  darkTheme: themeControler.isDark,
  backgroundColor: themeControler.isDark ? '#2C2C2C' : '#FFFFFF',
  webPreferences: {
    nodeIntegration: false, // 禁用 Node.js 集成，提高安全性
    contextIsolation: true, // 启用上下文隔离，防止渲染进程访问主进程 API
    sandbox: true, // 启用沙箱模式，进一步增强安全性
    backgroundThrottling: false,
    preload: path.join(__dirname, 'preload.js'),
  },
} as BrowserWindowConstructorOptions;

class WindowService {
  private static _instance: WindowService;
  private _windowStates: Record<WindowNames | string, WindowState> = {
    main: {
      instance: void 0,
      isHidden: false,
      onCreate: [],
      onClose: [],
    }
  }

  private constructor() {
    this._setupIpcEvents();
    logManager.info('WindowService initialized successfully.');
  }

  private _setupIpcEvents() {
    const handleCloseWindow = (e: IpcMainEvent) => {
      this.close(BrowserWindow.fromWebContents(e.sender));
    }
    const handleMinimizeWindow = (e: IpcMainEvent) => {
      BrowserWindow.fromWebContents(e.sender)?.minimize();
    }
    const handleMaximizeWindow = (e: IpcMainEvent) => {
      this.toggleMax(BrowserWindow.fromWebContents(e.sender));
    }
    const handleIsWindowMaximized = (e: IpcMainInvokeEvent) => {
      return BrowserWindow.fromWebContents(e.sender)?.isMaximized() ?? false;
    }

    ipcMain.on(IPC_EVENTS.CLOSE_WINDOW, handleCloseWindow);
    ipcMain.on(IPC_EVENTS.MINIMIZE_WINDOW, handleMinimizeWindow);
    ipcMain.on(IPC_EVENTS.MAXIMIZE_WINDOW, handleMaximizeWindow);
    ipcMain.handle(IPC_EVENTS.IS_WINDOW_MAXIMIZED, handleIsWindowMaximized);
  }

  public static getInstance(): WindowService {
    if (!this._instance) {
      this._instance = new WindowService();
    }
    return this._instance;
  }

  /**
   * 创建窗口
   * @param name 窗口名字
   * @param size 窗口大小
   * @returns 窗口实例
   */
  public create(name: WindowNames, size: SizeOptions) {
    const window = new BrowserWindow({
      ...SHARED_WINDOW_OPTIONS,
      ...size,
    })

    this
      ._setupWindowLifecycle(window, name)
      ._loadWindowTemplate(window, name)
    
    this._windowStates[name].onCreate.forEach(callback => callback(window))
    return window;
  }

  /**
   * 设置窗口生命周期
   * @param window 主进程实例
   * @param name 窗口名字
   * @returns 窗口实例
   */
  private _setupWindowLifecycle(window: BrowserWindow, name: WindowNames) {
    // 窗口状态更新
    const updateWinStatus =
      debounce(() => !window?.isDestroyed()
        && window?.webContents?.send(IPC_EVENTS.MAXIMIZE_WINDOW + 'back', window?.isMaximized()), 80);
    // 窗口销毁时取消监听
    window.once('closed', () => {
      this._windowStates[name].onClose.forEach(callback => callback(window));
      window?.destroy();
      window?.removeListener('resize', updateWinStatus);
      logManager.info(`Window ${name} destroyed.`);
    });
    window.on('resize', updateWinStatus)
    return this;
  }

  /**
   * 加载窗口模板
   * @param window 
   * @param name 窗口名字
   */
  private _loadWindowTemplate(window: BrowserWindow, name: WindowNames) {
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
      return window.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}${'/html/' + (name === 'main' ? '' : name)}`);
    }
    window.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/html/${name === 'main' ? 'index' : name}.html`));
  }

  public close(target: BrowserWindow | void | null) {
    if (!target) return;
    target?.close();
  }

  public toggleMax(target: BrowserWindow | void | null) {
    if (!target) return;
    target.isMaximized() ? target.unmaximize() : target.maximize();
  }

  public onWindowCreate(name: WindowNames, callback: (window: BrowserWindow) => void) {
    this._windowStates[name].onCreate.push(callback);
  }
  public onWindowClose(name: WindowNames, callback: (window: BrowserWindow) => void) {
    this._windowStates[name].onClose.push(callback);
  }
}

export const windowManager = WindowService.getInstance();
export default windowManager;
