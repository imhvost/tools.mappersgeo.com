<script setup lang="ts">
import type { Section } from '@/types';
import { ref } from 'vue';
import QuizQuestion from '@/components/QuizQuestion.vue';
import { useGlobalState } from '@/store';

const props = defineProps<{
  section: Section;
  isDone: boolean;
}>();

const { meta } = useGlobalState();

const tab = ref<'intro' | 'questions'>('intro');
const activeQuestionName = ref<string>(props.section.quiz[0]?.name || '');

const tabs = ['intro', 'questions'] as const;
</script>

<template>
  <div class="mappers-audit-quiz-section">
    <nav class="mappers-audit-quiz-section-nav">
      <button
        v-for="item in tabs"
        :key="item"
        class="mappers-audit-quiz-section-nav-btn"
        :class="{ 'mappers-active': tab === item }"
        @click="tab = item"
      >
        {{ meta?.strings[item] }}
      </button>
    </nav>
    <div class="mappers-audit-quiz-section-body">
      <Transition
        name="mappers-fade"
        mode="out-in"
      >
        <div
          v-if="tab === 'intro'"
          class="mappers-audit-quiz-section-intro"
        >
          <div
            v-if="meta?.strings.intro_label"
            class="mappers-audit-quiz-section-intro-label mappers-label"
          >
            {{ meta.strings.intro_label }}
          </div>
          <div class="mappers-audit-quiz-section-intro-title mappers-h2">
            {{ section.title }}
          </div>
          <div
            v-if="section.introduction"
            class="mappers-audit-quiz-section-intro-desc mappers-content-text"
            v-html="section.introduction"
          ></div>
        </div>
        <div
          v-else
          class="mappers-audit-quiz-section-questions"
        >
          <template
            v-for="(item, index) in section.quiz"
            :key="item.name"
          >
            <Transition
              name="mappers-fade"
              mode="out-in"
            >
              <QuizQuestion
                v-if="activeQuestionName === item.name"
                :question="item"
                :index="index"
                :section-id="section.id"
              ></QuizQuestion>
            </Transition>
          </template>
        </div>
      </Transition>
    </div>
    <div class="mappers-audit-quiz-section-foot">
      <Transition
        name="mappers-fade"
        mode="out-in"
      >
        <button
          v-if="tab === 'intro'"
          @click="tab = 'questions'"
          class="mappers-audit-quiz-section-foot-btn mappers-btn"
        >
          <span>{{ meta?.strings?.go_to_questions }}</span>
          <svg class="mappers-icon"><use xlink:href="#icon-arrow-right" /></svg>
        </button>
        <nav
          v-else
          class="mappers-audit-quiz-section-foot-nav"
        ></nav>
      </Transition>
    </div>
  </div>
</template>

<style lang="less">
.mappers-audit-quiz-section {
  min-height: 480px;
  flex: auto;
  overflow: hidden;
  border-radius: 0 16px 16px 0;
  display: flex;
  flex-direction: column;
}

.mappers-audit-quiz-section-nav {
  padding: 40px 40px 0;
  flex: none;
  background-color: @white;
  border-bottom: solid 1px @border;
  display: flex;
}

.mappers-audit-quiz-section-nav-btn {
  padding: 8px 24px;
  display: flex;
  margin-bottom: -1px;
  border-bottom: solid 1px fade(@link, 0%);
  color: @title;
  font-size: 18px;
  font-weight: 600;
  line-height: 1;
  transition:
    border-bottom-color 0.4s,
    color 0.4s;
  &:hover {
    color: @link;
  }
  &.mappers-active {
    color: @link;
    border-bottom-color: @link;
  }
}

.mappers-audit-quiz-section-body {
  flex: auto;
  overflow: hidden auto;
  padding: 40px;
}

.mappers-audit-quiz-section-foot {
  flex: none;
  padding: 40px;
  border-top: solid 1px @border;
  display: flex;
}

.mappers-audit-quiz-section-foot-btn {
  margin-left: auto;
}
</style>
