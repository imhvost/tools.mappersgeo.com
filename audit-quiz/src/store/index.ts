import { createGlobalState } from '@vueuse/core';
import { useIDBKeyval } from '@vueuse/integrations/useIDBKeyval';
import type { Section, QuizMeta } from '@/types';
import { computed, ref } from 'vue';
import { checkSectionCondition, checkQuestionCondition } from '@/utils';

export const useGlobalState = createGlobalState(() => {
  const { data: audit, isFinished: auditIsLoad } = useIDBKeyval<Section[]>('audit', []);

  const updateAuditQuestion = (sectionName: string, questionName: string, value?: string) => {
    const question = audit.value
      .find(o => o.name === sectionName)
      ?.quiz.find(o => o.name === questionName);
    if (question) {
      question.val = value;
    }
  };

  const updateAuditSubQuestion = (
    sectionName: string,
    questionName: string,
    subQuestionName: string,
    value?: string,
  ) => {
    const question = audit.value
      .find(o => o.name === sectionName)
      ?.quiz.find(o => o.name === questionName);
    if (!question) {
      return;
    }
    for (const answer of question.answers) {
      const subQuestion = answer.sub_questions?.find(o => o.name === subQuestionName);
      if (subQuestion) {
        subQuestion.val = value;
        break;
      }
    }
  };

  const meta = ref<QuizMeta>({} as QuizMeta);

  const sections = computed(() => {
    return audit.value
      .filter(o => checkSectionCondition(o, audit.value))
      .map(o => ({
        ...o,
        quiz: o.quiz.filter(q => checkQuestionCondition(q, o.name, audit.value)),
      }))
      .filter(o => o.quiz.length);
  });

  const isEnd = computed(() => {
    const questionsCount = sections.value
      .filter(o => checkSectionCondition(o, audit.value))
      .reduce((accumulator, section) => {
        accumulator += section.quiz.filter(o =>
          checkQuestionCondition(o, section.name, audit.value),
        ).length;
        return accumulator;
      }, 0);
  });

  return {
    audit,
    updateAuditQuestion,
    updateAuditSubQuestion,
    auditIsLoad,
    sections,
    meta,
  };
});
