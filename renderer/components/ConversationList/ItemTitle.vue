<script setup lang="ts">
import { CTX_KEY } from './constants';

import Tooltip from '../Tooltip.vue';

interface ItenTitleProps {
  title: string
}

defineOptions({ name: 'ItemTitle' })

const props = defineProps<ItenTitleProps>()
const isTitleOverflow = ref(false)
const ctx = inject(CTX_KEY, void 0)
const titleRef = useTemplateRef<HTMLElement>('titleRef')

// 判断标题文本是否溢出
function checkOverflow(el: HTMLElement | null): boolean {
	if (!el) return false
	return el.scrollWidth > el.clientWidth
}

function _updateOverflowStatus() {
	isTitleOverflow.value = checkOverflow(titleRef.value)
}

const updateOverflowStatus = useDebounceFn(_updateOverflowStatus, 100)

onMounted(() => {
	updateOverflowStatus()
	window.addEventListener('resize', updateOverflowStatus)
})

onUnmounted(() => {
	window.removeEventListener('resize', updateOverflowStatus)
})

watch([() => props.title, () => ctx?.width.value], () => {
	updateOverflowStatus()
})
</script>

<template>
	<h2 ref="titleRef" class="conversation-title w-full text-tx-secondary font-semibold loading-5 truncate">
		<template v-if="isTitleOverflow">
			<Tooltip :content="title">
				{{ title }}
			</Tooltip>
		</template>
		<template v-else>
			{{ title }}
		</template>
	</h2>
</template>