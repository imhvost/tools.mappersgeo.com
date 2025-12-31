<script setup lang="ts">
import { useFetch } from '@vueuse/core';
import { ref, watch, toRaw, nextTick, onMounted, onUnmounted } from 'vue';
import { useGlobalState } from '@/store';
import type { Question } from '@/types';
import QuizInfo from '@/components/QuizInfo.vue';
import QuizSection from '@/components/QuizSection.vue';

const { audit, audits, auditsIsLoad, auditId, auditVersion, sections, meta, isEnd } =
  useGlobalState();

const activeSectionName = ref<string>();

watch(auditsIsLoad, async isLoaded => {
  if (!isLoaded) {
    return;
  }

  const url = new URL(window.location.href);
  const id = url.searchParams.get('id');
  if (id) {
    auditId.value = id;
    await nextTick();
  }

  if (!Object.keys(audit.value).length) {
    const { data } = await useFetch<Question[]>(
      `${import.meta.env.VITE_WP_URI}${import.meta.env.VITE_WP_API_BASE}/audit-quiz/${id ? `?id=${id}` : ''}`,
    ).json();
    if (Array.isArray(data.value)) {
      audits.value = data.value;
      auditId.value = data.value?.[0]?.id || 0;
    }
  }

  if (auditId.value === 0) {
    url.searchParams.delete('id');
    window.history.replaceState(null, '', url.toString());
  }

  const { data: auditQuizMeta } = await useFetch<Record<string, string>>(
    `${import.meta.env.VITE_WP_URI}${import.meta.env.VITE_WP_API_BASE}/audit-quiz-meta/`,
  ).json();

  if (auditQuizMeta.value) {
    meta.value = auditQuizMeta.value;
  }

  if (!isEnd.value) {
    for (const section of [...audit.value].reverse()) {
      for (const question of section.quiz) {
        if (question.val !== undefined) {
          activeSectionName.value = section.name;
          break;
        }
      }
    }
  }
});

const showEnd = ref<boolean>(false);

const goToSectionByName = (name: string) => {
  activeSectionName.value = name;
  showEnd.value = false;
};

const goToSectionByIndex = (index: number) => {
  const name = sections.value[index]?.name;
  if (name) {
    goToSectionByName(name);
  }
};

const goToNextSection = () => {
  const activeIndex = sections.value.findIndex(o => o.name === activeSectionName.value);
  if (activeIndex !== -1) {
    const nextSection = sections.value[activeIndex + 1];
    if (nextSection) {
      goToSectionByName(nextSection.name);
    }
  }
};

const isSectionDone = (sectionName: string) => {
  const auditSection = audit.value.find(o => o.name === sectionName);
  if (!auditSection) {
    return false;
  }
  const section = sections.value.find(o => o.name === sectionName);
  if (!section) {
    return false;
  }
  for (const item of section.quiz) {
    const auditQuestion = auditSection.quiz.find(o => o.name === item.name);
    if (!auditQuestion) {
      return false;
    }
    if (auditQuestion.val === undefined) {
      return false;
    }
  }
  return true;
};

const isSectionEnabled = (sectionName: string) => {
  const activeIndex = sections.value.findIndex(o => o.name === sectionName);
  if (activeIndex !== -1) {
    const prevSection = sections.value[activeIndex - 1];
    if (prevSection) {
      return isSectionDone(prevSection.name);
    }
  }
  return false;
};

const endAudit = async () => {
  showEnd.value = true;
  activeSectionName.value = undefined;

  const { data } = await useFetch(
    `${import.meta.env.VITE_WP_URI}${import.meta.env.VITE_WP_API_BASE}/audit-quiz/`,
  )
    .post({
      id: auditId.value,
      audit: audit.value,
      version: auditVersion.value,
      status: isEnd.value ? 'publish' : 'draft',
    })
    .json();

  if (!data.value?.success || !data.value.id) {
    return;
  }

  if (auditId.value === 0) {
    const rawAudit = structuredClone(toRaw(audit.value));

    audits.value.push({
      id: data.value.id,
      audit: rawAudit,
      url: data.value.url,
      version: data.value.version,
      status: isEnd.value ? 'publish' : 'draft',
    });

    auditId.value = data.value.id;

    audits.value = audits.value.filter(o => o.id === data.value.id);

    const url = new URL(window.location.href);
    url.searchParams.set('id', String(data.value.id));

    window.history.replaceState(null, '', url.toString());
  }
};

const saveAudit = () => {
  useFetch(`${import.meta.env.VITE_WP_URI}${import.meta.env.VITE_WP_API_BASE}/audit-quiz/`)
    .post({
      id: auditId.value,
      audit: audit.value,
      version: auditVersion.value,
      status: isEnd.value ? 'publish' : 'draft',
    })
    .json();
};

onMounted(() => {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      saveAudit();
    }
  });
});

onUnmounted(() => {
  document.removeEventListener('visibilitychange', saveAudit);
});
</script>

<template>
  <div class="mappers-audit-quiz-container mappers-container">
    <div
      v-if="sections.length && auditsIsLoad"
      class="mappers-audit-quiz"
    >
      <nav class="mappers-audit-quiz-nav">
        <TransitionGroup
          name="mappers-tab-fade"
          tag="ul"
          class="mappers-audit-quiz-menu"
        >
          <li
            v-for="(item, index) in sections"
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
              v-for="item in sections"
              :key="item.id"
            >
              <QuizSection
                v-if="activeSectionName === item.name"
                :key="item.id"
                :section="item"
                :is-done="isSectionDone(item.name)"
                @next="goToNextSection"
                @end="endAudit"
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
  @media @md_ {
    flex: auto;
    border-radius: 16px;
    background-color: @white;
    min-height: 0;
  }
  @media @md {
    flex-direction: column;
    gap: 32px;
  }
}

.mappers-audit-quiz-nav {
  @media @md_ {
    display: flex;
    flex: none;
    width: 350px;
    flex-direction: column;
    padding: 24px 0;
    border-radius: 16px 10px 10px 16px;
    box-shadow: 2px 2px 20px 0px #52422f1f;
    position: relative;
    z-index: 1;
    border: solid 1px @border;
  }
}

.mappers-audit-quiz-menu {
  @media @md {
    overflow: hidden;
    margin: 0 calc(-1 * var(--mappers-container-padding)) -16px;
    padding: 0 var(--mappers-container-padding) 16px;
    overflow-x: auto;
    display: flex;
    white-space: nowrap;
    gap: 16px;
  }
  li {
    display: flex;
    @media @md_ {
      border-bottom: solid 1px @border;
      &:last-child {
        border-bottom: 0;
      }
    }
  }
}

.mappers-audit-quiz-nav-btn {
  display: flex;
  align-items: center;
  pointer-events: none;
  color: @title;
  gap: 8px;
  transition: color 0.4s;
  @media @md_ {
    padding: 24px;
    width: 100%;
    gap: 10px;
  }
  @media @md {
    font-size: 16px !important;
  }
  i {
    flex: none;
    width: 40px;
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: #ededed;
    display: grid;
    place-items: center;
    font-style: normal;
    position: relative;
    transition:
      color 0.4s,
      background-color 0.4s;
    @media @md {
      width: 24px;
    }
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
      @media @md {
        --size: 20px;
      }
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
