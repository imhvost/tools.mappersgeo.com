type Operator = '=' | '!=' | '>' | '<' | '>=' | '<=' | 'IN' | 'NOT IN';

export type ParsedCondition = {
  field: string;
  fieldPath: string[];
  operator: Operator;
  value: string | number | Array<string | number>;
};

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

export const getValueByPath = (obj: any, fieldPath: string[]) => {
  return fieldPath.reduce((acc, key) => acc?.[key], obj);
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
