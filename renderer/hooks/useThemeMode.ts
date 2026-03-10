const iconMap = new Map([
  ['system', 'material-symbols:auto-awesome-outline'],
  ['light', 'material-symbols:light-mode-outline'],
  ['dark', 'material-symbols:dark-mode-outline'],
])

/**
 * 
 * @returns { themeMode, isDark, setThemeMode, getThemeMode, onThemeChange }
 */
export function useThemeMode() {
	const themeMode = ref<ThemeMode>('light');
	const isDark = ref<boolean>(false)
	const themeIcon = computed(() => iconMap.get(themeMode.value)
		|| 'material-symbols:auto-awesome-outline')
	const themeChangeCallBacks: Array<(mode: ThemeMode) => void> = [];

	function setThemeMode(mode: ThemeMode) {
		themeMode.value = mode;
		window.api.setThemeMode(mode);
	}

	function getThemeMode() {
		return themeMode.value;
	}

	function onThemeChange(cb: (mode: ThemeMode) => void) {
		themeChangeCallBacks.push(cb);
	}

	onMounted(async () => {
		// window.api.isDarkTheme().then((res) => {
		// 	isDark.value = res;
		// })
		window.api.onSystemThemeChange((_isDark: boolean) => {
			window.api.getThemeMode().then((res) => {
				isDark.value = _isDark;
				if(res !== themeMode.value) themeMode.value = res;
				themeChangeCallBacks.forEach((cb) => cb(res));
			})
		})
		themeMode.value = await window.api.getThemeMode();
	})

	return {
		themeMode,
		isDark,
		themeIcon,
		setThemeMode,
		getThemeMode,
		onThemeChange,
	}
}

export default useThemeMode;
