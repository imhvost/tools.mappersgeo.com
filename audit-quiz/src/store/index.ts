import { createGlobalState } from '@vueuse/core';
import { useIDBKeyval } from '@vueuse/integrations/useIDBKeyval';
import type { Audit, Section, QuizMeta } from '@/types';
import { ref } from 'vue';

export const useGlobalState = createGlobalState(() => {
  const { data: audit, isFinished: auditIsLoad } = useIDBKeyval<Audit>('audit', {});

  const updateAudit = (sectionId: number, questionName: string, value?: string) => {
    if (!audit.value[sectionId]) {
      audit.value[sectionId] = {};
    }
    audit.value[sectionId][questionName] = value || '';
  };

  const sections = ref<Section[]>([]);
  const meta = ref<QuizMeta>({} as QuizMeta);

  return {
    audit,
    updateAudit,
    auditIsLoad,
    sections,
    meta,
  };
});
