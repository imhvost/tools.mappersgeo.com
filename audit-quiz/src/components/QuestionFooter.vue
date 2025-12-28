<script setup lang="ts">
import type { Question } from '@/types';
import { useGlobalState } from '@/store';

const { meta } = useGlobalState();

const props = defineProps<{
  question: Question;
}>();
</script>

<template>
  <div
    v-if="question.do || question.auditor_note"
    class="mappers-audit-quiz-question-foot"
  >
    <div
      v-if="question.do"
      class="mappers-audit-quiz-question-do"
    >
      <div
        v-if="meta?.strings.do"
        class="mappers-audit-quiz-do-title"
      >
        {{ meta.strings.do }}
      </div>
      <div
        class="mappers-audit-quiz-question-do-desc mappers-content-text"
        v-html="question.do"
      ></div>
    </div>
    <div
      v-if="question.auditor_note"
      class="mappers-audit-quiz-question-note mappers-content-text"
      v-html="question.auditor_note"
    ></div>
  </div>
</template>

<style lang="less">
.mappers-audit-quiz-question-foot {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.mappers-audit-quiz-question-do {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  @media @md {
    flex-direction: column;
  }
}

.mappers-audit-quiz-do-title {
  flex: none;

  font-weight: 600;
  @media @md_ {
    max-width: 25%;
  }
}

.mappers-audit-quiz-question-do-desc {
  color: @placeholder;
}

.mappers-audit-quiz-question-note {
  padding: 24px;
  border-radius: 4px;
  background-color: @bg;
  border-left: solid 4px fade(@link, 25%);
  color: @title;
  @media @md {
    background-color: @white;
  }
}
</style>
