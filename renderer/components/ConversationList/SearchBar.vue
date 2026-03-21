<script setup lang="ts">
import { NInput, NInputGroup, NInputGroupLabel, NIcon } from 'naive-ui';
import { Icon as IconifyIcon } from '@iconify/vue';

import { useFilter, useContextMenu } from './utils';

defineOptions({
  name: 'SearchBar'
})

const { t } = useI18n();
const { searchKey } = useFilter();
const { handle: handleSearchBarContextMenu } = useContextMenu();
</script>

<template>
	<div class="my-2" @contenxtmenu.stop @click.stop>
		<NInputGroup>
			<NInput
			v-model:value="searchKey"
				size="small"
				:placeholder="t('main.conversation.searchPlaceholder')"
				clearable
			>
				<template #prefix>
					<IconifyIcon icon="material-symbols:search" />
				</template>
			</NInput>
			<NInputGroupLabel class="cursor-pointer flex justify-between items-center" @click="handleSearchBarContextMenu()">
				<NIcon>
					<iconify-icon icon="material-symbols:menu" />
				</NIcon>
			</NInputGroupLabel>
		</NInputGroup>
	</div>
</template>

<style scoped>
.n-input_wrapper,
.n-input__input {
	align-items: center;
}

.n-input-group-label,
.n-input__input {
	display: flex;
}

:deep(.n-input__input-el) {
	translate: 0 3px !important;
}
</style>