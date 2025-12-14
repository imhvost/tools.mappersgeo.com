<script setup lang="ts">
import type { QuizMeta } from '@/types';

const props = defineProps<{
  type: 'start' | 'finish';
  meta?: QuizMeta;
}>();

const emit = defineEmits(['start']);
</script>

<template>
  <div class="mappers-audit-quiz-tab-info">
    <div
      v-if="meta?.strings?.[`${props.type}_label`]"
      class="mappers-audit-quiz-tab-info-label"
    >
      {{ meta.strings[`${props.type}_label`] }}
    </div>
    <div
      v-if="meta?.strings?.[`${props.type}_title`]"
      class="mappers-audit-quiz-tab-info-title"
    >
      {{ meta.strings[`${props.type}_title`] }}
    </div>
    <div
      v-if="meta?.strings?.[`${props.type}_desc`]"
      class="mappers-audit-quiz-tab-info-desc"
      v-html="meta.strings[`${props.type}_desc`]"
    ></div>
    <div class="mappers-audit-quiz-tab-info-btns">
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

<style lang="less"></style>
