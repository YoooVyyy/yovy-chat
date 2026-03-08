<script setup lang="ts">
import { NConfigProvider } from 'naive-ui';
import TitleBar from '@renderer/components/TitleBar.vue';
import DragWindow from '@renderer/components/DragWindow.vue';

</script>
<template>
  <NConfigProvider class="h-full w-[100vw] flex">
    <aside class="h-full flex flex-shrink-0 flex-col bg-amber-600">
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
