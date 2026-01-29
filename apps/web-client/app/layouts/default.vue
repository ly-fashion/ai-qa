<script setup lang="ts"></script>

<template>
  <div class="min-h-screen">
    <AppHeader />
    <main class="flex">
      <AppSidebar />
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
