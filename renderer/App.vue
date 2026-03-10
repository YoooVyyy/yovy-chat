<script setup lang="ts">
import { NConfigProvider } from 'naive-ui';
import TitleBar from '@renderer/components/TitleBar.vue';
import DragWindow from '@renderer/components/DragWindow.vue';

onMounted(async () => {
  console.log('App mounted');
  await nextTick()
  throw new Error('test error')
});
</script>
<template>
  <NConfigProvider class="h-full w-[100vw] flex text-tx-primary">
    <aside class="sidebar h-full w-[200px] flex flex-shrink-0 flex-col">
      Aside
    </aside>
    <div class="flex-auto">
      <TitleBar title="Yovy Chat">
        <DragWindow class="w-full">
        </DragWindow>
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