<script setup lang="ts">
import type { Question } from '@/types';
import { useGlobalState } from '@/store';

const { audit, updateAuditQuestion, updateAuditSubQuestion } = useGlobalState();

const props = defineProps<{
  question: Question;
  sectionName: string;
  parentName?: string;
}>();

const model = defineModel<string | undefined>({
  get() {
    if (props.parentName) {
      return audit.value[props.sectionName]
        ?.find(o => o.name === props.parentName)
        ?.sub_questions?.find(sq => sq.name === props.question.name)?.val;
    }
    return audit.value[props.sectionName]?.find(o => o.name === props.question.name)?.val;
  },
  set(value) {
    if (props.parentName) {
      updateAuditSubQuestion(props.sectionName, props.parentName, props.question.name, value);
    } else {
      updateAuditQuestion(props.sectionName, props.question.name, value);
    }
  },
});
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
          :true-value="question.answers[0]?.answer"
          :false-value="question.answers[1]?.answer"
          v-model="model"
        />
        <i>
          <svg class="mappers-icon"><use xlink:href="#icon-check" /></svg>
        </i>
        <span>{{ question.question }}</span>
      </label>
    </div>
    <template v-if="question.input_type === 'custom'">
      <div
        v-if="parentName === 'catalogs_count'"
        class="mappers-audit-quiz-answer-catalogs-count"
      >
        <label class="mappers-form-block">
          <span class="mappers-form-block-title">
            {{ question.question }}
          </span>
          <input
            type="number"
            class="mappers-input"
            v-model="model"
            :name="question.name"
          />
        </label>
      </div>
    </template>
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

.mappers-audit-quiz-answer-checkbox {
  padding: 0 28px;
}
</style>
