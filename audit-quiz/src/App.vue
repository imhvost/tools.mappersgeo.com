<script setup lang="ts">
import { useFetch } from '@vueuse/core';
import { computed, onMounted, ref, watch } from 'vue';
import { useGlobalState } from '@/store';
import type { Question } from '@/types';
import QuizInfo from '@/components/QuizInfo.vue';
import QuizSection from '@/components/QuizSection.vue';
import { checkSectionCondition, checkQuestionCondition } from '@/utils';

const { audit, auditIsLoad, sections, meta } = useGlobalState();

const sectionsList = computed(() =>
  sections.value.filter(o => checkSectionCondition(o, sections.value)),
);

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
  const id = sectionsList.value[index]?.id;
  if (id) {
    goToSectionById(id);
  }
};

const goToNextSection = () => {
  const activeIndex = sectionsList.value.findIndex(o => o.id === activeSectionId.value);
  if (activeIndex !== -1) {
    const nextSection = sectionsList.value[activeIndex + 1];
    if (nextSection) {
      goToSectionById(nextSection.id);
    }
  }
};

const isSectionDone = (sectionId: number) => {
  const auditSection = audit.value[sectionId];
  if (!auditSection) {
    return false;
  }
  const section = sectionsList.value.find(o => o.id === sectionId);
  if (!section) {
    return false;
  }
  for (const item of section.quiz) {
    if (item.condition) {
      if (!checkQuestionCondition(item, sections.value)) {
        continue;
      }
    }
    const auditAnswer = auditSection.find(o => o.name === item.name);
    if (!auditAnswer) {
      return false;
    }
    if (auditAnswer.val === undefined) {
      return false;
    }
  }
  return true;
};

const isSectionEnabled = (sectionId: number) => {
  const activeIndex = sectionsList.value.findIndex(o => o.id === sectionId);
  if (activeIndex !== -1) {
    const prevSection = sectionsList.value[activeIndex - 1];
    if (prevSection) {
      return isSectionDone(prevSection.id);
    }
  }
  return false;
};
</script>

<template>
  <div class="mappers-audit-quiz-container mappers-container">
    <div
      v-if="sectionsList.length && auditIsLoad"
      class="mappers-audit-quiz"
    >
      <nav class="mappers-audit-quiz-nav">
        <ul class="mappers-audit-quiz-menu">
          <template
            v-for="(item, index) in sectionsList"
            :key="item.id"
          >
            <li>
              <button
                class="mappers-audit-quiz-nav-btn mappers-h3"
                :class="{
                  'mappers-active': item.id === activeSectionId,
                  'mappers-done': isSectionDone(item.id),
                  'mappers-enabled': isSectionEnabled(item.id),
                }"
                @click="
                  (isSectionDone(item.id) || isSectionEnabled(item.id)) && goToSectionById(item.id)
                "
              >
                <i>
                  <span>{{ index + 1 }}</span>
                  <svg class="mappers-icon"><use xlink:href="#icon-check" /></svg>
                </i>
                <span>{{ item.title }}</span>
              </button>
            </li>
          </template>
        </ul>
      </nav>
      <div class="mappers-audit-quiz-body">
        <Transition name="mappers-fade">
          <QuizInfo
            v-if="isEnd"
            type="finish"
          ></QuizInfo>
          <QuizInfo
            v-else-if="activeSectionId === undefined"
            type="start"
            @start="goToSectionByIndex(0)"
          ></QuizInfo>
          <TransitionGroup
            v-else
            tag="div"
            name="mappers-fade"
            class="mappers-audit-quiz-sections"
          >
            <template
              v-for="(item, index) in sections"
              :key="item.id"
            >
              <QuizSection
                v-if="activeSectionId === item.id"
                :key="item.id"
                :section="item"
                :is-done="isSectionDone(item.id)"
                @next="goToNextSection"
              ></QuizSection>
            </template>
          </TransitionGroup>
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
  transition: color 0.4s;
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
    span {
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
  &:hover {
    color: @link;
  }
  &.mappers-active {
    color: @link;
    pointer-events: none;
    i {
      color: @white;
      background-color: @link;
    }
  }
  &.mappers-done {
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
  &.mappers-enabled {
    pointer-events: auto;
    &.mappers-active {
      pointer-events: none;
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

.mappers-audit-quiz-sections {
  flex: auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
</style>
