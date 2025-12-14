import { createGlobalState } from '@vueuse/core';
import { useIDBKeyval } from '@vueuse/integrations/useIDBKeyval';
import type { Audit } from '@/types';

export const useGlobalState = createGlobalState(() => {
  const { data: audit, isFinished: auditIsFinished } = useIDBKeyval<Audit>('audit', {
    answers: [],
  });

  return {
    audit,
    auditIsFinished,
  };
});
