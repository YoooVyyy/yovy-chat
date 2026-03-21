<script setup lang="ts">
import SearchBar from './SearchBar.vue';
import Item from './Item.vue';

import { useFilter } from './utils';
import { CTX_KEY } from './constants';
import { useContextMenu } from './utils/useContextMenu';
import { Conversation } from '@common/types';
import { CONVERSATION_ITEM_MENU_IDS, MENU_ID } from '@common/constants';
import { createContextMenu } from '@renderer/utils/contextMenu';

defineOptions({
  name: 'ConversationList'
})

const props = defineProps<{ width: number }>();

const { conversations } = useFilter();
const { handle: handleListContextMenu } = useContextMenu();
const conversationItemActionPolicy = new Map([
	[CONVERSATION_ITEM_MENU_IDS.DELETE, () => {
		console.log('delete')
	}],
	[CONVERSATION_ITEM_MENU_IDS.PIN, () => {
		console.log('pin')
	}],
	[CONVERSATION_ITEM_MENU_IDS.RENAME, () => {
		console.log('rename')
	}],
])

async function handleItemContextMenu(_item: Conversation) {
	const clickitem = await createContextMenu(MENU_ID.CONVERSATION_ITEM, void 0) as CONVERSATION_ITEM_MENU_IDS
	const action = conversationItemActionPolicy.get(clickitem)
	action && await action?.()
}

provide(CTX_KEY, {
  width: computed(() => props.width)
});
</script>

<template>
	<div class="conversation-list px-2 pt-3 h-[100vh] flex flex-col" :style="{
		width: 'calc(100% - 57px)'
	}"
	@contextmenu.prevent.stop="handleListContextMenu"
	>
		<SearchBar class="mt-3"></SearchBar>
		<ul class="flex-auto overflow-auto">
			<template v-for="item in conversations" :key="item.id">
				<li
					v-if="item.type !== 'divider'"
					class="cursor-pointer p-2 mt-2 rounded-md hover:bg-input flex flex-col items-start gap-2"
					@contextmenu.prevent.stop="handleItemContextMenu(item)"
				>
					<Item v-bind="item" />
				</li>
				<li v-else class="divider my-2 h-px bg-input"></li>
			</template>
		</ul>
	</div>
</template>