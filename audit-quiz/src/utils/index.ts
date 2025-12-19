import type { Section, Question, Operator, ParsedCondition } from '@/types';

const parsePrimitive = (value: string): string | number => {
  if (!isNaN(Number(value))) {
    return Number(value);
  }

  if (
    (value.startsWith("'") && value.endsWith("'")) ||
    (value.startsWith('"') && value.endsWith('"'))
  ) {
    return value.slice(1, -1);
  }

  return value;
};

export const parseCondition = (condition: string): ParsedCondition => {
  condition = condition.trim();

  const operatorMatch = condition.match(/\s+(NOT IN|IN|=|!=|>=|<=|>|<)\s+/);

  if (!operatorMatch) {
    throw new Error('Error parse condition: operator not found');
  }

  const operator = operatorMatch[1] as Operator;

  const [left, right] = condition.split(operator).map(el => el.trim());

  if (!left || !right) {
    throw new Error('Error parse condition');
  }

  const field = left;
  const fieldPath = field.split('.');

  let value: ParsedCondition['value'];

  if (operator === 'IN' || operator === 'NOT IN') {
    if (!right.startsWith('[') || !right.endsWith(']')) {
      throw new Error('IN operator requires parentheses');
    }

    const rawValues = right
      .slice(1, -1)
      .split(',')
      .map(el => el.trim());

    value = rawValues.map(parsePrimitive);
  } else {
    value = parsePrimitive(right);
  }

  return {
    field,
    fieldPath,
    operator,
    value,
  };
};

export const getAuditConditionValue = (audit: Section[], fieldPath: string[]) => {
  const [sectionName, questionName] = fieldPath;
  if (sectionName && questionName) {
    const section = audit.find(o => o.name === sectionName);
    if (section) {
      const question = section.quiz.find(o => o.name === questionName);
      if (question) {
        return question.val;
      }
    }
  }
  return undefined;
};

export const evaluateConditionValue = (
  leftValue: any,
  operator: Operator,
  rightValue: any,
): boolean => {
  switch (operator) {
    case '=':
      return leftValue == rightValue;
    case '!=':
      return leftValue != rightValue;
    case '>':
      return Number(leftValue) > Number(rightValue);
    case '<':
      return Number(leftValue) < Number(rightValue);
    case '>=':
      return Number(leftValue) >= Number(rightValue);
    case '<=':
      return Number(leftValue) <= Number(rightValue);
    case 'IN':
      return Array.isArray(rightValue) && rightValue.includes(leftValue);
    case 'NOT IN':
      return Array.isArray(rightValue) && !rightValue.includes(leftValue);
    default:
      return false;
  }
};

export const checkSectionCondition = (section: Section, audit: Section[]): boolean => {
  if (!section.condition) {
    return true;
  }
  const { operator, fieldPath, value } = parseCondition(section.condition);

  const conditionValue = getAuditConditionValue(audit, fieldPath);
  return evaluateConditionValue(conditionValue, operator, value);
};

export const checkQuestionCondition = (
  question: Question,
  sectionName: string,
  audit: Section[],
): boolean => {
  if (!question.condition) {
    return true;
  }
  const { operator, fieldPath, value } = parseCondition(question.condition);
  if (fieldPath.length !== 2) {
    fieldPath.unshift(sectionName);
  }

  const conditionValue = getAuditConditionValue(audit, fieldPath);
  return evaluateConditionValue(conditionValue, operator, value);
};
