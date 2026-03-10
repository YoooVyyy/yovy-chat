<script setup lang="ts">
import { NConfigProvider } from 'naive-ui';
import TitleBar from '@renderer/components/TitleBar.vue';
import DragWindow from '@renderer/components/DragWindow.vue';
import NaviBar from '@renderer/components/NaviBar.vue';

onMounted(async () => {
  console.log('App mounted');
  await nextTick()
  throw new Error('test error')
});
</script>

<template>
  <NConfigProvider class="h-full w-[100vw] flex text-tx-primary">
    <aside class="sidebar h-full w-[320px] flex flex-shrink-0 flex-col">
      <div class="flex-auto flex">
        <NaviBar />
        <div class="flex-auto">
          conversation-list
        </div>
      </div>
    </aside>
    <div class="flex-auto">
      <TitleBar title="Yovy Chat">
        <DragWindow class="w-full" />
      </TitleBar>
      Main
    </div>
  </NConfigProvider>
</template>

<style scoped>
.sidebar {
  background-color: var(--bg-color);
  box-shadow: -3px -2px 10px rgba(101, 101, 101, 0.2);
}
</style>