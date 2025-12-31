import { createGlobalState } from '@vueuse/core';
import { useIDBKeyval } from '@vueuse/integrations/useIDBKeyval';
import type { Section, QuizMeta, Audits } from '@/types';
import { computed, ref } from 'vue';
import { checkSectionCondition, checkQuestionCondition } from '@/utils';

export const useGlobalState = createGlobalState(() => {
  const { data: audits, isFinished: auditsIsLoad } = useIDBKeyval<Audits[]>('audits', []);

  const auditId = ref<number | string>(0);
  const audit = computed<Section[]>(() => {
    return audits.value.find(o => o.id === auditId.value)?.audit || [];
  });

  const auditVersion = computed<string>(() => {
    return audits.value.find(o => o.id === auditId.value)?.version || '';
  });

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
    return sections.value.every(section => section.quiz.every(o => o.val));
  });

  return {
    audits,
    audit,
    auditId,
    auditVersion,
    updateAuditQuestion,
    updateAuditSubQuestion,
    auditsIsLoad,
    sections,
    meta,
    isEnd,
  };
});
