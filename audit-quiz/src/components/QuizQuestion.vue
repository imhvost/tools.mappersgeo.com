<script setup lang="ts">
import type { Question } from '@/types';

const props = defineProps<{
  question?: Question;
}>();
</script>

<template>
  <div class="mappers-audit-quiz-question"></div>
</template>

<style lang="less"></style>
