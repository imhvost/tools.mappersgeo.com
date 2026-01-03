<script setup lang="ts">
import type { Question } from '@/types';
import { useGlobalState } from '@/store';

const { meta } = useGlobalState();

const props = defineProps<{
  question: Question;
  index?: number;
}>();
</script>

<template>
  <div class="mappers-audit-quiz-question-head">
    <div class="mappers-audit-quiz-question-title mappers-h3">
      <span
        v-if="index"
        class="mappers-audit-quiz-question-index"
        >{{ index }}.
      </span>
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
</template>

<style lang="less">
.mappers-audit-quiz-question-head {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  @media @md {
    gap: 8px;
  }
}

.mappers-audit-quiz-question-title {
  color: @title;
  display: flex;
  align-items: flex-start;
  flex: auto;
  min-width: 0;
  align-self: center;
}

.mappers-audit-quiz-question-index {
  min-width: 28px;
  padding-right: 4px;
  flex: none;
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

.tippy-box[data-theme~='mappers-dark'] {
  background-color: @title;
  font-size: 16px;
  border-radius: 8px;
  color: @white;
  line-height: 1.4;
  .tippy-content {
    padding: 16px;
  }
}
</style>
