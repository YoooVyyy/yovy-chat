/**
 * 
 * @returns isMaximized: 当前窗口是否最大化
 * closeWindow: 关闭窗口
 * minimizeWindow: 最小化窗口
 * maximizeWindow: 最大化窗口
 */
export function useWindowManager() {
  const isMaximized = ref(false)

  function closeWindow() {
    window.api.closeWindow();
  }

  function minimizeWindow() {
    window.api.minimizeWindow();
  }

  function maximizeWindow() {
    window.api.maximizeWindow();
  }

  onMounted(async () => {
    await nextTick();
    isMaximized.value = await window.api.isWindowMaximized();
    window.api.onWindowMaximized((_isMaximized: boolean) => isMaximized.value = _isMaximized);
  })

  return {
    isMaximized,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
  }
};

export default useWindowManager;