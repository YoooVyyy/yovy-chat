<script setup lang="ts">
import { NConfigProvider } from 'naive-ui';

</script>
<template>
  <NConfigProvider class="h-full w-[100vw] flex">
    <aside class="h-full flex flex-shrink-0 flex-col bg-amber-600">
      Aside
    </aside>
    <div class="flex-auto">
      Main
    </div>
  </NConfigProvider>
</template>
