<script lang="ts" setup>
import Title from '@renderer/components/TitleBar.vue';
import DragWindow from '@renderer/components/DragWindow.vue';

</script>

<template>
	<div class="main-view h-full w-full flex flex-col">
		<Title title="index">
			<DragWindow class="w-full" />
		</Title>
		<main class="flex-auto">
			<router-view></router-view>
		</main>
	</div>
</template>