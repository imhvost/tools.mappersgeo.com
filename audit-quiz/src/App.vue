<script setup lang="ts">
import { useFetch } from '@vueuse/core';
import { onMounted, ref } from 'vue';
import { useGlobalState } from '@/store';
import type { Question, QuizMeta } from '@/types';
import TabsInfo from '@/components/TabInfo.vue';

const sections = ref<Question[]>([]);
const meta = ref<QuizMeta>();

const { audit, auditIsFinished } = useGlobalState();

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

const goToSection = (index: number) => {
  audit.value.section = index;
};
</script>

<template>
  <div class="mappers-audit-quiz-container mappers-container">
    <div
      v-if="sections.length && auditIsFinished"
      class="mappers-audit-quiz"
    >
      <nav class="mappers-audit-quiz-nav">
        <ul class="mappers-audit-quiz-menu">
          <li
            v-for="(item, index) in sections"
            :key="item.id"
          >
            <button
              class="mappers-audit-quiz-nav-btn mappers-h3"
              :class="{
                'mappers-active': index === audit.section,
                'mappers-done': index > audit.answers.length - 1,
              }"
              @click="index > audit.answers.length - 1 && goToSection(index)"
            >
              <i>
                <span>{{ index + 1 }}</span>
                <svg class="mappers-icon"><use xlink:href="#icon-check" /></svg>
              </i>
              <span>{{ item.title }}</span>
            </button>
          </li>
        </ul>
      </nav>
      <div class="mappers-audit-quiz-body">
        <Transition name="fade">
          <div
            v-if="audit.isEnd"
            class="mappers-audit-quiz-tab"
          >
            <TabsInfo
              type="finish"
              :meta="meta"
            ></TabsInfo>
          </div>
          <div
            v-else-if="audit.section === undefined"
            class="mappers-audit-quiz-tab"
          >
            <TabsInfo
              type="start"
              :meta="meta"
              @start="goToSection(0)"
            ></TabsInfo>
          </div>
          <div
            class="mappers-audit-quiz-sections"
            v-else
          >
            <template
              v-for="(item, index) in sections"
              :key="item.id"
            >
              <div
                v-if="index === audit.section"
                class="mappers-audit-quiz-tab"
              ></div>
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
</style>
