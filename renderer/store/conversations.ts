import type { Conversation } from '@common/types';
import { conversations as testData } from './test/testData';

export const useConversationsStore = defineStore('conversations', () => {
	const conversations = ref<Conversation[]>(testData)

	const allConversations = computed(() => {
		return conversations.value
	})

	return {
		conversations,
		allConversations
	}
})
