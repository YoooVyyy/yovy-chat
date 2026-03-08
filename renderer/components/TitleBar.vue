<script lang="ts" setup>
import { Icon as IconifyIcon } from '@iconify/vue';
import { useWindowManager } from '@renderer/hooks/useWindowManager';

interface TitleBarProps {
  title: string;
	isMaximizable?: boolean;
	isMinimizable?: boolean;
	isClosable?: boolean;
}

defineOptions({
	name: 'TitleBar',
})
withDefaults(defineProps<TitleBarProps>(), {
	// 右上角的三个按钮: 最小化、最大化、关闭
	isMaximizable: true,
	isMinimizable: true,
	isClosable: true,
})
const emit = defineEmits(['close'])
const btnSize = 15

// 窗口状态
const {
	isMaximized,
	closeWindow,
	minimizeWindow,
	maximizeWindow
} = useWindowManager()

function handleClose() {
	emit('close')
	closeWindow()
}
</script>

<template>
	<header class="title-bar flex items-start justify-between h-[30px]">
		<div class="title-bar-main flex-auto">
			<slot>{{ title ?? '' }}</slot>
		</div>
		<div class="title-bar-controls w-[80px] flex items-center justify-end">
			<!-- 最小化 -->
			<button
				v-show="isMinimizable"
				class="title-bar-button cursor-pointer hover:bg-input"
				@click="minimizeWindow">
					<iconify-icon
						icon="material-symbols:chrome-minimize-sharp"
						:width="btnSize"
						:height="btnSize"
					/>
			</button>
			<!-- 最大化 -->
			<button
				v-show="isMaximizable"
				class="title-bar-button cursor-pointer hover:bg-input"
				@click="maximizeWindow">
					<iconify-icon
						v-show="!isMaximized"
						icon="material-symbols:chrome-maximize-outline-sharp"
						:width="btnSize"
						:height="btnSize"
					/>
					<iconify-icon
						v-show="isMaximized"
						icon="material-symbols:chrome-restore-outline-sharp"
						:width="btnSize"
						:height="btnSize"
					/>
			</button>
			<!-- 关闭 -->
			<button
				v-show="isClosable"
				class="close-button title-bar-button cursor-pointer hover:bg-red-300 "
        @click="handleClose">
					<iconify-icon
						icon="material-symbols:close"
						:width="btnSize"
						:height="btnSize"
					/>
      </button>
		</div>
	</header>
</template>

<style scoped> 
.title-bar-button {
	padding: 2px;
	border-radius: 50%;
	margin: .2rem;
}
</style>