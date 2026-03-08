<template>
	<div class="drag-window">
		<slot>
			<span class="_placeholder">_hidden</span>
		</slot>
	</div>
</template>

<style scoped>
._placeholder {
	opacity: 0;
}
</style>