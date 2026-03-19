<script setup lang="ts">
import ItemTitle from './ItemTitle.vue';

import { Icon as IconifyIcon } from '@iconify/vue';
import type { Conversation } from '@common/types';

defineOptions({ name: 'Item' });

const _PIN_ICON_SIZEZ = 16 as const;

const props = defineProps<Conversation>();
const emit = defineEmits(['updateTitle'])
</script>

<template>
	<!-- 大模型名称 -->
	<div class="conversation-desc text-tx-secondary flex justbetween items-center text-sn loading-5">
		<span>
			{{ selectedModel }}
			<iconify-icon
				v-if="pinned"
				class="inline-block"
				icon="material-symbols:keep-rounded" 
				:width="_PIN_ICON_SIZEZ"
				:height="_PIN_ICON_SIZEZ"/>
		</span>
	</div>
	<!-- Item标题 -->
	<div class="w-full flex items-center">
		<!-- <div class="flex-auto"> -->
		<ItemTitle :title="title"/>
		<!-- </div> -->
	</div>
</template>