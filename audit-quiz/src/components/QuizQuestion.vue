<script setup lang="ts">
import type { Question } from '@/types';
import { useGlobalState } from '@/store';
import QuizAnswer from '@/components/QuizAnswer.vue';
import { computed } from 'vue';

const props = defineProps<{
  question: Question;
  index: number;
  sectionId: number;
}>();

const { audit, meta, updateAuditQuestion, updateAuditSubQuestion } = useGlobalState();

const subquestions = computed(() => {
  return props.question.answers.reduce(
    (accumulator, el) => {
      if (el.sub_questions.length) {
        accumulator.push({ [el.val]: el.sub_questions });
      }
      return accumulator;
    },
    [] as Record<string, Question[]>[],
  );
});

const answerModel = computed<string | undefined>({
  get() {
    return audit.value[props.sectionId]?.find(o => o.name === props.question.name)?.val;
  },
  set(value) {
    updateAuditQuestion(props.sectionId, props.question.name, value);
  },
});
</script>

<template>
  <div class="mappers-audit-quiz-question">
    <div class="mappers-audit-quiz-question-title mappers-h3">
      <span>{{ index + 1 }}. </span>
      <span>{{ question.question }}</span>
    </div>
    <QuizAnswer
      :question="question"
      v-model="answerModel"
    ></QuizAnswer>
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
.mappers-audit-quiz-question {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.mappers-audit-quiz-question-title {
  color: @title;
  display: flex;
  align-items: flex-start;
  span {
    &:first-child {
      min-width: 28px;
      padding-right: 4px;
      flex: none;
    }
  }
}

.mappers-audit-quiz-question-do {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.mappers-audit-quiz-do-title {
  flex: none;
  max-width: 25%;
  font-weight: 600;
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
}
</style>
