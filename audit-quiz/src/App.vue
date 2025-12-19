<script setup lang="ts">
import { useFetch } from '@vueuse/core';
import { onMounted, ref, watch } from 'vue';
import { useGlobalState } from '@/store';
import type { Question } from '@/types';
import QuizInfo from '@/components/QuizInfo.vue';
import QuizSection from '@/components/QuizSection.vue';

const { audit, auditIsLoad, sections, filteredSections, filteredAudit, meta } = useGlobalState();

const activeSectionName = ref<string>();

watch(auditIsLoad, () => {
  if (Object.keys(audit.value).length) {
    activeSectionName.value = Object.keys(audit.value).pop();
  }
});

const showEnd = ref<boolean>(false);

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

const goToSectionByName = (name: string) => {
  activeSectionName.value = name;
};

const goToSectionByIndex = (index: number) => {
  const name = filteredSections.value[index]?.name;
  if (name) {
    goToSectionByName(name);
  }
};

const goToNextSection = () => {
  const activeIndex = filteredSections.value.findIndex(o => o.name === activeSectionName.value);
  if (activeIndex !== -1) {
    const nextSection = filteredSections.value[activeIndex + 1];
    if (nextSection) {
      goToSectionByName(nextSection.name);
    }
  }
};

const isSectionDone = (sectionName: string) => {
  const auditSection = audit.value[sectionName];
  if (!auditSection) {
    return false;
  }
  const section = filteredSections.value.find(o => o.name === sectionName);
  if (!section) {
    return false;
  }
  for (const item of section.quiz) {
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

const isSectionEnabled = (sectionName: string) => {
  const activeIndex = filteredSections.value.findIndex(o => o.name === sectionName);
  if (activeIndex !== -1) {
    const prevSection = filteredSections.value[activeIndex - 1];
    if (prevSection) {
      return isSectionDone(prevSection.name);
    }
  }
  return false;
};
</script>

<template>
  <div class="mappers-audit-quiz-container mappers-container">
    <div
      v-if="filteredSections.length && auditIsLoad"
      class="mappers-audit-quiz"
    >
      <nav class="mappers-audit-quiz-nav">
        <TransitionGroup
          name="mappers-tab-fade"
          tag="ul"
          class="mappers-audit-quiz-menu"
        >
          <li
            v-for="(item, index) in filteredSections"
            :key="item.id"
          >
            <button
              class="mappers-audit-quiz-nav-btn mappers-h3"
              :class="{
                'mappers-active': item.name === activeSectionName,
                'mappers-done': isSectionDone(item.name),
                'mappers-enabled': isSectionEnabled(item.name),
              }"
              @click="
                (isSectionDone(item.name) || isSectionEnabled(item.name)) &&
                goToSectionByName(item.name)
              "
            >
              <i>
                <span>{{ index + 1 }}</span>
                <svg class="mappers-icon"><use xlink:href="#icon-check" /></svg>
              </i>
              <span>{{ item.title }}</span>
            </button>
          </li>
        </TransitionGroup>
      </nav>
      <div class="mappers-audit-quiz-body">
        <Transition name="mappers-tab-fade">
          <QuizInfo
            v-if="showEnd"
            type="finish"
          ></QuizInfo>
          <QuizInfo
            v-else-if="activeSectionName === undefined"
            type="start"
            @start="goToSectionByIndex(0)"
          ></QuizInfo>
          <TransitionGroup
            v-else
            tag="div"
            name="mappers-tab-fade"
            class="mappers-audit-quiz-sections"
          >
            <template
              v-for="item in filteredSections"
              :key="item.id"
            >
              <QuizSection
                v-if="activeSectionName === item.name"
                :key="item.id"
                :section="item"
                :is-done="isSectionDone(item.name)"
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
