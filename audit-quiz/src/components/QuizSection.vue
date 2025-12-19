<script setup lang="ts">
import type { Section } from '@/types';
import { ref, computed, onMounted } from 'vue';
import QuizQuestion from '@/components/QuizQuestion.vue';
import { useGlobalState } from '@/store';

const props = defineProps<{
  section: Section;
  isDone: boolean;
}>();

const { meta, audit, isEnd } = useGlobalState();

const tab = ref<'intro' | 'questions'>('intro');
const activeQuestionName = ref<string>();

const auditSection = computed(() => audit.value.find(o => o.name === props.section.name));

onMounted(() => {
  if (auditSection.value) {
    if (isEnd.value) {
      activeQuestionName.value = auditSection.value.quiz[0]?.name;
    } else {
      for (const question of [...auditSection.value.quiz].reverse()) {
        if (question.val) {
          activeQuestionName.value = question.name;
          break;
        }
      }
    }
  }
  if (!activeQuestionName.value) {
    activeQuestionName.value = props.section.quiz[0]?.name || '';
  }
});

const tabs = ['intro', 'questions'] as const;

const emit = defineEmits(['next', 'end']);

const goToQuestionByName = (name: string) => {
  activeQuestionName.value = name;
};

const goToNextQuestion = () => {
  const activeIndex = props.section.quiz.findIndex(o => o.name === activeQuestionName.value);
  if (activeIndex !== -1) {
    const nextQuestion = props.section.quiz[activeIndex + 1];
    if (nextQuestion && isQuestionEnabled(nextQuestion.name)) {
      goToQuestionByName(nextQuestion.name);
    }
  }
};

const isQuestionDone = (name: string) => {
  if (!auditSection.value) {
    return false;
  }
  const auditQuestion = auditSection.value.quiz.find(o => o.name === name);
  return auditQuestion && auditQuestion.val !== undefined;
};

const isQuestionEnabled = (name: string) => {
  const activeIndex = props.section.quiz.findIndex(o => o.name === name);
  if (activeIndex === -1) {
    return false;
  }
  const prevQuestion = props.section.quiz[activeIndex - 1];
  if (!prevQuestion) {
    return false;
  }
  return isQuestionDone(prevQuestion.name);
};
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
      <Transition name="mappers-tab-fade">
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
        <TransitionGroup
          v-else-if="section.quiz"
          tag="div"
          name="mappers-tab-fade"
          class="mappers-audit-quiz-section-questions"
        >
          <template
            v-for="(item, index) in section.quiz"
            :key="item.name"
          >
            <QuizQuestion
              v-if="activeQuestionName === item.name"
              :question="item"
              :index="index"
              :section-name="section.name"
            ></QuizQuestion>
          </template>
        </TransitionGroup>
      </Transition>
    </div>
    <div class="mappers-audit-quiz-section-foot">
      <Transition name="mappers-tab-fade">
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
        >
          <div class="mappers-audit-quiz-pagination">
            <button
              v-for="(item, index) in section.quiz"
              :key="item.name"
              class="mappers-audit-quiz-pagination-btn"
              :class="{
                'mappers-active': activeQuestionName === item.name,
                'mappers-done': isQuestionDone(item.name),
                'mappers-enabled': isQuestionEnabled(item.name),
              }"
              @click="
                activeQuestionName !== item.name &&
                (isQuestionDone(item.name) || isQuestionEnabled(item.name)) &&
                goToQuestionByName(item.name)
              "
            >
              {{ index + 1 }}
            </button>
          </div>
          <button
            v-if="isEnd"
            @click="emit('end')"
            class="mappers-audit-quiz-section-foot-btn mappers-btn"
          >
            <span>{{ meta?.strings?.end }}</span>
            <svg class="mappers-icon"><use xlink:href="#icon-arrow-right" /></svg>
          </button>
          <button
            v-else-if="isDone"
            @click="emit('next')"
            class="mappers-audit-quiz-section-foot-btn mappers-btn"
          >
            <span>{{ meta?.strings?.next_section }}</span>
            <svg class="mappers-icon"><use xlink:href="#icon-arrow-right" /></svg>
          </button>
          <button
            v-else
            @click="goToNextQuestion"
            class="mappers-audit-quiz-section-foot-btn mappers-btn"
          >
            <span>{{ meta?.strings?.next_question }}</span>
            <svg class="mappers-icon"><use xlink:href="#icon-arrow-right" /></svg>
          </button>
        </nav>
      </Transition>
    </div>
  </div>
</template>

<style lang="less">
.mappers-audit-quiz-section {
  display: flex;
  flex-direction: column;
  @media @md_ {
    min-height: 480px;
    flex: auto;
    overflow: hidden;
    border-radius: 0 16px 16px 0;
  }
}

.mappers-audit-quiz-section-nav {
  border-bottom: solid 1px @border;
  display: flex;
  @media @md_ {
    padding: 40px 40px 0;
    flex: none;
    background-color: @white;
  }
}

.mappers-audit-quiz-section-nav-btn {
  padding: 8px 16px;
  display: flex;
  margin-bottom: -1px;
  border-bottom: solid 1px fade(@link, 0%);
  color: @title;
  font-weight: 600;
  line-height: 1;
  transition:
    border-bottom-color 0.4s,
    color 0.4s;
  @media @md_ {
    font-size: 18px;
    padding: 8px 24px;
  }
  &:hover {
    color: @link;
  }
  &.mappers-active {
    color: @link;
    border-bottom-color: @link;
  }
}

.mappers-audit-quiz-section-body {
  padding: 24px 0;
  @media @md_ {
    flex: auto;
    overflow: hidden auto;
    padding: 40px;
  }
}

.mappers-audit-quiz-section-foot {
  flex: none;
  padding-top: 24px;
  border-top: solid 1px @border;
  display: flex;
  flex-direction: column;
  @media @md_ {
    padding: 24px 40px;
    flex-direction: row;
  }
}

.mappers-audit-quiz-section-foot-btn {
  @media @md_ {
    margin-left: auto;
  }
}

.mappers-audit-quiz-section-foot-nav {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: auto;
  min-width: 0;
  @media @md_ {
    align-items: flex-start;
    flex-direction: row;
  }
}

.mappers-audit-quiz-pagination {
  align-self: center;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.mappers-audit-quiz-pagination-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 24px;
  border-radius: 6px;
  border: solid 1px @border;
  font-size: 12px;
  transition:
    color 0.4s,
    border-color 0.4s,
    background-color 0.4s;
  pointer-events: none;
  position: relative;
  i {
    position: absolute;
    --width: 16px;
    left: calc(100% - 0.5 * var(--width));
    bottom: calc(100% - 0.5 * var(--width));
    width: var(--width);
    aspect-ratio: 1;
    border-radius: 50%;
    color: @white;
    background-color: #27b680;
    display: grid;
    place-items: center;
    opacity: 0;
    transition: opacity 0.4s;
    svg {
      --size: 12px;
    }
  }
  &.mappers-done {
    pointer-events: auto;
    background-color: #27b680;
    border-color: #27b680;
    color: @white;
    i {
      opacity: 1;
    }
  }
  &.mappers-active {
    background-color: @link;
    border-color: @link;
    color: @white;
    pointer-events: none;
    i {
      opacity: 0;
    }
  }
  &.mappers-enabled {
    pointer-events: auto;
    color: @link;
    &:hover {
      border-color: @link;
    }
    &.mappers-done {
      color: @white;
      &:hover {
        border-color: #27b680;
      }
    }
    &.mappers-active {
      pointer-events: none;
      color: @white;
    }
  }
}
</style>
