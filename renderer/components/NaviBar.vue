<script setup lang="ts">
import Tooltip from './Tooltip.vue';
import DragWindow from './DragWindow.vue';
import ThemeSwitcher from './ThemeSwitcher.vue';

import { Icon as IconifyIcon } from '@iconify/vue';

defineOptions({
  name: 'NaviBar'
})

const { t } = useI18n();
</script>

<template>
	<DragWindow>
		<navi
			class="h-[calc(100%-1.4rem)] flex flex-col px-4 py-2 mt-[.7rem] mb-[.7rem] border-r border-r-input text-tx-secondary">
			<ul class="flex-auto">
        <!-- 对话列表 -->
        <li class="sidebar-item no-drag cursor-pointer hover:text-primary-hover text-tx-primary">
          <Tooltip :content="t('main.sidebar.conversations')">
            <iconify-icon icon="material-symbols:chat-outline" width="24" height="24" />
          </Tooltip>
        </li>
      </ul>
      <ul>
        <!-- 主题切换 -->
        <li class="sidebar-item no-drag cursor-pointer hover:text-primary-subtle">
					<ThemeSwitcher></ThemeSwitcher>
        </li>
        <!-- 设置 -->
        <li class="sidebar-item no-drag cursor-pointer hover:text-primary-subtle">
          <Tooltip :content="t('main.sidebar.settings')">
            <iconify-icon icon="material-symbols:settings-outline" width="24" height="24" />
          </Tooltip>
        </li>
      </ul>
		</navi>
	</DragWindow>
</template>