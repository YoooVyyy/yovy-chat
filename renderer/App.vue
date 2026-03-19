<script setup lang="ts">
import { NConfigProvider } from 'naive-ui';
import NaviBar from '@renderer/components/NaviBar.vue';
import Resize from '@renderer/components/Resize.vue';
import ConversationList from '@renderer/components/ConversationList/index.vue';

onMounted(async () => {
  console.log('App mounted');
  await nextTick()
  throw new Error('test error')
});

const sidebarWidth = ref(320);
</script>

<template>
  <NConfigProvider class="h-full w-[100vw] flex text-tx-primary">
    <aside class="sidebar h-full flex flex-shrink-0 flex-col" :style="{ width: sidebarWidth + 'px' }">
      <div class="flex-auto flex">
        <NaviBar />
        <ConversationList class="flex-auto" :width="sidebarWidth" />
      </div>
    </aside>
    <Resize
      direction="vertical"
      v-model:size="sidebarWidth"
      :max-size="800"
      :min-size="320"
    />
    <div class="flex-auto">
      <router-view></router-view>
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