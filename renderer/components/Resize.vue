<script lang="ts" setup>
interface Props {
	direction: 'horizontal' | 'vertical'
	vallIsNabetive?: boolean
	size: number
	maxSize: number
	minSize: number
}

interface Emits {
	(e: 'update:size', size: number): void
}

defineOptions({
	name: 'Resize'
})

const props = withDefaults(defineProps<Props>(), {
	vallIsNabetive: false,
	direction: 'horizontal',
	size: 0,
	maxSize: 0,
	minSize: 0
})
const emit = defineEmits<Emits>()

const size = ref(props.size)

let isDragging = false
let startSize = 0
let startPoint = {
	x: 0,
	y: 0
}

function startDrag(e: MouseEvent) {
	isDragging = true
	startPoint.x = e.clientX
	startPoint.y = e.clientY
	startSize = size.value
	// add event listeners
	document.addEventListener('mousemove', handleDrag)
	document.addEventListener('mouseup', stopDrag)
}

function stopDrag() {
	isDragging = false
	// remove event listeners
	document.removeEventListener('mousemove', handleDrag)
	document.removeEventListener('mouseup', stopDrag)
}

function handleDrag(e: MouseEvent) {
	if (!isDragging) return

	const diffX = props.vallIsNabetive ? startPoint.x - e.clientX : e.clientX - startPoint.x
	const diffY = props.vallIsNabetive ? startPoint.y - e.clientY : e.clientY - startPoint.y

	if (props.direction === 'horizontal') {
		size.value = Math.max(props.minSize, Math.min(props.maxSize, startSize + diffY))
		emit('update:size', size.value)
		return
	}
	size.value = Math.max(props.minSize, Math.min(props.maxSize, startSize + diffX))
	emit('update:size', size.value)
}

watchEffect(() => size.value = props.size)
</script>

<template>
	<div
		class="bg-transparent z-[999]"
		:class="direction"
		@click.stop
		@mousedown="startDrag"
		>
	</div>
</template>

<style scoped>
.horizontal {
	width: 100%;
	height: 5px;
	cursor: ns-resize;
}

.vertical {
	width: 5px;
	height: 100%;
	cursor: ew-resize;
}
</style>