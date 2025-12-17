<script setup lang="ts">
import type { Question } from '@/types';

const props = defineProps<{
  question: Question;
}>();

const model = defineModel();
</script>

<template>
  <div class="mappers-audit-quiz-answer">
    <div
      v-if="question.input_type === 'radio'"
      class="mappers-audit-quiz-answer-radios"
    >
      <label
        v-for="item in question.answers"
        :key="item.val"
        class="mappers-audit-quiz-radio mappers-radio"
      >
        <input
          type="radio"
          :name="question.name"
          :value="item.val"
          v-model="model"
        />
        <i></i>
        <span>{{ item.answer }}</span>
      </label>
    </div>
    <div
      v-if="question.input_type === 'checkbox'"
      class="mappers-audit-quiz-answer-checkbox"
    >
      <label class="mappers-audit-quiz-checkbox mappers-checkbox">
        <input
          type="checkbox"
          :name="question.name"
          v-model="model"
        />
        <i></i>
        <span>{{ question.question }}</span>
      </label>
    </div>
  </div>
</template>

<style lang="less">
.mappers-audit-quiz-answer-radios {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 24px 28px;
  padding: 0 28px;
}
</style>
