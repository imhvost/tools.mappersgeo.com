<script setup lang="ts">
import { useFetch } from '@vueuse/core';
import { onMounted, ref } from 'vue';
import type { Question } from '@/types';

const questions = ref<Question[]>([]);

onMounted(async () => {
  const { isFetching, error, data } = await useFetch<Question[]>(
    'http://localhost/work/fl/mappersgeo/wp-json/lac/v1/mappers-audit-quiz?per_page=5&page=1',
  ).json();

  if (data.value) {
    questions.value = data.value;
  }
});
</script>

<template>
  <div class="mappers-main">
    <div class="mappers-container">
      {{ questions }}
      <div class="mappers-audit-quiz"></div>
    </div>
  </div>
</template>

<style scoped>
body {
  min-height: 100vh;
}
</style>
