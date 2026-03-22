import logManager from './log';
import { IPC_EVENTS } from '@common/constants';
import { deepClone } from '@common/utils';
import { createTranslator } from '@main/utils/translator';

import { ipcMain, Menu, type MenuItemConstructorOptions } from 'electron';

// 翻译contextMenu每一项的label
let t: ReturnType<typeof createTranslator> = createTranslator();

Menu.buildFromTemplate([])

class MenuService {
	private static _instance: MenuService;
	private _menuTemplates: Map<string, MenuItemConstructorOptions[]> = new Map(); // 菜单的内容
	private _currentMenu?: Menu = void 0; // 当前正在展示的Menu

	// 监听IPC事件
	private _setupIpcEventsListener() {
		ipcMain.handle(IPC_EVENTS.SHOW_CONTEXT_MENU, (_, menuId: string, dynamicOptions?: string) =>
			new Promise((resolve) =>
				this.showMenu(menuId, () => resolve(true), dynamicOptions)
			)
		)
	}

	// 监听语言变化
	private _setupLanguageListener() {
	}
	private constructor() {
		this._setupIpcEventsListener();
		this._setupLanguageListener();
		logManager.info('MenuService created');
	}

	public static getInstance(): MenuService {
		if (!this._instance) {
			this._instance = new MenuService();
		}
		return this._instance;
	}
	// 注册菜单
	public registerMenu(menuId: string, menuTemplate: MenuItemConstructorOptions[]) {
		this._menuTemplates.set(menuId, menuTemplate);
		return menuId;
	}
	// 销毁菜单
	public destroyMenu(menuId: string) {
		this._menuTemplates.delete(menuId);
	}
	// 清空菜单
	public clearMenu() {
		this._menuTemplates.clear();
		this._currentMenu = void 0;
	}

	/**
	 * 显示菜单(若当前菜单已存在，则不执行)
	 * @param menuId 菜单ID(不同的菜单等级不同)
	 * @param onClose 菜单关闭回调
	 * @param dynamicOptions 菜单选项
	 */
	public showMenu(menuId: string, onClose?: () => void, dynamicOptions?: string) {
		if (this._currentMenu) return;

		// 获取_menuTemplates中对应的contextMenu的每一项内容
		const template = deepClone(this._menuTemplates.get(menuId))
		if (!template) {
			logManager.warn(`MenuService: Menu ${menuId} not found`)
			onClose?.()
			return;
		}

		let _dynamicOptions: Array<Partial<MenuItemConstructorOptions> & { id: string }> = [];
		try {
			_dynamicOptions = Array.isArray(dynamicOptions) ? dynamicOptions : JSON.parse(dynamicOptions ?? '[]');
		} catch (error) {
			logManager.error(`Failed to parse dynamic options for menu ${menuId}: ${error}`)
		}

		/**
		 * 翻译菜单项
		 * @param item 菜单项
		 * @returns 翻译后的菜单项
		 */
		const translationItem = (item: MenuItemConstructorOptions): MenuItemConstructorOptions => {
			if (item.submenu) {
				return {
					...item,
					label: t(item?.label) ?? void 0,
					submenu: (item.submenu as MenuItemConstructorOptions[])?.map((item: MenuItemConstructorOptions) => translationItem(item))
				}
			}
			return {
				...item,
				label: t(item?.label) ?? void 0,
			}
		}

		// 初始化菜单
		// 遍历当前contextMenu的每一项内容
		const localizedTemplate = template.map(item => {
			// _dynamicOptions不是数组，或者是数组但长度为0
			if (!Array.isArray(_dynamicOptions) || !_dynamicOptions.length) {
				return translationItem(item)
			}
			const dynamicItem = _dynamicOptions.find(_item => _item.id === item.id)
			
			if (dynamicItem) {
				return translationItem({ ...item, ...dynamicItem })
			}

			if (item.submenu) {
				return translationItem({
					...item,
					submenu: (item.submenu as MenuItemConstructorOptions[])?.
						map((_item: MenuItemConstructorOptions) => {
							const dynamicItem = _dynamicOptions.find(_item => _item.id === _item.id)
							return { ..._item, ...dynamicItem }
						})
				})
			}
			return translationItem(item)
		})
		const menu = Menu.buildFromTemplate(localizedTemplate)
		this._currentMenu = menu;
		menu.popup({
			callback: () => {
				this._currentMenu = void 0;
				onClose?.();
			},
		})
	}
}

export const menuService = MenuService.getInstance();
export default menuService;
