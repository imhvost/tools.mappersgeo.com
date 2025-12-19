import { createGlobalState } from '@vueuse/core';
import { useIDBKeyval } from '@vueuse/integrations/useIDBKeyval';
import type { Audit, AuditAnswer, Section, QuizMeta, Question } from '@/types';
import { computed, ref } from 'vue';
import { checkSectionCondition, checkQuestionCondition } from '@/utils';

export const useGlobalState = createGlobalState(() => {
  const { data: audit, isFinished: auditIsLoad } = useIDBKeyval<Audit>('audit', {});

  const updateAuditQuestion = (sectionName: string, questionName: string, value?: string) => {
    if (!audit.value[sectionName]) {
      audit.value[sectionName] = [];
    }

    const answer = audit.value[sectionName].find(o => o.name === questionName);

    if (answer) {
      answer.val = value;
    } else {
      audit.value[sectionName].push({
        name: questionName,
        val: value,
      });
    }
  };

  const updateAuditSubQuestion = (
    sectionName: string,
    questionName: string,
    subQuestionName: string,
    subQuestionValue?: string,
  ) => {
    if (!audit.value[sectionName]) return;

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

    updateSub(audit.value[sectionName]);
  };

  const sections = ref<Section[]>([]);
  const meta = ref<QuizMeta>({} as QuizMeta);

  const filteredSections = computed(() => {
    return sections.value
      .filter(o => checkSectionCondition(o, audit.value))
      .map(o => ({
        ...o,
        quiz: o.quiz.filter(q => checkQuestionCondition(q, o.name, audit.value)),
      }))
      .filter(o => o.quiz.length);
  });

  const filteredAudit = computed<Audit>(() => {
    const result: Audit = {};

    const filterAnswers = (answers: AuditAnswer[], questions: Question[]): AuditAnswer[] => {
      return answers
        .map(answer => {
          const question = questions.find(q => q.name === answer.name);
          if (!question) {
            return undefined;
          }

          const selectedAnswer = question.answers.find(a => a.val === answer.val);

          if (!selectedAnswer) {
            return {
              name: answer.name,
              val: answer.val,
            };
          }

          const allowedSubQuestions = selectedAnswer.sub_questions;

          return {
            name: answer.name,
            val: answer.val,
            sub_questions: answer.sub_questions
              ? filterAnswers(answer.sub_questions, allowedSubQuestions)
              : undefined,
          };
        })
        .filter(o => o !== undefined);
    };

    filteredSections.value.forEach(section => {
      const sectionAudit = audit.value[section.name];
      if (!sectionAudit) {
        return;
      }

      const filteredAnswers = filterAnswers(sectionAudit, section.quiz);

      if (filteredAnswers.length) {
        result[section.name] = filteredAnswers;
      }
    });

    return result;
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
    filteredSections,
    filteredAudit,
    meta,
  };
});
