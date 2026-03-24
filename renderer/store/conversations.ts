import type { Conversation } from '@common/types';
import { dataBase } from '../dataBase';
import { debounce } from '@common/utils';

type SortBy = 'updatedAt' | 'createdAt' | 'name' | 'model';
type SortOrder = 'asc' | 'desc';

const SORT_BY_KEY = 'conversation:sortBy';
const SORT_ORDER_KEY = 'conversation:sortOrder';

const saveSortMode = debounce(({ sortBy, sortOrder }: { sortBy: SortBy, sortOrder: SortOrder }) => {
	localStorage.setItem(SORT_BY_KEY, sortBy)
	localStorage.setItem(SORT_ORDER_KEY, sortOrder)
}, 350)

export const useConversationsStore = defineStore('conversations', () => {
	const conversations = ref<Conversation[]>([])

	const saveSortBy = localStorage.getItem(SORT_BY_KEY) as SortBy
	const saveSortOrder = localStorage.getItem(SORT_ORDER_KEY) as SortOrder
	const sortBy = ref<SortBy>(saveSortBy ?? 'createdAt')
	const sortOrder = ref<SortOrder>(saveSortOrder ?? 'desc')

	const allConversations = computed(() => {
		return conversations.value
	})

	const sortMode = computed(() => {
		return { sortBy: sortBy.value, sortOrder: sortOrder.value }
	})

	function setSortMode(_sortBy: SortBy, _sortOrder: SortOrder) {
		if (sortBy.value !== _sortBy) {
			sortBy.value = _sortBy
		}
		if (sortOrder.value !== _sortOrder) {
			sortOrder.value = _sortOrder
		}
	}

	function getConversationById(id: number) {
		return conversations.value.find(item => item.id === id) as Conversation | void;
	}

	async function addConversation(conversation: Omit<Conversation, 'id'>) {
		const conversationWithPin = {
			...conversation,
			pinned: conversation.pinned ?? false,
		}

		const conversationId = await dataBase.conversations.add(conversationWithPin)
		conversations.value.push({
			...conversationWithPin,
			id: conversationId,
		})

		return conversationId;
	}
	async function deleteConversation(id: number) {
		await dataBase.messages.where('conversationId').equals(id).delete()
		await dataBase.conversations.delete(id)
		conversations.value = conversations.value.filter(item => item.id !== id)
	}

	async function updateConversation(conversation: Conversation, updateTime: boolean = true) {
		const _newConversation = {
			...conversation,
			updatedAt: updateTime ? Date.now() : conversation.updatedAt,
		}
		await dataBase.conversations.update(conversation.id, _newConversation)
		conversations.value = conversations.value.map(item => item.id === conversation.id ? _newConversation : item)
	}

	async function pinConversation(id: number) {
		const conversation = conversations.value.find(item => item.id === id)
		if (!conversation) return;
		// 将会话置顶不触发updateConversation的时间更新
		await updateConversation({
			...conversation,
			pinned: !conversation.pinned,

		}, false)
	}

	async function unpinConversation(id: number) {
		const conversation = conversations.value.find(item => item.id === id)
		if (!conversation) return;
		await updateConversation({
			...conversation,
			pinned: false,
		}, false)
	}

	watch([() => sortBy.value, () => sortOrder.value], () => saveSortMode({
		sortBy: sortBy.value,
		sortOrder: sortOrder.value
	}))

	async function initialize() {
		conversations.value = await dataBase.conversations.toArray()
		// 清除无用的message
		const conversationIds = conversations.value.map(item => item.id)
		const msgs = await dataBase.messages.toArray()
		// 将messageId存在，但message里的conversationId不存在的item清除
		const invalidId = msgs.filter(item =>
			!conversationIds.includes(item.conversationId)).map(item => item.id)
		invalidId.length && dataBase.messages.where('id').anyOf(invalidId).delete()
	}

	return {
		// States
		conversations,
		sortBy,
		sortOrder,

		// Getters
		allConversations,
		sortMode,

		// Actions
		initialize,
		setSortMode,
		getConversationById,
		addConversation,
		deleteConversation,
		updateConversation,
		pinConversation,
		unpinConversation,
	}
})
