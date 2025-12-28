<script setup lang="ts">
import type { Question } from '@/types';
import { useGlobalState } from '@/store';
import QuestionHeader from '@/components/QuestionHeader.vue';
import QuestionFooter from '@/components/QuestionFooter.vue';
import QuizAnswer from '@/components/QuizAnswer.vue';
import { computed, onMounted } from 'vue';

const props = defineProps<{
  question: Question;
  index: number;
  sectionName: string;
}>();

const { audit, meta, updateAuditQuestion } = useGlobalState();

const subQuestions = computed(() => {
  return props.question.answers.reduce(
    (accumulator, el) => {
      if (el.sub_questions.length) {
        if (!accumulator[el.val]) {
          accumulator[el.val] = [];
        }
        accumulator[el.val] = el.sub_questions;
      }
      return accumulator;
    },
    {} as Record<string, Question[]>,
  );
});

const selectedValue = computed<string | undefined>(
  () =>
    audit.value
      .find(o => o.name === props.sectionName)
      ?.quiz.find(o => o.name === props.question.name)?.val,
);

onMounted(() => {
  if (props.question.input_type === 'custom') {
    updateAuditQuestion(props.sectionName, props.question.name, 'yes');
  }
});
</script>

<template>
  <div
    class="mappers-audit-quiz-question"
    :data-name="question.name"
    :data-type="question.input_type"
  >
    <QuestionHeader
      :question="question"
      :index="index + 1"
    ></QuestionHeader>
    <QuizAnswer
      :question="question"
      :section-name="props.sectionName"
    ></QuizAnswer>
    <Transition name="mappers-tab-fade">
      <div
        v-if="selectedValue && subQuestions[selectedValue]"
        class="mappers-audit-quiz-sub-questions"
      >
        <div
          class="mappers-audit-quiz-sub-question"
          v-for="item in subQuestions[selectedValue]"
          :key="item.name"
        >
          <QuestionHeader
            v-if="item.input_type === 'radio'"
            :question="item"
          ></QuestionHeader>
          <QuizAnswer
            :question="item"
            :section-name="props.sectionName"
            :parent-name="question.name"
          />
          <QuestionFooter :question="item"></QuestionFooter>
        </div>
      </div>
    </Transition>
    <QuestionFooter :question="question"></QuestionFooter>
  </div>
</template>

<style lang="less">
.mappers-audit-quiz-question {
  display: flex;
  flex-direction: column;
  gap: 24px;
  &[data-type='custom'] {
    & > .mappers-audit-quiz-answer {
      display: none;
    }
    &[data-name='photos_content'] {
      .mappers-audit-quiz-sub-questions {
        padding: 0;
      }
    }
    &[data-name='catalogs_count'] {
      .mappers-audit-quiz-sub-questions {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }
    }
  }
}

.mappers-audit-quiz-sub-questions {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 8px;
  @media @md_ {
    padding: 0 28px;
  }
}

.mappers-audit-quiz-sub-question {
  display: flex;
  flex-direction: column;
  gap: 8px;
  .mappers-audit-quiz-question-title {
    padding-left: 28px;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      left: 12px;
      top: calc(0.5lh - 2px);
      border-radius: 50%;
      width: 4px;
      aspect-ratio: 1;
      background-color: currentColor;
    }
  }
}
</style>
