export interface Answer {
  answer?: string;
  val: string;
  points?: number;
  answers: Answer;
  report?: string;
  report_color: 'default' | 'green' | 'red' | 'orange' | 'black';
  sub_questions: Question[];
}

export type InputType = 'radio' | 'checkbox' | 'custom';

export interface Question {
  question: string;
  name: string;
  input_type: InputType;
  answers: Answer[];
  do?: string;
  auditor_note?: string;
  desc?: string;
  condition?: string;
}

export interface Section {
  id: number;
  title: string;
  name: string;
  introduction?: string;
  quiz: Question[];
  condition?: string;
  condition_alert?: string;
  condition_ok?: string;
  initial_score?: number;
}

export interface AuditAnswer {
  name: string;
  val?: string;
  sub_questions?: AuditAnswer[];
}

export interface Audit {
  [key: string]: AuditAnswer[];
}

export interface QuizMeta {
  strings: Record<string, string>;
  urls: Record<string, string>;
}

export type Operator = '=' | '!=' | '>' | '<' | '>=' | '<=' | 'IN' | 'NOT IN';

export type ParsedCondition = {
  field: string;
  fieldPath: string[];
  operator: Operator;
  value: string | number | Array<string | number>;
};
