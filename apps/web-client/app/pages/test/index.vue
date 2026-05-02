<script setup lang="ts">
import { ref } from 'vue';

const title = ref('测试');
const desc = ref('这是一个测试页面');
</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ desc }}</p>
  </div>
</template>

<style lang="scss" scoped></style>
