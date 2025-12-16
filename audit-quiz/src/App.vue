<script setup lang="ts">
import { useFetch } from '@vueuse/core';
import { computed, onMounted, ref, watch } from 'vue';
import { useGlobalState } from '@/store';
import type { Question, QuizMeta, Section } from '@/types';
import QuizInfo from '@/components/QuizInfo.vue';
import QuizSection from '@/components/QuizSection.vue';
import { parseCondition, getValueByPath, evaluateConditionValue } from '@/utils';

const { audit, auditIsLoad } = useGlobalState();

const sections = ref<Section[]>([]);
const meta = ref<QuizMeta>();

const activeSectionId = ref<number>();

watch(auditIsLoad, () => {
  if (Object.keys(audit.value).length) {
    activeSectionId.value = Number(Object.keys(audit.value).pop());
  }
});

const isEnd = computed(() => {
  return false;
});

onMounted(async () => {
  const { data: auditQuizMeta } = await useFetch<Record<string, string>>(
    `${import.meta.env.VITE_WP_URI}${import.meta.env.VITE_WP_API_BASE}/mappers-audit-quiz-meta/`,
  ).json();

  if (auditQuizMeta.value) {
    meta.value = auditQuizMeta.value;
  }

  const { data: auditQuiz } = await useFetch<Question[]>(
    `${import.meta.env.VITE_WP_URI}${import.meta.env.VITE_WP_API_BASE}/mappers-audit-quiz/`,
  ).json();

  if (auditQuiz.value) {
    sections.value = auditQuiz.value;
  }
});

const goToSectionById = (id: number) => {
  activeSectionId.value = id;
};

const goToSectionByIndex = (index: number) => {
  const id = sections.value[index]?.id;
  if (id) {
    goToSectionById(id);
  }
};

const checkSectionCondition = (section: Section) => {
  if (!section.condition) {
    return true;
  }
  const { operator, fieldPath, value } = parseCondition(section.condition);
  const conditionSection = sections.value.find(o => o.name === fieldPath[0]);
  if (!conditionSection) {
    return false;
  }
  const conditionValue = getValueByPath(conditionSection, fieldPath);
  return evaluateConditionValue(conditionValue, operator, value);
};

const checkQuestionCondition = (question: Question) => {
  if (!question.condition) {
    return true;
  }
  const { operator, fieldPath, value } = parseCondition(question.condition);
  if (fieldPath.length !== 2) {
    fieldPath.unshift(question.name);
  }
  const conditionSection = sections.value.find(o => o.name === fieldPath[0]);
  if (!conditionSection) {
    return false;
  }
  const conditionValue = getValueByPath(conditionSection, fieldPath);
  return evaluateConditionValue(conditionValue, operator, value);
};

const isSectionDone = (sectionId: number) => {
  const auditSection = audit.value[sectionId];
  if (!auditSection) {
    return false;
  }
  const section = sections.value.find(o => o.id === sectionId);
  if (!section) {
    return false;
  }
  for (const item of section.quiz) {
    if (item.condition) {
      if (!checkQuestionCondition(item)) {
        continue;
      }
    }
    if (auditSection[item.name] === undefined) {
      return false;
    }
  }
  return true;
};
</script>

<template>
  <div class="mappers-audit-quiz-container mappers-container">
    <div
      v-if="sections.length && auditIsLoad"
      class="mappers-audit-quiz"
    >
      <nav class="mappers-audit-quiz-nav">
        <ul class="mappers-audit-quiz-menu">
          <template
            v-for="(item, index) in sections"
            :key="item.id"
          >
            <li v-if="checkSectionCondition(item)">
              <button
                class="mappers-audit-quiz-nav-btn mappers-h3"
                :class="{
                  'mappers-active': item.id === activeSectionId,
                  'mappers-done': isSectionDone(item.id),
                }"
                @click="isSectionDone(item.id) && goToSectionById(item.id)"
              >
                <i>
                  <svg class="mappers-icon"><use xlink:href="#icon-check" /></svg>
                </i>
                <span>{{ item.title }}</span>
              </button>
            </li>
          </template>
        </ul>
      </nav>
      <div class="mappers-audit-quiz-body">
        <Transition
          name="mappers-fade"
          mode="out-in"
        >
          <QuizInfo
            v-if="isEnd"
            type="finish"
            :meta="meta"
          ></QuizInfo>
          <QuizInfo
            v-else-if="activeSectionId === undefined"
            type="start"
            :meta="meta"
            @start="goToSectionByIndex(0)"
          ></QuizInfo>
          <div
            class="mappers-audit-quiz-sections"
            v-else
          >
            <template
              v-for="(item, index) in sections"
              :key="item.id"
            >
              <QuizSection
                v-if="activeSectionId === item.id"
                :meta="meta"
                :section="item"
              ></QuizSection>
            </template>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.mappers-audit-quiz-container {
  flex: auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.mappers-audit-quiz {
  display: flex;
  flex: auto;
  border-radius: 16px;
  background-color: @white;
  min-height: 0;
}

.mappers-audit-quiz-nav {
  flex: none;
  width: 350px;
  display: flex;
  flex-direction: column;
  padding: 24px 0;
  border-radius: 16px 10px 10px 16px;
  box-shadow: 2px 2px 20px 0px #52422f1f;
  position: relative;
  z-index: 1;
  border: solid 1px @border;
}

.mappers-audit-quiz-menu {
  counter-reset: counter;
  li {
    display: flex;
    border-bottom: solid 1px @border;
    &:last-child {
      border-bottom: 0;
    }
  }
}

.mappers-audit-quiz-nav-btn {
  padding: 24px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  pointer-events: none;
  color: @title;
  i {
    flex: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ededed;
    display: grid;
    place-items: center;
    font-style: normal;
    position: relative;
    transition:
      color 0.4s,
      background-color 0.4s;
    &:before {
      content: counter(counter);
      counter-increment: counter;
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      transition: opacity 0.4s;
    }
    svg {
      opacity: 0;
      transition: opacity 0.4s;
    }
  }
  &.mappers-active {
    i {
      color: @white;
      background-color: @link;
    }
  }
  &.mappest-done {
    pointer-events: auto;
    i {
      color: @white;
      background-color: #27b680;
      span {
        opacity: 0;
      }
      svg {
        opacity: 1;
      }
    }
  }
}

.mappers-audit-quiz-body {
  flex: auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.mappers-audit-quiz-section-intro {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.mappers-audit-quiz-section-intro-label {
  margin-bottom: -8px;
}
</style>
