<script setup lang="ts">
import type { Question } from '@/types';
import { useGlobalState } from '@/store';
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
    <div class="mappers-audit-quiz-question-head">
      <div class="mappers-audit-quiz-question-title mappers-h3">
        <span>{{ index + 1 }}. </span>
        <span>{{ question.question }}</span>
      </div>
      <button
        v-if="question.desc"
        v-tippy="{
          content: question.desc,
          zIndex: 66,
        }"
        class="mappers-audit-quiz-question-desc"
        :aria-label="meta.strings.desc_info"
      >
        <svg class="mappers-icon"><use xlink:href="#icon-question" /></svg>
      </button>
    </div>
    <QuizAnswer
      :question="question"
      :section-name="props.sectionName"
    ></QuizAnswer>
    <Transition name="mappers-tab-fade">
      <div
        v-if="selectedValue && subQuestions[selectedValue]"
        class="mappers-audit-quiz-sub-questions"
      >
        <template
          v-for="item in subQuestions[selectedValue]"
          :key="item.name"
        >
          <div
            v-if="item.input_type === 'radio'"
            class="mappers-audit-quiz-question-title mappers-h3"
          >
            {{ item.question }}
          </div>
          <QuizAnswer
            :question="item"
            :section-name="props.sectionName"
            :parent-name="question.name"
          />
        </template>
      </div>
    </Transition>
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

.mappers-audit-quiz-question-head {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  @media @md {
    gap: 8px;
  }
  .mappers-audit-quiz-question-title {
    align-self: center;
  }
}

.mappers-audit-quiz-question-title {
  color: @title;
  display: flex;
  align-items: flex-start;
  flex: auto;
  min-width: 0;
  span {
    &:first-child {
      min-width: 28px;
      padding-right: 4px;
      flex: none;
    }
  }
}

.mappers-audit-quiz-question-desc {
  flex: none;
  width: 40px;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: @bg;
  display: grid;
  place-items: center;
  color: @title;
  transition: color 0.4s;
  @media @md {
    width: 24px;
    svg {
      --size: 20px;
    }
  }
  &:hover {
    color: @link;
  }
}

.tippy-box[data-theme~='mappers'] {
  background-color: @title;
  font-size: 16px;
  border-radius: 8px;
  color: @white;
  line-height: 1.4;
  .tippy-content {
    padding: 16px;
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
