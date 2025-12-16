<script setup lang="ts">
import type { Answer, InputType } from '@/types';
import { onMounted, ref, watch } from 'vue';
import { useGlobalState } from '@/store';

const props = defineProps<{
  answers: Answer[];
  inputType: InputType;
  questionName: string;
  sectionId: number;
}>();

const { audit, updateAudit } = useGlobalState();

const model = ref<string | undefined>();

onMounted(() => {
  if (audit.value[props.sectionId]?.[props.questionName]) {
    model.value = audit.value[props.sectionId]?.[props.questionName];
  } else {
    if (props.inputType === 'radio') {
      model.value = props.answers[0]?.val;
    }
  }
});

watch(model, () => {
  updateAudit(props.sectionId, props.questionName, model.value);
});
</script>

<template>
  <div class="mappers-audit-quiz-answer">
    <div
      v-if="inputType === 'radio'"
      class="mappers-audit-quiz-answer-radios"
    >
      <label
        v-for="item in answers"
        :key="item.val"
        class="mappers-audit-quiz-radio mappers-radio"
      >
        <input
          type="radio"
          :name="questionName"
          :value="item.val"
          v-model="model"
        />
        <i></i>
        <span>{{ item.answer }}</span>
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
