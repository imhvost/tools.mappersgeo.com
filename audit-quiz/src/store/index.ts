import { createGlobalState } from '@vueuse/core';
import { useIDBKeyval } from '@vueuse/integrations/useIDBKeyval';
import type { Audit, AuditAnswer, Section, QuizMeta } from '@/types';
import { ref } from 'vue';

export const useGlobalState = createGlobalState(() => {
  const { data: audit, isFinished: auditIsLoad } = useIDBKeyval<Audit>('audit', {});

  const updateAuditQuestion = (sectionId: number, questionName: string, value?: string) => {
    if (!audit.value[sectionId]) {
      audit.value[sectionId] = [];
    }
    audit.value[sectionId].push({
      name: questionName,
      val: value,
    });
  };

  const updateAuditSubQuestion = (
    sectionId: number,
    questionName: string,
    subQuestionName: string,
    subQuestionValue?: string,
  ) => {
    if (!audit.value[sectionId]) return;

    const updateSub = (answers: AuditAnswer[]) => {
      for (const answer of answers) {
        if (answer.name === questionName) {
          if (!answer.sub_questions) {
            answer.sub_questions = [];
          }

          // Шукаємо існуючий subQuestion
          const existing = answer.sub_questions.find(sq => sq.name === subQuestionName);
          if (existing) {
            existing.val = subQuestionValue;
          } else {
            answer.sub_questions.push({
              name: subQuestionName,
              val: subQuestionValue,
            });
          }
          return true; // оновили або додали, вихід
        }

        // Рекурсія по глибших sub_questions
        if (answer.sub_questions && updateSub(answer.sub_questions)) {
          return true;
        }
      }
      return false;
    };

    updateSub(audit.value[sectionId]);
  };

  const sections = ref<Section[]>([]);
  const meta = ref<QuizMeta>({} as QuizMeta);

  return {
    audit,
    updateAuditQuestion,
    updateAuditSubQuestion,
    auditIsLoad,
    sections,
    meta,
  };
});
