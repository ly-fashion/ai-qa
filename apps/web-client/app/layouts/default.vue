<script setup lang="ts">
import AppSidebar from '~/layouts/AppSidebar/index.vue';
</script>

<template>
  <div class="flex h-screen w-full bg-[#212121] overflow-hidden">
    <AppSidebar />
    <main class="flex-1 flex flex-col min-w-0 bg-[#212121] text-gray-100 relative">
      <slot />
    </main>
  </div>
</template>
