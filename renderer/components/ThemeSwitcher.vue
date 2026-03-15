<script setup lang="ts">
import Tooltip from './Tooltip.vue';

import { useThemeMode } from '@renderer/hooks/useThemeMode';

import { Icon as IconifyIcon } from '@iconify/vue';

defineOptions({
  name: 'ThemeSwitcher',
});

const {
	themeIcon,
	themeTooltip,
	setThemeMode
} = useThemeMode();

const isDarkMode = usePreferredDark();

function toggleThemeMode() {
	setThemeMode(isDarkMode.value ? 'light' : 'dark');
}
</script>

<template>
	<Tooltip :content="themeTooltip">
		<iconify-icon :icon="themeIcon" width="24" height="24" @click="toggleThemeMode" />
	</Tooltip>
</template>