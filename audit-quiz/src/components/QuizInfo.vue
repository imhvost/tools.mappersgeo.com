<script setup lang="ts">
import type { QuizMeta } from '@/types';

const props = defineProps<{
  type: 'start' | 'finish';
  meta?: QuizMeta;
}>();

const emit = defineEmits(['start']);
</script>

<template>
  <div class="mappers-audit-quiz-info">
    <div
      v-if="meta?.strings[`${props.type}_label`]"
      class="mappers-audit-quiz-info-label mappers-label"
    >
      {{ meta.strings[`${props.type}_label`] }}
    </div>
    <div
      v-if="meta?.strings[`${props.type}_title`]"
      class="mappers-audit-quiz-info-title mappers-h2"
    >
      {{ meta.strings[`${props.type}_title`] }}
    </div>
    <div
      v-if="meta?.strings[`${props.type}_desc`]"
      class="mappers-audit-quiz-info-desc"
      v-html="meta.strings[`${props.type}_desc`]"
    ></div>
    <div class="mappers-audit-quiz-info-btns">
      <template v-if="props.type === 'start'">
        <button
          @click="emit('start')"
          class="mappers-btn"
        >
          <span>{{ meta?.strings?.start_btn }}</span>
          <svg class="mappers-icon"><use xlink:href="#icon-arrow-right" /></svg>
        </button>
      </template>
      <template v-if="props.type === 'finish'">
        <a
          v-if="meta?.urls?.audits"
          :href="meta?.urls?.audits"
          class="mappers-btn mappers-btn-border"
        >
          {{ meta?.strings?.finish_btn_list }}
        </a>
        <a
          v-if="meta?.urls?.audit"
          :href="meta?.urls?.audit"
          class="mappers-btn"
        >
          <span>{{ meta?.strings?.finish_btn_result }}</span>
          <svg class="mappers-icon"><use xlink:href="#icon-arrow-top-right" /></svg>
        </a>
      </template>
    </div>
  </div>
</template>

<style lang="less">
.mappers-audit-quiz-info {
  padding: 40px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  text-align: center;
  max-width: 682px;
}

.mappers-audit-quiz-info-label {
  margin-bottom: -16px;
}

.mappers-audit-quiz-info-btns {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px 24px;
  margin-top: 16px;
  justify-content: center;
}
</style>
